if(!_.pyramid_funnel){_.pyramid_funnel=1;(function($){var FX=function(a,b,c){$.Jy.call(this,null,[],[],b,c);this.Aa=a},HX=function(a,b,c){$.Jy.call(this,null,[],[],b,c);this.Aa=a;this.g=!GX(this.Aa);this.nz=this.Aa.i("connectorStroke")},IX=function(a,b,c){$.Kw.call(this);$.V(this);this.he=a;this.Fa("pieFunnelPyramidBase",a);this.Yc=null;this.D=[];this.xe=null;this.ga=1;this.j=this.Da=null;this.state=new $.pw(this);this.data(b||null,c);a={};$.S(a,[["fill",528,1],["stroke",528,1],["hatchFill",528,1],["labels",0,0],["markers",0,0]]);this.ba=new $.sx(this,
a,$.Kl);this.ba.pa("labelsAfterInitCallback",function(a){$.L(a,this.Vd,this);a.nb(this);this.u(4096,1)});this.ba.pa("markersAfterInitCallback",$.zx);a={};$.S(a,[["fill",16,1],["stroke",16,1],["hatchFill",0,0],["labels",0,0],["markers",0,0]]);this.wa=new $.sx(this,a,$.$n);this.wa.pa("labelsFactoryConstructor",$.ux);this.Ca=new $.sx(this,a,$.ao);this.Ca.pa("labelsFactoryConstructor",$.ux);$.S(this.va,[["baseWidth",16,1],["neckHeight",16,1],["neckWidth",16,1],["pointsPadding",16,1],["reversed",16,1],
["overlapMode",4096,1],["connectorLength",4100,9],["connectorStroke",16,1]]);this.da(!1)},JX=function(a,b){var c=a.aa().o("point");if($.p(c)){var d=$.Gl("fill",1,!0)(a,b,!1,!0);c.fill(d);d=$.Gl("stroke",2,!0)(a,b,!1,!0);c.stroke(d)}},KX=function(a,b){var c=a.aa().o("hatchPoint");if(null!=c){var d=$.Gl("hatchFill",3,!0)(a,b,!1);c.stroke(null).fill(d)}},LX=function(a,b){var c=a.G,d=a.f.height,e=a.$a,f=a.ta;return b>d-f||d==f?e:e+(d-f-b)/(d-f)*(c-e)},MX=function(a){a=$.N(a);return 0>=a||!(0,window.isFinite)(a)},
NX=function(a){var b=a.aa(),c=b.la(),d=a.f,e;var f=b.o("height")/2;var h=b.o("startY");var k=b.o("height")+h;var l=null;if(e=a.Ja)c?c==b.Fb()-1?(h+=e/2,h>k&&(h=k-a.ga)):(h+=e/2,k-=e/2,h>k&&(h=b.o("startY")+f,k=h+a.ga)):(k-=e/2,k<h&&(k=a.ga));var m=LX(a,h);c=a.b-m/2;f=c+m;m=LX(a,k);e=a.b-m/2;m=e+m;h+=d.top;k+=d.top;c=d.left+c;f=d.left+f;0<a.ta&&h<a.Ga&&k>a.Ga&&(l=k,k=a.Ga,m=LX(a,k),e=a.b-m/2,m=e+m);e=d.left+e;m=d.left+m;a.i("reversed")||(h=d.height-(h-d.top)+d.top,k=d.height-(k-d.top)+d.top,l=l?d.height-
(l-d.top)+d.top:null,h=[k,k=h][0],c=[e,e=c][0],f=[m,m=f][0]);b.o("x1",c);b.o("x2",f);b.o("x3",e);b.o("x4",m);b.o("y1",h);b.o("y2",k);b.o("y3",l)},OX=function(a,b,c,d){var e=a.labels();$.V(e);e.fontOpacity(b);e.Y();e.da(!1);if(d&&a.O)for(b=0;b<a.O.length;b++)if(d=a.O[b])e=a.i("connectorStroke"),e=$.xl(e,c),d.stroke(e)},Aga=function(a){var b=a.aa(),c=b.la(),d=$.cB(a.$e),e=$.cB(a.g);b.o("point",d);b.o("hatchPoint",e);NX(a);var f=b.o("x1"),h=b.o("x2"),k=b.o("x3"),l=b.o("x4"),m=b.o("y1"),n=b.o("y2"),q=
b.o("y3");d.moveTo(f,m).lineTo(h,m);q?d.lineTo(l,n).lineTo(l,q).lineTo(k,q).lineTo(k,n):d.lineTo(l,n).lineTo(k,n);d.close();b.o("point",d);d.tag={index:c,W:a};b=$.uw(a.state,b.la());JX(a,b);e&&(e.be(d.F()),e.tag={index:c,W:a},KX(a,b))},SX=function(a,b,c){var d=PX(a),e=a.aa(),f=a.f,h=$.p(c)?!!(c&$.ao):null,k=$.p(c)?!h&&!!(c&$.$n):null,l=e.get("normal");l=$.p(l)?l.label:void 0;var m=e.get("hovered");m=$.p(m)?m.label:void 0;var n=e.get("selected");n=$.p(n)?n.label:void 0;l=$.Ho(l,e.get("label"));m=k?
$.Ho(m,e.get("hoverLabel")):null;h=(n=h?$.Ho(n,e.get("selectLabel")):null)||m||l||{};l=$.N(e.o("x1"));n=$.N(e.o("x2"));m=$.N(e.o("y1"));k=$.N(e.o("y2"));var q=$.N(e.o("y3"));e=n-l;k=q?q-m:k-m;m+=k/2;n=$.N(h.offsetY)||0;b?c=QX(a,b,c):(c=a.labels().Zk(a.Ec(),null,h),c=$.Sm(c));h=b&&b.i("anchor")||a.labels().i("anchor");b&&(m=b.Cc().value.y);b=m+n;c.height>k&&("left-center"==h||"center"==h||"right-center"==h)&&(m+c.height/2>f.top+f.height&&(m=f.top+f.height-c.height/2),m-c.height/2<f.top&&(m=f.top+c.height/
2));b=RX(a,b);switch(d){case "inside":l+=e/2;break;case "outside-left":l=a.b-b/2;l=f.left+l-a.ca-c.width/2;break;case "outside-left-in-column":l=f.left+c.width/2;break;case "outside-right":l=a.b+b/2;l=f.left+l+a.ca+c.width/2;break;case "outside-right-in-column":l=f.left+f.width-c.width/2}if("left-top"==h||"center-top"==h||"right-top"==h)m-=.5;else if("left-bottom"==h||"center-bottom"==h||"right-bottom"==h)m+=.5;return{value:{x:l,y:m}}},QX=function(a,b,c){var d=!!(c&$.ao),e=!d&&!!(c&$.$n);c=a.data().get(b.la(),
"label");e=e?a.data().get(b.la(),"hoverLabel"):null;d=(d?a.data().get(b.la(),"selectLabel"):null)||e||c||{};a.data().o(b.la(),"labelWidthForced")&&(d=$.Jc(d),d.width=b.width());a.aa().select(b.la());b.Tf(a.Ec());a=a.labels().Zk(b.Tf(),b.Cc(),d);return $.Sm(a)},VX=function(a,b){if("no-overlap"==a.i("overlapMode")&&!GX(a)&&a.labels().enabled()){TX(a);a.Ma=0;var c=a.state.zj()|(b?$.uw(a.state,b.la()):0);UX(a,c,b)}},UX=function(a,b,c){if(10!=a.Ma){for(var d=a.aa().Fb(),e=!1,f,h,k,l,m=a.i("reversed"),
n=0;n<d-1;n++)if(f=m?n:d-1-n,(f=a.labels().ce(f))&&0!=f.enabled()&&(h=QX(a,f,b),k=m?Bga(a,f):Cga(a,f))){l=QX(a,k,b);var q=WX(a,f),r=WX(a,k);q&&r&&q==r||!(l.top<=h.top+h.height)||(e=!0,q&&r?Dga(a,q,r):!q&&r?XX(a,k,f):XX(a,f,k))}e&&((0,$.ye)(a.D,function(a){if(2>a.labels.length){var b=a.Aa;b.D.length&&(a.clear(),$.Fa(b.D,a))}else{for(var d,e,f=0,h=0,k=b=0,l=a.labels.length;k<l;k++)d=a.labels[k],e=a.Aa.state.zj()|$.uw(a.Aa.state,d.la()),e=a.hd(d,e),d=a.Aa.data().o(d.la(),"point"),d=d.lb(),k||(f=d.top),
b+=e.height,h+=d.height;h+=a.Aa.Ja*(l-1);f=f+h/2-b/2;h=a.Aa.f;f+b>h.top+h.height&&(f=h.top+h.height-b);f<h.top&&(f=h.top);a.y=f;Ega(a,c)}}),a.Ma++,UX(a,b,c))}},Bga=function(a,b){if(!b)return null;var c=a.aa().Fb();if(b.la()==c-1)return null;for(var d,e=b.la()+1;e<=c-1;e++)if((d=a.labels().ce(e))&&!1!==d.enabled())return d;return null},Cga=function(a,b){if(!b||0==b.la())return null;for(var c,d=b.la()-1;0<=d;d--)if((c=a.labels().ce(d))&&!1!==c.enabled())return c;return null},XX=function(a,b,c){var d=
WX(a,b);null===d?(d=new YX(a),d.kB(b),d.kB(c),a.D.push(d)):d.kB(c)},WX=function(a,b){return a.D.length?$.xa(a.D,function(a){return-1!==(0,$.za)(a.labels,b)}):null},Dga=function(a,b,c){var d=b.labels[0].la(),e=c.labels[0].la();b.labels=a.i("reversed")==d<e?$.Ga(b.labels,c.labels):$.Ga(c.labels,b.labels);$.Fa(a.D,c)},TX=function(a){a.D.length&&((0,$.ye)(a.D,function(a){a.clear()}),a.D.length=0)},GX=function(a){return"inside"==PX(a)},ZX=function(a){a=PX(a);return"outside-right-in-column"==a||"outside-left-in-column"==
a},$X=function(a){a=PX(a);return"outside-left"==a||"outside-left-in-column"==a},aY=function(a){a=PX(a);return"outside-right"==a||"outside-right-in-column"==a},Fga=function(a){if(a.labels().enabled()&&!GX(a)){NX(a);var b=a.aa();b.o("labelWidthForced",void 0);var c=a.f,d=b.get("label"),e=SX(a),f=a.Ec();f=a.labels().Zk(f,e,d);f=$.Sm(f);d=f.left;e=f.left+f.width;f=a.i("reversed")?LX(a,f.top-c.top):LX(a,c.height-(f.top+f.height)+c.top);if($X(a)){var h=a.b-f/2;h=c.left+h;var k=a.G/2;k=c.width-a.b-k;ZX(a)?
e+5>h&&(h=e+5-h,h>k?(a.b+=k,h=a.b-f/2,h=c.left+h,b.o("labelWidthForced",h-5-d)):a.b+=h):d<c.left&&(h=Math.abs(c.left-d),h>k?(a.b+=k,h=a.b-f/2,a=h-a.ca,10>a&&(a=10),b.o("labelWidthForced",a)):a.b+=h)}else if(aY(a))if(h=a.b+f/2,h+=c.left,k=a.G/2,k=c.width-(c.width-a.b)-k,ZX(a)){if(0>d||d-5<h)h=Math.abs(h-d+5),0>d||h>k?(a.b=a.b-k,h=a.b+f/2,h+=c.left,b.o("labelWidthForced",e-5-h)):a.b=a.b-h}else e>c.left+c.width&&(h=e-(c.left+c.width),h>k?(a.b=a.b-k,a=c.left+c.width-d+k,10>a&&(a=10),b.o("labelWidthForced",
a)):a.b=a.b-h)}},PX=function(a){a=a.labels().i("position");return $.bk(Gga,"outside"==a?"outside-left":a,"outside-left-in-column")},bY=function(a,b,c,d){var e=a.f,f=b.la();f=a.data().o(f,"point").lb();b=QX(a,b,d);d=b.left;var h=b.top+b.height/2;f=f.top+f.height/2;var k=RX(a,f);if($X(a)){d+=b.width;var l=a.b-k/2;l+=e.left;d>l&&5>Math.abs(f-h)&&(d=l-5)}else aY(a)&&(l=a.b+k/2,l+=e.left,d<l&&5>Math.abs(f-h)&&(d=l+5));c.clear().moveTo(d,h).lineTo(l,f+.001)},cY=function(a,b,c){var d=b.la();if(a.O[d])bY(a,
b,a.O[d],c);else{var e=$.cB(a.U);a.O[d]=e;e.stroke(a.i("connectorStroke"));bY(a,b,e,c)}},Hga=function(a,b){b=$.fk(b);var c=a.f,d=a.aa(),e=d.o("point").lb(),f=d.o("x1"),h=d.o("y1");switch(b){case "left-top":h=d.o("y1");f=d.o("x1");break;case "left-center":h+=e.height/2;d=RX(a,h);f=a.b-d/2;f+=c.left;break;case "left-bottom":h+=e.height;f=d.o("x3");break;case "center-top":f=a.b;f+=c.left;break;case "center":h+=e.height/2;RX(a,h);f=a.b;f+=c.left;break;case "center-bottom":h+=e.height;RX(a,h);f=a.b;f+=
c.left;break;case "right-top":d=RX(a,h);f+=d;break;case "right-center":h+=e.height/2;d=RX(a,h);f=a.b+d/2;f+=c.left;break;case "right-bottom":f=d.o("x4"),h+=e.height}return{value:{x:f,y:h}}},RX=function(a,b){var c=a.f;return a.i("reversed")?LX(a,b-c.top):LX(a,c.height-b+c.top)},dY=function(a){var b=a.Wa();a.gc("mousemove",a.YI);b.Pc()},YX=function(a){this.Aa=a;this.labels=[]},Ega=function(a,b){var c=0,d=0,e=null,f=null,h=null,k=a.Aa.state.zj()|(b?$.uw(a.Aa.state,b.la()):0);(0,$.ye)(a.labels,function(b){var l=
b.Cc().value,n=a.hd(b,k),q=a.y+c+d+n.height/2;if(e&&f&&h){var r=h.y+f.height/2+(e.i("offsetY")||0),t=q-n.height/2+(b.i("offsetY")||0);t<r&&(q+=r-t)}b.Cc({value:{x:l.x,y:q}});b.Y();cY(a.Aa,b,k);c+=n.height;d+=b.i("offsetY")||0;e=b;f=n;h={x:l.x,y:q}})},eY=function(a,b){var c=new IX("funnel",a,b);c.nd();return c},fY=function(a,b){var c=new IX("pyramid",a,b);c.nd();return c},Gga={uO:"inside",Hla:"outside-left",Ila:"outside-left-in-column",Jla:"outside-right",Kla:"outside-right-in-column"};$.H(FX,$.Jy);
$.g=FX.prototype;$.g.update=function(){this.b.length=this.f.length=0;for(var a=this.Aa.Jf();a.advance();)if(!a.o("missing")){var b=a.o("x1"),c=a.o("x2"),d=a.o("x3"),e=a.o("x4"),f=a.o("y1"),h=a.o("y2"),k=a.o("y3");a.o("neck",!!k);this.b.push(b,c,d,e,0,0,0);this.f.push(b,c,d,e,f,h,k?k:0)}};$.g.cw=function(){OX(this.Aa,1E-5,1E-5,!GX(this.Aa))};
$.g.Hm=function(){for(var a=this.Aa.Jf(),b=0;a.advance();)if(!a.o("missing")){a.o("x1",this.coords[b++]);a.o("x2",this.coords[b++]);a.o("x3",this.coords[b++]);a.o("x4",this.coords[b++]);a.o("y1",this.coords[b++]);a.o("y2",this.coords[b++]);a.o("y3",this.coords[b++]);var c=this.Aa,d=a,e=d.o("point");e.clear();var f=d.o("x1"),h=d.o("x2"),k=d.o("x3"),l=d.o("x4"),m=d.o("y1"),n=d.o("y2"),q=d.o("y3");e.moveTo(f,m).lineTo(h,m);d.o("neck")?e.lineTo(l,n).lineTo(l,q).lineTo(k,q).lineTo(k,n):e.lineTo(l,n).lineTo(k,
n);e.close();if(f=d.o("hatchPoint"))c.aa().select(d.la()),f.clear(),f.be(e.F()),d=$.uw(c.state,d.la()),e=$.Gl("hatchFill",3,!0),f.stroke(null).fill(e(c,d,!1))}};$.g.Fl=function(){this.Hm()};$.g.R=function(){FX.B.R.call(this);this.Aa=null};$.H(HX,$.Jy);HX.prototype.update=function(){this.b.length=this.f.length=0;this.b.push(1E-5,1E-5);this.f.push(1,this.nz.opacity||1)};HX.prototype.Hm=function(){OX(this.Aa,this.coords[0],this.coords[1],this.g)};HX.prototype.Fl=function(){this.Hm()};HX.prototype.R=function(){HX.B.R.call(this);this.nz=this.Aa=null;delete this.g};$.H(IX,$.Kw);$.iq(IX,["fill","stroke","hatchFill"],"normal");$.g=IX.prototype;$.g.Ra=function(a){return $.p(a)?(this.ba.K(a),this):this.ba};$.g.kb=function(a){return $.p(a)?(this.wa.K(a),this):this.wa};$.g.selected=function(a){return $.p(a)?(this.Ca.K(a),this):this.Ca};$.g.qa=$.Kw.prototype.qa|16;$.g.ra=$.Kw.prototype.ra|28688;$.g.Se=function(){return[this]};$.g.Lg=function(){return!0};$.g.Uj=function(){return!1};$.g.Ai=function(){return!0};
$.g.data=function(a,b){if($.p(a)){if(a){var c=a.title||a.caption;c&&this.title(c);a.rows&&(a=a.rows)}if(this.cg!==a){this.cg=a;if(this.j!=a||null===a){$.hd(this.jd);delete this.Ud;if($.K(a,$.cr)){var d=a;this.jd=null}else $.K(a,$.mr)?d=(this.jd=a).ee():d=$.A(a)||$.z(a)?(this.jd=new $.mr(a,b)).ee():(this.jd=new $.mr(null)).ee();this.j=d.hj()}$.hd(this.ka);this.ka=this.j;$.L(this.ka,this.Fd,this);this.u(29456,17)}return this}return this.ka};$.g.Fd=function(a){$.X(a,16)&&this.u(29456,17)};
$.g.aa=function(){return this.Ud||(this.Ud=this.ka.aa())};$.g.vc=function(){return this.Ud=this.ka.aa()};$.g.Jf=function(){return this.ka.aa()};$.g.bc=function(a){if($.K(a,$.ls))return this.Hc($.ls,a),this;if($.K(a,$.is))return this.Hc($.is,a),this;$.D(a)&&"range"==a.type?this.Hc($.ls):($.D(a)||null==this.Da)&&this.Hc($.is);return $.p(a)?(this.Da.K(a),this):this.Da};
$.g.pf=function(a){this.xe||(this.xe=new $.ks,$.W(this,"markerPalette",this.xe),$.L(this.xe,this.aH,this));return $.p(a)?(this.xe.K(a),this):this.xe};$.g.me=function(a){this.Yc||(this.Yc=new $.js,$.W(this,"hatchFillPalette",this.Yc),$.L(this.Yc,this.qG,this));return $.p(a)?(this.Yc.K(a),this):this.Yc};$.g.Hc=function(a,b){if($.K(this.Da,a))b&&this.Da.K(b);else{var c=!!this.Da;$.hd(this.Da);this.Da=new a;b&&this.Da.K(b);$.L(this.Da,this.Ff,this);c&&this.u(528,1)}};
$.g.Ff=function(a){$.X(a,2)&&this.u(528,1)};$.g.aH=function(a){$.X(a,2)&&this.u(528,1)};$.g.qG=function(a){$.X(a,2)&&this.u(528,1)};$.g.remove=function(){TX(this);this.$e&&this.$e.parent(null);IX.B.remove.call(this)};$.g.Hu=function(){var a=this.aa();this.Da&&$.K(this.Da,$.ls)&&$.ms(this.Da,a.Fb())};
$.g.Ri=function(a){if(!this.nf()){this.mb();var b=this.aa();this.J(4)&&this.u(4112);if(this.J(16)){this.$e?this.$e.clear():(this.$e=new $.bB(function(){return $.Nj()},function(a){a.clear()}),this.$e.zIndex(30),this.$e.parent(this.Na));this.g?this.g.clear():(this.g=new $.bB(function(){return $.Nj()},function(a){a.clear()}),this.g.parent(this.Na),this.g.zIndex(31).zd(!0));this.Ja=Math.abs($.zm($.M(this.i("pointsPadding"),a.height),2));this.G=Math.abs($.zm($.M(this.i("baseWidth"),a.width),2));this.$a=
Math.abs($.zm($.M(this.i("neckWidth"),a.width),2));this.ta=Math.abs($.zm($.M(this.i("neckHeight"),a.height),2));this.Ga=a.top+a.height-this.ta;this.b=a.width/2;this.ca=$.M(this.i("connectorLength"),(a.width-this.G)/2);0>this.ca&&(this.ca=5);this.f=a;var c=0,d=b.Fb()-$.N(this.Ia("count")),e=$.zm(this.Ja/a.height*100,2);for(b.reset();b.advance();){var f=b.get("value");var h=MX(f);f=MX(f)?0:$.N(f);var k=$.zm(f/$.N(this.Ia("sum"))*100,2);h&&(k=e);k=$.zm(a.height/(100+d*e)*k,2);k||(k=this.ga);b.o("value",
f);b.o("height",k);b.o("startY",c);b.o("missing",h);c+=k;Fga(this)}for(b.reset();b.advance();)c=b.la(),"selected"==String(b.get("state")).toLowerCase()&&this.state.vh($.ao,c),Aga(this);if(this.O)for(c=0;c<this.O.length;c++)(f=this.O[c])&&f.stroke(this.i("connectorStroke"));this.u(4096);this.u(8192);this.I(16)}if(this.J(8192)){this.Hb().P()||this.Hb().P(this.Na);this.Hb().clear();for(b.reset();b.advance();)this.Ep(this.state.xc|$.uw(this.state,b.la()));this.Hb().Y();this.I(8192)}if(this.J(4096)){this.labels().P()||
this.labels().P(this.Na);this.labels().clear();this.U&&this.U.clear();c=GX(this)?this.ma.insideLabels:this.ma.outsideLabels;this.labels().kq(c.autoColor);this.labels().disablePointerEvents(c.disablePointerEvents);GX(this)||(this.ca=$.M(this.i("connectorLength"),(a.width-this.G)/2),0>this.ca&&(this.ca=5),this.U?this.U.clear():(this.U=new $.bB(function(){return $.Nj()},function(a){a.clear()}),this.U.parent(this.Na),this.U.zIndex(32)),this.U.clip(a),this.O=[]);for(b.reset();b.advance();)GX(this)&&b.o("labelWidthForced",
void 0),this.Yd(this.state.xc|$.uw(this.state,b.la()));VX(this);this.labels().Y();this.labels().Hd().clip(a);this.I(4096)}}};
$.g.gK=function(){var a=$.Wq(this,"animation");if(a&&a.i("enabled")&&0<a.i("duration"))if(this.ug&&1==this.ug.Yb)this.ug.update();else if(this.J(2048)){$.hd(this.ug);this.ug=new $.$A;var b=a.i("duration");a=b*(1-.85);b=new FX(this,.85*b);a=new HX(this,a);this.ug.add(b);this.ug.add(a);this.ug.sa("begin",function(){this.Cj=this.i("connectorStroke");this.pa("connectorStroke","none");$.Cw(this,!0);$.Xq(this,{type:"animationstart",chart:this})},!1,this);this.ug.sa("end",function(){this.pa("connectorStroke",
this.Cj);$.Cw(this,!1);$.Xq(this,{type:"animationend",chart:this})},!1,this);this.ug.play(!1)}};$.g.ag=function(a){a=$.Y.prototype.ag.call(this,a);var b=$.Xn(a.domTarget);a.pointIndex=$.N(b.index);return a};$.g.ph=function(a){(a=this.Eg(a))&&this.dispatchEvent(a)};
$.g.Eg=function(a){var b;"pointIndex"in a?b=a.pointIndex:"labelIndex"in a?b=a.labelIndex:"markerIndex"in a&&(b=a.markerIndex);b=$.N(b);a.pointIndex=b;var c=a.type;switch(c){case "mouseout":c="pointmouseout";break;case "mouseover":c="pointmouseover";break;case "mousemove":c="pointmousemove";break;case "mousedown":c="pointmousedown";break;case "mouseup":c="pointmouseup";break;case "click":c="pointclick";break;case "dblclick":c="pointdblclick";break;default:return null}var d=this.data().aa();d.select(b)||
d.reset();return{type:c,actualTarget:a.target,iterator:d,sliceIndex:b,pointIndex:b,target:this,originalEvent:a,point:this.Id(b)}};$.g.Id=function(a){var b=new $.Mz(this,a),c;this.aa().select(a)&&b.ux()&&!MX(c=b.get("value"))&&(a=$.zm(c/this.Ag("sum")*100,2),b.Ia("percentValue",a),b.Ia("yPercentOfTotal",a));return b};$.g.Sr=function(){return[]};$.g.Bj=function(a){$.p(a)?this.zi(a):this.tk();return this};
$.g.Jd=function(a){var b;(b=$.tw(this.state,$.$n))||(b=!!(this.state.zj()&$.$n));if(b&&this.enabled()){var c;$.p(a)?c=a:c=this.state.xc==$.Kl?window.NaN:void 0;this.state.Eh($.$n,c);a=this.aa();for(a.reset();a.advance();)this.Yd($.uw(this.state,a.la()));VX(this);dY(this)}};
$.g.zi=function(a,b){if(!this.enabled())return this;if($.A(a)){var c=$.zw(this.state,$.$n);for(var d=0;d<c.length;d++)$.Aa(a,c[d])||this.state.Eh($.$n,c[d]);$.xw(this.state,a);$.p(b)&&this.YI(b);for(c=this.vc();c.advance();)this.Yd($.uw(this.state,c.la()));VX(this)}else if($.ea(a)&&(this.Jd(),$.xw(this.state,a),$.p(b)&&this.YI(b),this.f)){for(c=this.vc();c.advance();)this.Yd($.uw(this.state,c.la()));VX(this,this.labels().ce(a))}this.aa().select(a[0]||a);return this};
$.g.tk=function(){this.enabled()&&(this.state.vh($.$n),VX(this,null))};$.g.select=function(a){if(!this.enabled())return this;$.p(a)?this.Fi(a):this.cu();return this};$.g.cu=function(){this.enabled()&&(dY(this),this.state.vh($.ao),VX(this,null))};
$.g.Fi=function(a,b){if(!this.enabled())return this;var c=!(b&&b.shiftKey);$.A(a)?(b||this.Xd(),this.state.vh($.ao,a,c?$.$n:void 0)):$.ea(a)&&this.state.vh($.ao,a,c?$.$n:void 0);if(this.f){for(c=this.vc();c.advance();)this.Yd($.uw(this.state,c.la()));var d;$.ea(a)&&(d=this.labels().ce(a));VX(this,d)}this.aa().select(a[0]||a);return this};
$.g.Xd=function(a){if(this.enabled()){var b;$.p(a)?b=a:b=this.state.xc==$.Kl?window.NaN:void 0;this.state.Eh($.ao,b);a=this.aa();for(a.reset();a.advance();)this.Yd($.uw(this.state,a.la()));VX(this)}};$.g.Kj=function(a,b){JX(this,a);KX(this,a);this.Ep(a);return b};$.g.Np=$.ia;$.g.Xl=$.ia;$.g.Jk=function(a){this.Yd(a);JX(this,a);KX(this,a);this.Ep(a)};var gY={};$.Vp(gY,0,"baseWidth",$.eq);$.Vp(gY,0,"neckHeight",$.eq);$.Vp(gY,0,"neckWidth",$.eq);$.Vp(gY,0,"pointsPadding",$.eq);$.Vp(gY,0,"reversed",$.eq);
$.Vp(gY,0,"overlapMode",$.sk);$.Vp(gY,0,"connectorLength",$.eq);$.Vp(gY,1,"connectorStroke",$.oq);$.U(IX,gY);$.g=IX.prototype;$.g.Dc=function(a,b,c,d,e,f,h){e=0==b?this.ba:1==b?this.wa:this.Ca;h?a=e.i(a):(h=c.get(0==b?"normal":1==b?"hovered":"selected"),a=$.Ho($.p(h)?h[a]:void 0,c.get($.Ll(b,a)),e.i(a)));$.p(a)&&(a=d(a));return a};$.g.mh=function(){return $.Wb(this.me().mc(this.aa().la())||"diagonal-brick")};$.g.vi=function(){var a=this.aa();return{index:a.la(),sourceHatchFill:this.mh(),iterator:a}};
$.g.we=function(a){var b=this.aa();return{index:b.la(),sourceColor:a||this.bc().mc(b.la())||"blue",iterator:b}};$.g.labels=function(a){return $.p(a)?(this.ba.labels(a),this):this.ba.labels()};$.g.Vd=function(a){var b=0,c=0;$.X(a,1)&&(b|=4096,c|=1);$.X(a,8)&&(b|=4100,c|=9);this.u(b,c)};
$.g.Yd=function(a){var b=this.aa(),c=!!(a&$.ao),d=!c&&!!(a&$.$n),e=b.get("normal");e=$.p(e)?e.label:void 0;var f=b.get("hovered");f=$.p(f)?f.label:void 0;var h=b.get("selected");h=$.p(h)?h.label:void 0;e=$.Ho(e,b.get("label"));f=d?$.Ho(f,b.get("hoverLabel")):null;h=c?$.Ho(h,b.get("selectLabel")):null;var k=b.la(),l,m=null,n=this.kb().labels(),q=this.selected().labels();c?m=l=q:d?m=l=n:l=this.labels();var r=this.labels().ce(k),t=e&&$.p(e.enabled)?e.enabled:null,u=f&&$.p(f.enabled)?f.enabled:null,v=
h&&$.p(h.enabled)?h.enabled:null;n=d||c?d?null===u?null===n.enabled()?null===t?this.labels().enabled():t:n.enabled():u:null===v?null===q.enabled()?null===t?this.labels().enabled():t:q.enabled():v:null===t?this.labels().enabled():t;t=SX(this,null,a);u=this.Ec();q=GX(this);v=!0;if(!d&&!c&&q&&"no-overlap"==this.i("overlapMode")){l=l.Zk(u,t,e,k);v=this.aa();var w=[v.o("x1"),v.o("y1"),v.o("x2"),v.o("y1"),v.o("x4"),v.o("y2"),v.o("x3"),v.o("y2")],x=!0,y;var B=0;for(y=w.length;B<y-1;B+=2){var F=B==y-2?0:
B+2;var C=B==y-2?1:B+3;var I=w[B];var P=w[B+1];var Q=w[F];var T=w[C];var wa=l[B];var ya=l[B+1];F=l[F];C=l[C];v.o("y3")&&4==B&&(P=$.N(v.o("y3")),T=$.N(v.o("y3")));I==Q&&(Q+=.01);x=(x=x&&1==$.Jm(I,P,Q,T,wa,ya))&&1==$.Jm(I,P,Q,T,F,C)}v=x}n&&v?(r?(r.Di(),r.Tf(u),r.Cc(t)):r=this.labels().add(u,t,k),$.lu(r,m),r.ld(e,d?f:h),b.o("labelWidthForced")&&(r.width($.N(b.o("labelWidthForced"))),b=f&&f.anchor?f.anchor:null,h=h&&h.anchor?h.anchor:null,e&&e.anchor&&e.anchor||b||h||(t=SX(this,r,a),r.Cc(t))),r.Y(),(d||
c)&&!r.P()&&this.labels().Hd()&&(r.P(this.labels().Hd()),r.P().parent()||r.P().parent(this.labels().P()),r.Y())):r&&r.clear();n&&!q&&cY(this,r,a);return r};$.g.Hb=function(a){return $.p(a)?(this.ba.Hb(a),this):this.ba.Hb()};$.g.So=function(a){$.X(a,1)&&this.u(8192,1)};$.g.qv=function(){var a=$.Gl("fill",1,!1)(this,$.Kl,!0,!0);return $.xl(a,1,!0)};$.g.Bx=function(){return $.tl(this.qv())};
$.g.Ep=function(a){var b=this.aa(),c=!!(a&$.ao);a=!c&&!!(a&$.$n);var d=b.get("normal");d=$.p(d)?d.marker:void 0;var e=b.get("hovered");e=$.p(e)?e.marker:void 0;var f=b.get("selected");f=$.p(f)?f.marker:void 0;d=$.Ho(d,b.get("marker"));e=$.Ho(e,b.get("hoverMarker"));f=$.Ho(f,b.get("selectMarker"));var h=this.aa().la(),k=this.kb().Hb(),l=this.selected().Hb();b=c?l:a?k:this.Hb();var m=this.Hb().Nq(h),n=d&&$.p(d.enabled)?d.enabled:null,q=e&&$.p(e.enabled)?e.enabled:null,r=f&&$.p(f.enabled)?f.enabled:
null;if(a||c?a?null===q?null===k.enabled()?null===n?this.Hb().enabled():n:k.enabled():q:null===r?null===l.enabled()?null===n?this.Hb().enabled():n:l.enabled():r:null===n?this.Hb().enabled():n){n=d&&d.position?d.position:null;q=e&&e.position?e.position:null;r=f&&f.position?f.position:null;n=a&&(q||k.i("position"))||c&&(r||l.i("position"))||n||this.Hb().i("position");n=Hga(this,n);m?m.Cc(n):m=this.Hb().add(n,h);var t={};n="position anchor offsetX offsetY type size fill stroke enabled".split(" ");d&&
(0,$.ye)(n,function(a){a in d&&(t[a]=d[a])});n=d&&d.type;h=$.p(n)?n:this.Hb().Pa()||this.pf().mc(h);n=e&&e.type;n=$.p(n)?n:k.Pa();q=f&&f.type;q=$.p(q)?q:l.Pa();t.type=c&&$.p(q)?q:a&&$.p(n)?n:h;h=d&&d.fill;h=$.p(h)?h:this.Hb().gn()||this.qv();n=e&&e.fill;n=$.p(n)?n:k.gn();q=f&&f.fill;q=$.p(q)?q:l.gn();t.fill=c&&$.p(q)?q:a&&$.p(n)?n:h;h=d&&d.stroke;h=$.p(h)?h:this.Hb().Tk()||this.Bx();n=e&&e.stroke;k=$.p(n)?n:k.Tk()||this.Bx();n=f&&f.stroke;l=$.p(n)?n:l.Tk()||this.Bx();t.stroke=c&&$.p(l)?l:a&&$.p(k)?
k:h;m.Di();$.mx(m,b);m.ld(t,a?e:f);m.Y()}else m&&m.clear()};$.g.JJ=function(){var a=new $.Ev(0);$.W(this,"tooltip",a);a.Aa(this);$.L(a,this.Yo,this);return a};$.g.Yo=function(){this.Wa().Y()};$.g.YI=function(a){var b=$.Wq(this,"legend");if(!a||!b||a.target!=b){b=this.Wa();var c=this.Ec();a&&($.Wv(b,a.clientX,a.clientY,c),this.sa("mousemove",this.YI))}};
$.g.mb=function(){if(this.J(16384)){this.FH();for(var a=this.data().aa(),b,c=0,d=Number.MAX_VALUE,e=-Number.MAX_VALUE,f=0;a.advance();)b=a.get("value"),MX(b)?c++:(b=MX(b)?0:$.N(b),d=Math.min(b,d),e=Math.max(b,e),f+=b);a=a.Fb()-c;var h;a?h=f/a:d=e=f=h=void 0;this.Ia("count",a);this.Ia("min",d);this.Ia("max",e);this.Ia("sum",f);this.Ia("average",$.zm(h||window.NaN,$.Am(f||0)));this.I(16384)}};
$.g.Ec=function(){var a=this.aa();this.$d||(this.$d=new $.Nv);this.$d.xg(a).cj([this.Id(a.la()),this]);a={x:{value:a.get("x"),type:"string"},value:{value:a.get("value"),type:"number"},name:{value:a.get("name"),type:"string"},index:{value:a.la(),type:"number"},chart:{value:this,type:""}};$.yu(this.$d,a);return this.$d};$.g.jk=function(){return this.Ec()};
$.g.Ul=function(a,b){for(var c=[],d=this.aa().reset(),e;d.advance();){e=d.la();var f=d.get("legendItem")||{},h=null;$.E(b)&&(h=this.Ec(),h.b=this.Id(e),h=b.call(h,h));$.z(h)||(h=String($.p(d.get("name"))?d.get("name"):d.get("x")));var k=$.Gl("fill",1,!1),l=$.Gl("stroke",2,!1),m=$.Gl("hatchFill",3,!1);h={enabled:!0,meta:{pointIndex:e,pointValue:d.get("value"),W:this},iconType:"square",text:h,iconStroke:l(this,$.Kl,!1),iconFill:k(this,$.Kl,!1),iconHatchFill:m(this,$.Kl,!1)};$.Mc(h,f);h.sourceUid=$.oa(this);
h.sourceKey=e;c.push(h)}return c};$.g.gs=function(){return!0};$.g.Yq=function(a,b){var c=a.hi();if(!a||null!=c||(0,window.isNaN)(c))if(c=$.Xn(b.domTarget))c.W=this};$.g.Sp=function(a,b){var c=a.hi();if(!a||null!=c||(0,window.isNaN)(c))if(c=$.Xn(b.domTarget))c.W=this};$.g.Rp=function(a,b){var c=a.hi();if(!a||null!=c||(0,window.isNaN)(c))if(c=$.Xn(b.domTarget))c.W=this};$.g.Gi=function(){return null};$.g.Al=function(a){return $.p(a)?(a=$.ck(a),a!=this.N&&(this.N=a),this):this.N};$.g.oj=function(){return!this.aa().Fb()};
$.g.F=function(){var a=IX.B.F.call(this);a.data=this.data().F();a.palette=this.bc().F();a.hatchFillPalette=this.me().F();a.markerPalette=this.pf().F();a.tooltip=this.Wa().F();$.sq(this,gY,a);a.normal=this.ba.F();a.hovered=this.wa.F();a.selected=this.Ca.F();return{chart:a}};
$.g.X=function(a,b){IX.B.X.call(this,a,b);$.kq(this,gY,a);this.ba.ja(!!b,a);this.ba.ja(!!b,a.normal);this.wa.ja(!!b,a.hovered);this.Ca.ja(!!b,a.selected);this.data(a.data);this.me(a.hatchFillPalette);this.pf(a.markerPalette);this.bc(a.palette);"tooltip"in a&&this.Wa().ja(!!b,a.tooltip)};
$.g.R=function(){$.kd(this.ug,this.ba,this.wa,this.Ca,this.jd,this.j,this.ka,this.Da,this.Yc,this.xe,this.$e,this.g,this.U);this.ka=this.j=this.jd=this.Ca=this.wa=this.ba=this.ug=null;delete this.Ud;this.U=this.g=this.$e=this.xe=this.Yc=this.Da=null;IX.B.R.call(this)};YX.prototype.kB=function(a){this.labels.push(a);this.Aa.i("reversed")?$.Pa(this.labels,function(a,c){return a.la()-c.la()}):$.Pa(this.labels,function(a,c){return c.la()-a.la()})};YX.prototype.clear=function(){this.labels.length=0};
YX.prototype.hd=function(a,b){var c=!!(b&$.ao),d=!c&&!!(b&$.$n),e=this.Aa.data().get(a.la(),"label");d=d?this.Aa.data().get(a.la(),"hoverLabel"):null;c=(c?this.Aa.data().get(a.la(),"selectLabel"):null)||d||e||{};this.Aa.data().o(a.la(),"labelWidthForced")&&(c=$.Jc(c),c.width=a.width());this.Aa.aa().select(a.la());a.Tf(this.Aa.Ec());c=this.Aa.labels().Zk(a.Tf(),a.Cc(),c);return $.Sm(c)};
IX.prototype.nd=function(){this.ba.Fa(this.ma);$.W(this,"normal",this.ba);this.ba.ja(!0,{});$.W(this,"hovered",this.wa);this.wa.ja(!0,{});$.W(this,"selected",this.Ca);this.Ca.ja(!0,{})};var hY=IX.prototype;hY.data=hY.data;hY.getType=hY.Pa;hY.palette=hY.bc;hY.tooltip=hY.Wa;hY.hatchFillPalette=hY.me;hY.markerPalette=hY.pf;hY.labels=hY.labels;hY.markers=hY.Hb;hY.hover=hY.Bj;hY.unhover=hY.Jd;hY.select=hY.select;hY.unselect=hY.Xd;hY.getPoint=hY.Id;hY.normal=hY.Ra;hY.hovered=hY.kb;hY.selected=hY.selected;$.xp.funnel=eY;$.xp.pyramid=fY;$.G("anychart.funnel",eY);$.G("anychart.pyramid",fY);}).call(this,$)}
