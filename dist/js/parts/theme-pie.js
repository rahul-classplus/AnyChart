if(!_.theme_pie){_.theme_pie=1;(function($){$.ra($.fa.anychart.themes.defaultTheme,{pie:{sliceDrawer:function(){$.$D.vector.primitives.donut(this.path,this.centerX+this.explodeX,this.centerY+this.explodeY,this.outerRadius,this.innerRadius,this.startAngle,this.sweepAngle)},interactivity:{multiSelectOnClick:!0,unselectOnClickOutOfPoint:!1},animation:{duration:2E3},title:{text:"Pie Chart"},group:!1,sort:"none",radius:"45%",innerRadius:0,startAngle:0,outsideLabelsCriticalAngle:60,insideLabelsOffset:"50%",center:{fill:"none",stroke:"none"},normal:{labels:{format:"{%PercentValue}{decimalsCount:1,zeroFillDecimals:true}%"},
explode:0,outline:{enabled:!0,width:0,offset:0,fill:$.OL,stroke:"none"}},hovered:{explode:0,outline:{enabled:null,width:10,offset:0,fill:$.HL,stroke:"none"}},selected:{explode:"5%",fill:$.HL,stroke:"none",outline:{enabled:null,width:10,offset:0,fill:$.OL,stroke:"none"}},a11y:{titleFormat:$.WL}},pie3d:{radius:"65%",mode3d:!0,selected:{explode:"5%"},aspect3d:.45,connectorLength:"15%",legendItem:{iconStroke:null}}});}).call(this,$)}
