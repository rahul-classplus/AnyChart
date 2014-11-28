goog.provide('anychart.core.gantt.Controller');

goog.require('acgraph');
goog.require('anychart.core.Base');
goog.require('anychart.core.ui.ScrollBar');

goog.require('goog.array');
goog.require('goog.math');



/**
 * Gantt controller implementation.
 * TODO (A.Kudryavtsev): Describe.
 * @param {boolean=} opt_isResourceChart - Flag if controller must work in resource chart mode.
 *
 * @constructor
 * @extends {anychart.core.Base}
 */
anychart.core.gantt.Controller = function(opt_isResourceChart) {
  goog.base(this);

  /**
   * Resource chart works with resources.
   * Each resource has periods reflected in data model as array of period-objects (Array.<Period>).
   * Each period has some useful fields (such as 'ID').
   * Basically, field 'periods' in tree data item is just a raw array, but for resource chart here are some
   * issues when we need to quickly find a period by id (for example, for connectors).
   *
   * Indexing the periods takes a time, so we run it only in resource chart mode.
   *
   * @type {boolean}
   * @private
   */
  this.isResourceChart_ = !!opt_isResourceChart;

  /**
   * The map of periods.
   * Contains link to the period by its id.
   * @type {Object}
   * @private
   */
  this.periodsMap_ = {};

  /**
   * Tree data.
   * @type {anychart.data.Tree}
   * @private
   */
  this.data_ = null;

  /**
   * Visible items of tree (items that are not hidden by collapse).
   * @type {Array.<anychart.data.Tree.DataItem>}
   * @private
   */
  this.visibleData_ = [];

  /**
   * Array that contains a row height differences.
   * NOTE: This array doesn't store row spaces!
   * @type {Array.<number>}
   * @private
   */
  this.heightCache_ = [];

  /**
   * Related data grid.
   * @type {anychart.core.ui.DataGrid}
   * @private
   */
  this.dataGrid_ = null;

  /**
   * Related timeline.
   * @type {anychart.core.gantt.Timeline}
   * @private
   */
  this.timeline_ = null;

  /**
   * Start index.
   * @type {number}
   * @private
   */
  this.startIndex_ = NaN;


  /**
   * End index.
   * @type {number}
   * @private
   */
  this.endIndex_ = NaN;


  /**
   * Vertical offset.
   * Actually, must be calculated automatically. Take care of user doesn't set this value wrong.
   * @type {number}
   * @private
   */
  this.verticalOffset_ = 0;


  /**
   * Height of data grid, available for rows render.
   * @type {number}
   * @private
   */
  this.availableHeight_ = 0;


  /**
   * Flag if startIndex, endIndex, vertical offset were recalculated.
   * @type {boolean}
   * @private
   */
  this.positionRecalculated_ = false;


  /**
   * Traverser that ignores children of collapsed items while passage.
   * @type {anychart.data.Traverser}
   * @private
   */
  this.expandedItemsTraverser_ = null;


  /**
   * Min date timestamp.
   * @type {number}
   * @private
   */
  this.minDate_ = NaN;


  /**
   * Max date timestamp.
   * @type {number}
   * @private
   */
  this.maxDate_ = NaN;


  /**
   * Vertical scroll bar.
   * @type {anychart.core.ui.ScrollBar}
   * @private
   */
  this.verticalScrollBar_ = null;

};
goog.inherits(anychart.core.gantt.Controller, anychart.core.Base);


/**
 * Correctly calculates data item pixel height.
 * @param {anychart.data.Tree.DataItem} item - Tree data item.
 * @return {number} - Data item height.
 */
anychart.core.gantt.Controller.getItemHeight = function(item) {
  return anychart.utils.toNumber(item.get(anychart.enums.GanttDataFields.ROW_HEIGHT)) || anychart.core.ui.DataGrid.DEFAULT_ROW_HEIGHT;
};


/**
 * Consistency state mask supported by this object.
 * @type {number}
 */
anychart.core.gantt.Controller.prototype.SUPPORTED_SIGNALS = anychart.Signal.NEEDS_REAPPLICATION;


/**
 * Consistency state mask supported by this object.
 * In this case consistency state
 *  DATA means that the whole tree has been changed. Needs to re-linearize, calculate visible data anew, recalculate start& end indexes.
 *  VISIBILITY means that some item was collapsed/expanded (children become visible/invisible). Needs to recalculate visible data without new tree linearization.
 *  POSITION means that new start, end, offset, available height were set. No need to linearize a tree and build new visibility data.
 * @type {number}
 */
anychart.core.gantt.Controller.prototype.SUPPORTED_CONSISTENCY_STATES =
    anychart.ConsistencyState.DATA |
    anychart.ConsistencyState.VISIBILITY |
    anychart.ConsistencyState.POSITION;


/**
 * Listener for controller invalidation.
 * @param {anychart.SignalEvent} event - Invalidation event.
 * @private
 */
anychart.core.gantt.Controller.prototype.dataInvalidated_ = function(event) {
  var state = 0;
  var signal = anychart.Signal.NEEDS_REAPPLICATION;

  /*
   Here meta_changed_signal comes from tree on tree data item change.
   We have to initialize rebuilding of visible data items.
   */
  if (event.hasSignal(anychart.Signal.META_CHANGED)) state |= anychart.ConsistencyState.VISIBILITY;

  /*
   Here data_changed_signal comes from tree when tree has some structural changes.
   We have to relinerize data and rebuild visible data items.
   */
  if (event.hasSignal(anychart.Signal.DATA_CHANGED)) state |= anychart.ConsistencyState.DATA;

  this.invalidate(state, signal);
};


/**
 * Function that decides if we go through data item's children while passage.
 * @param {anychart.data.Tree.DataItem} item - Tree data item.
 * @return {boolean} - Whether item is expanded.
 * @private
 */
anychart.core.gantt.Controller.prototype.traverseChildrenCondition_ = function(item) {
  return !item.meta(anychart.enums.GanttDataFields.COLLAPSED);
};


/**
 * Linearizes tree. Used to add necessary meta information to data items in a straight tree passage.
 * @return {anychart.core.gantt.Controller} - Itself for method chaining.
 * @private
 */
anychart.core.gantt.Controller.prototype.linearizeData_ = function() {
  var item;
  var linearIndex = 0;

  this.minDate_ = NaN;
  this.maxDate_ = NaN;

  this.data_.suspendSignalsDispatching();
  var fullPassageTraverser = this.data_.getTraverser();

  while (fullPassageTraverser.advance()) {
    item = fullPassageTraverser.current();

    this.checkDate_(/** @type {number} */ (item.get(anychart.enums.GanttDataFields.ACTUAL_START)));
    this.checkDate_(/** @type {number} */ (item.get(anychart.enums.GanttDataFields.ACTUAL_END)));
    this.checkDate_(/** @type {number} */ (item.get(anychart.enums.GanttDataFields.BASELINE_START)));
    this.checkDate_(/** @type {number} */ (item.get(anychart.enums.GanttDataFields.BASELINE_END)));

    item
        .meta('depth', fullPassageTraverser.getDepth())
        .meta('index', linearIndex++);

    if (this.isResourceChart_) {
      this.periodsMap_ = {};
      var periods = item.get(anychart.enums.GanttDataFields.PERIODS);
      if (goog.isArray(periods)) {
        //Working with raw array.
        for (var i = 0, l = periods.length; i < l; i++) {
          var period = periods[i];
          var periodId = period[anychart.enums.GanttDataFields.ID];
          if (!this.periodsMap_[periodId]) this.periodsMap_[periodId] = period;
          //This extends dates range.
          this.checkDate_(period[anychart.enums.GanttDataFields.START]);
          this.checkDate_(period[anychart.enums.GanttDataFields.END]);
        }
      }
    }

    if (item.numChildren() && goog.isDef(item.get(anychart.enums.GanttDataFields.COLLAPSED)))
      item.meta(anychart.enums.GanttDataFields.COLLAPSED, item.get(anychart.enums.GanttDataFields.COLLAPSED));
  }

  this.data_.resumeSignalsDispatching(false);
  return this;
};


/**
 * Checks data item to get it's date fields and extend current min-max range.
 * @param {number} date - Timestamp.
 * @private
 */
anychart.core.gantt.Controller.prototype.checkDate_ = function(date) {
  if (goog.isNumber(date) && !isNaN(date)) {
    if (isNaN(this.minDate_)) { //If one of dates is NaN - the second one is NaN as well.
      this.minDate_ = date;
      this.maxDate_ = date;
    }

    if (date < this.minDate_) this.minDate_ = date;
    if (date > this.maxDate_) this.maxDate_ = date;
  }
};


/**
 * Fills this.visibleData_ and this.heightCache with data.
 * @return {anychart.core.gantt.Controller} - Itself for method chaining.
 * @private
 */
anychart.core.gantt.Controller.prototype.getVisibleData_ = function() {
  this.visibleData_.length = 0;
  this.heightCache_.length = 0;

  var item;
  var height = 0;
  this.expandedItemsTraverser_.reset();
  while (this.expandedItemsTraverser_.advance()) {
    item = /** @type {anychart.data.Tree.DataItem} */ (this.expandedItemsTraverser_.current());
    this.visibleData_.push(item);
    height += (anychart.core.gantt.Controller.getItemHeight(item) + anychart.core.ui.DataGrid.ROW_SPACE);
    this.heightCache_.push(height);
  }

  return this;
};


/**
 * Returns an actual height between rows.
 * NOTE: Considers a row spacing.
 * @param {number} startIndex - Start index.
 * @param {number=} opt_endIndex - End index.
 * @return {number} - Actual height.
 * @private
 */
anychart.core.gantt.Controller.prototype.getHeightByIndexes_ = function(startIndex, opt_endIndex) {
  if (!this.heightCache_.length) return 0;

  var cacheEnd = this.heightCache_.length - 1;
  startIndex = Math.min(startIndex, cacheEnd);
  opt_endIndex = goog.isDef(opt_endIndex) ? Math.min(opt_endIndex, cacheEnd) : cacheEnd;


  if (startIndex > opt_endIndex) { //Swapping numbers. Super memory usage optimization.
    startIndex = startIndex - opt_endIndex;
    opt_endIndex = opt_endIndex + startIndex;
    startIndex = opt_endIndex - startIndex;
  }

  var startHeight = this.heightCache_[startIndex - 1] || 0;

  return this.heightCache_[opt_endIndex] - startHeight;
};


/**
 * Calculates index related to height specified.
 * NOTE: Make sure height belongs to [0 .. this.heightCache_[this.heightCache_.length - 1]].
 * @param {number} height - Height.
 * @private
 * @return {number} - Index.
 */
anychart.core.gantt.Controller.prototype.getIndexByHeight_ = function(height) {
  var index = goog.array.binarySearch(this.heightCache_, height);
  return index >= 0 ? index : ~index;
};


/**
 * Sets values for this.startIndex_, this.endIndex_ and this.verticalOffset_ if needed based on this.visibleData_ and
 *  this.availableHeight_.
 * Clears POSITION consistency state.
 */
anychart.core.gantt.Controller.prototype.recalculate = function() {
  if (this.visibleData_.length) {

    var totalHeight = this.getHeightByIndexes_(0, this.heightCache_.length - 1);

    if (this.availableHeight_ >= totalHeight) {
      this.startIndex_ = 0;
      this.verticalOffset_ = 0;
      this.endIndex_ = this.visibleData_.length - 1;
    } else {
      if (isNaN(this.startIndex_) && isNaN(this.endIndex_)) this.startIndex_ = 0;

      if (!isNaN(this.startIndex_)) { //Start index is set.
        totalHeight = this.getHeightByIndexes_(this.startIndex_) - this.verticalOffset_;
        if (totalHeight < this.availableHeight_) { //Going from end of list.
          this.startIndex_ = this.getIndexByHeight_(this.heightCache_[this.heightCache_.length - 1] - this.availableHeight_);
          this.endIndex_ = this.heightCache_.length - 1;
          this.verticalOffset_ = this.getHeightByIndexes_(this.startIndex_, this.endIndex_) - this.availableHeight_;
        } else {
          var height = this.startIndex_ == 0 ? 0 : this.heightCache_[this.startIndex_ - 1];
          this.endIndex_ = this.getIndexByHeight_(height + this.availableHeight_ + this.verticalOffset_);
        }
      } else { //End index is set, start index must be NaN here.
        totalHeight = this.getHeightByIndexes_(0, this.endIndex_);
        if (totalHeight < this.availableHeight_) { //Going from start of list.
          this.startIndex_ = 0;
          this.verticalOffset_ = 0;
          this.endIndex_ = this.getIndexByHeight_(this.availableHeight_);
        } else {
          /*
           This case has another behaviour: when start index is set, we consider the vertical offset.
           In this case (end index is set instead), we suppose that end index cell is fully visible in the end
           of data grid. It means that we do not consider the vertical offset and calculate it as well.
           */
          this.startIndex_ = this.getIndexByHeight_(this.heightCache_[this.endIndex_] - this.availableHeight_);
          this.verticalOffset_ = this.getHeightByIndexes_(this.startIndex_, this.endIndex_) - this.availableHeight_;
        }
      }
    }

  } else {
    this.startIndex_ = 0;
    this.endIndex_ = 0;
    this.verticalOffset_ = 0;
  }
  this.positionRecalculated_ = true;
  this.markConsistent(anychart.ConsistencyState.POSITION);
};


/**
 * Gets periods map.
 * @return {Object} - Map that contains related period by its id.
 */
anychart.core.gantt.Controller.prototype.getPeriodsMap = function() {
  return this.periodsMap_;
};


/**
 * Gets/sets source data tree.
 * @param {anychart.data.Tree=} opt_value - Value to be set.
 * @return {(anychart.core.gantt.Controller|anychart.data.Tree)} - Current value or itself for method chaining.
 */
anychart.core.gantt.Controller.prototype.data = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if ((this.data_ != opt_value) && (opt_value instanceof anychart.data.Tree)) {
      if (this.data_) this.data_.unlistenSignals(this.dataInvalidated_, this); //Stop listening old tree.
      this.data_ = opt_value;
      this.data_.listenSignals(this.dataInvalidated_, this);

      this.expandedItemsTraverser_ = this.data_.getTraverser();
      this.expandedItemsTraverser_.traverseChildrenCondition(this.traverseChildrenCondition_);

      this.invalidate(anychart.ConsistencyState.DATA, anychart.Signal.NEEDS_REAPPLICATION);
    }
    return this;
  }
  return this.data_;
};


/**
 * Gets/sets vertical offset.
 * @param {number=} opt_value - Value to be set.
 * @return {(anychart.core.gantt.Controller|number)} - Current value or itself for method chaining.
 */
anychart.core.gantt.Controller.prototype.verticalOffset = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (this.verticalOffset_ != opt_value) {
      this.verticalOffset_ = opt_value;
      this.invalidate(anychart.ConsistencyState.POSITION, anychart.Signal.NEEDS_REAPPLICATION);
    }
    return this;
  }
  return this.verticalOffset_;
};


/**
 * Gets/sets start index.
 * NOTE: Calling this method sets this.endIndex_ to NaN to recalculate value correctly anew.
 * @param {number=} opt_value - Value to be set.
 * @return {(anychart.core.gantt.Controller|number)} - Current value or itself for method chaining.
 */
anychart.core.gantt.Controller.prototype.startIndex = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (this.startIndex_ != opt_value && !isNaN(opt_value)) {
      this.startIndex_ = opt_value;
      this.endIndex_ = NaN;
      this.invalidate(anychart.ConsistencyState.POSITION, anychart.Signal.NEEDS_REAPPLICATION);
    }
    return this;
  }
  return this.startIndex_;
};


/**
 * Gets/sets end index.
 * NOTE: Calling this method sets this.startIndex_ to NaN to recalculate value correctly anew.
 * @param {number=} opt_value - Value to be set.
 * @return {(anychart.core.gantt.Controller|number)} - Current value or itself for method chaining.
 */
anychart.core.gantt.Controller.prototype.endIndex = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (this.endIndex_ != opt_value && !isNaN(opt_value)) {
      this.endIndex_ = opt_value;
      this.startIndex_ = NaN;
      this.invalidate(anychart.ConsistencyState.POSITION, anychart.Signal.NEEDS_REAPPLICATION);
    }
    return this;
  }
  return this.endIndex_;
};


/**
 * Gets/sets available height.
 * @param {number=} opt_value - Value to be set.
 * @return {(anychart.core.gantt.Controller|number)} - Current value or itself for method chaining.
 */
anychart.core.gantt.Controller.prototype.availableHeight = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (this.availableHeight_ != opt_value) {
      this.availableHeight_ = opt_value;
      this.invalidate(anychart.ConsistencyState.POSITION, anychart.Signal.NEEDS_REAPPLICATION);
    }
    return this;
  }
  return this.availableHeight_;
};


/**
 * Gets/sets data grid.
 * @param {anychart.core.ui.DataGrid=} opt_value - Value to be set.
 * @return {(anychart.core.ui.DataGrid|anychart.core.gantt.Controller)} - Current value or itself for method chaining.
 */
anychart.core.gantt.Controller.prototype.dataGrid = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (this.dataGrid_ != opt_value) {
      this.dataGrid_ = opt_value;
      this.invalidate(anychart.ConsistencyState.POSITION, anychart.Signal.NEEDS_REAPPLICATION);
    }
    return this;
  }
  return this.dataGrid_;
};


/**
 * Gets/sets timeline.
 * @param {anychart.core.gantt.Timeline=} opt_value - Value to be set.
 * @return {(anychart.core.gantt.Timeline|anychart.core.gantt.Controller)} - Current value or itself for method chaining.
 */
anychart.core.gantt.Controller.prototype.timeline = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (this.timeline_ != opt_value) {
      this.timeline_ = opt_value;
      this.invalidate(anychart.ConsistencyState.POSITION, anychart.Signal.NEEDS_REAPPLICATION);
    }
    return this;
  }
  return this.timeline_;
};


/**
 * Runs controller.
 * Actually clears all consistency states and applies changes to related data grid.
 * @return {anychart.core.gantt.Controller} - Itself for method chaining.
 */
anychart.core.gantt.Controller.prototype.run = function() {
  if (!this.isConsistent()) {
    if (this.hasInvalidationState(anychart.ConsistencyState.DATA)) {
      this.linearizeData_();
      this.markConsistent(anychart.ConsistencyState.DATA);
      this.invalidate(anychart.ConsistencyState.VISIBILITY);
    }

    if (this.hasInvalidationState(anychart.ConsistencyState.VISIBILITY)) {
      this.getVisibleData_();
      this.markConsistent(anychart.ConsistencyState.VISIBILITY);
      this.invalidate(anychart.ConsistencyState.POSITION);
    }

    this.recalculate();
  }

  //This must be called anyway. Clears consistency states of data grid not related to controller.
  if (this.dataGrid_)
    this.dataGrid_.drawInternal(this.visibleData_, this.startIndex_, this.endIndex_, this.verticalOffset_, this.availableHeight_, this.positionRecalculated_);

  if (this.timeline_)
    this.timeline_.drawInternal(this.visibleData_, this.startIndex_, this.endIndex_, this.verticalOffset_, this.availableHeight_,
        this.minDate_, this.maxDate_, this.positionRecalculated_);

  if (this.verticalScrollBar_) {
    this.verticalScrollBar_.suspendSignalsDispatching();
    this.verticalScrollBar_.handlePositionChange(false);

    var itemHeight = this.getHeightByIndexes_(this.startIndex_, this.startIndex_);
    var height = this.heightCache_[this.startIndex_] - itemHeight;

    var start = height + this.verticalOffset_;
    var end = start + this.availableHeight_;

    var totalEnd = this.heightCache_[this.heightCache_.length - 1];

    var contentBoundsSimulation = new acgraph.math.Rect(0, 0, 0, totalEnd);

    var startRatio = anychart.math.round(start / totalEnd, 4);
    var endRatio = anychart.math.round(end / totalEnd, 4);

    this.verticalScrollBar_
        .contentBounds(contentBoundsSimulation)
        .setRatio(startRatio, endRatio)
        .draw()
        .handlePositionChange(true)
        .resumeSignalsDispatching(false);
  }

  this.positionRecalculated_ = false;
  return this;
};


/**
 * Generates vertical scroll bar.
 * @return {anychart.core.ui.ScrollBar} - Scroll bar.
 */
anychart.core.gantt.Controller.prototype.getScrollBar = function() {
  if (!this.verticalScrollBar_) {
    this.verticalScrollBar_ = new anychart.core.ui.ScrollBar();
    this.verticalScrollBar_.layout(anychart.enums.Layout.VERTICAL);

    var controller = this;

    this.verticalScrollBar_.listen(anychart.enums.EventType.SCROLL_CHANGE, function(e) {
      var startRatio = e['startRatio'];
      var endRatio = e['endRatio'];
      var totalHeight = controller.heightCache_[controller.heightCache_.length - 1];

      controller.suspendSignalsDispatching();

      if (startRatio == 0) { //This fixed JS rounding troubles.
        controller
            .verticalOffset(0)
            .startIndex(0);
      } else if (endRatio == 1) { //This fixed JS rounding troubles.
        controller.endIndex(controller.heightCache_.length); //This exceeds MAX index (max is length-1). That's why it will set visual appearance correctly.
      } else {
        var startHeight = Math.round(startRatio * totalHeight);
        var startIndex = controller.getIndexByHeight_(startHeight);
        var previousHeight = startIndex ? controller.heightCache_[startIndex - 1] : 0;
        var verticalOffset = startHeight - previousHeight;
        controller
            .verticalOffset(verticalOffset)
            .startIndex(startIndex);
      }

      controller.resumeSignalsDispatching(false);
      controller.run();
    });
  }
  return this.verticalScrollBar_;
};


/**
 * Scrolls controller to pixel offset specified.
 * TODO (A.Kudryavtsev): Describe how this method fits to total height and available height.
 * @param {number} pxOffset - Vertical pixel total offset.
 * @return {anychart.core.gantt.Controller} - Itself for method chaining.
 */
anychart.core.gantt.Controller.prototype.scrollTo = function(pxOffset) {
  pxOffset = Math.max(pxOffset, 0);
  var totalHeight = this.heightCache_[this.heightCache_.length - 1];
  if (pxOffset) {
    this.suspendSignalsDispatching();
    if (pxOffset > totalHeight - this.availableHeight_) { //auto scroll to end
      this.endIndex(this.heightCache_.length); //This exceeds MAX index (max is length-1). That's why it will set visual appearance correctly.
    } else {
      var itemIndex = this.getIndexByHeight_(pxOffset);
      var previousHeight = itemIndex ? this.heightCache_[itemIndex - 1] : 0;
      var verticalOffset = itemIndex - previousHeight;
      this
          .verticalOffset(verticalOffset)
          .startIndex(itemIndex);
    }

    this.resumeSignalsDispatching(false);
    this.run();
  }
  return this;
};


/**
 * Performs vertical scroll to rowIndex specified.
 * TODO (A.Kudryavtsev): Describe how this method fits to total rows count.
 * @param {number} rowIndex - Row index to scroll to.
 * @return {anychart.core.gantt.Controller} - Itself for method chaining.
 */
anychart.core.gantt.Controller.prototype.scrollToRow = function(rowIndex) {
  rowIndex = goog.math.clamp(rowIndex, 0, this.heightCache_.length - 1);
  this
      .suspendSignalsDispatching()
      .startIndex(rowIndex)
      .verticalOffset(0)
      .resumeSignalsDispatching(false)
      .run();
  return this;
};


/**
 * Scrolls controller to set end index specified.
 * @param {number=} opt_index - End index to be set.
 * @return {anychart.core.gantt.Controller} - Itself for method chaining.
 */
anychart.core.gantt.Controller.prototype.scrollToEnd = function(opt_index) {
  opt_index = opt_index || this.heightCache_.length - 1;
  return /** @type {anychart.core.gantt.Controller} */ (this.endIndex(opt_index));
};


/**
 * Collapses/expands all.
 * @param {boolean} value - Value to be set.
 * @return {anychart.core.gantt.Controller} - Itself for method chaining.
 * @private
 */
anychart.core.gantt.Controller.prototype.collapseAll_ = function(value) {
  this.data_.suspendSignalsDispatching();
  var fullPassageTraverser = this.data_.getTraverser();
  while (fullPassageTraverser.advance()) {
    var item = fullPassageTraverser.current();
    item.meta(anychart.enums.GanttDataFields.COLLAPSED, value);
  }

  this.data_.resumeSignalsDispatching(true);
  return this;
};


/**
 * Expands all.
 * @return {anychart.core.gantt.Controller} - Itself for method chaining.
 */
anychart.core.gantt.Controller.prototype.expandAll = function() {
  return this.collapseAll_(false);
};


/**
 * Collapses all.
 * @return {anychart.core.gantt.Controller} - Itself for method chaining.
 */
anychart.core.gantt.Controller.prototype.collapseAll = function() {
  return this.collapseAll_(true);
};