/*==========================*/
/* customStyle plugin */
/* By Adam Coulombe */
/* Modified version of https://github.com/adamcoulombe/jquery.customSelect */
/* Lightweight, unobtrusive, custom style select boxes with jQuery */
/*==========================*/

(function($){
$.fn.extend({
customStyle : function(options) {
  if(typeof document.body.style.maxHeight !== 'undefined') {
    return this.each(function() {
      var currentSelected = $(this).find(':selected');
      var html = currentSelected.html();
      if(!html){ html=(options && options.empty ? options.empty : '&nbsp;'); }
      $(this).after('<span class="custom-style-select-box"><span class="custom-style-select-box-inner">'+html+'</span></span>').css({position:'absolute', opacity:0,fontSize:$(this).next().css('font-size')});
      var selectBoxSpan = $(this).next();
      var selectBoxWidth = parseInt($(this).width()) - parseInt(selectBoxSpan.css('padding-left')) -parseInt(selectBoxSpan.css('padding-right'));
      var selectBoxSpanInner = selectBoxSpan.find(':first-child');
      selectBoxSpan.css({display:'inline-block'});
      selectBoxSpanInner.css({width:selectBoxWidth, display:'inline-block'});
      var selectBoxHeight = parseInt(selectBoxSpan.height()) + parseInt(selectBoxSpan.css('padding-top')) + parseInt(selectBoxSpan.css('padding-bottom'));
      $(this).width(selectBoxWidth+30).height(selectBoxHeight).change(function(){
      // selectBoxSpanInner.text($(this).val()).parent().addClass('changed');  This was not ideal
      selectBoxSpanInner.text($(this).find(':selected').text()).parent().addClass('changed');
      // Thanks to Juarez Filho & PaddyMurphy
      });
    });
  }
}
});
})(jQuery);

/*==========================*/
/* imagesLoaded plugin */
/*==========================*/

/*
 * jQuery imagesLoaded plugin v2.0.1
 * http://github.com/desandro/imagesloaded
 *
 * MIT License. by Paul Irish et al.
 */

(function(c,n){var k="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";c.fn.imagesLoaded=function(l){function m(){var b=c(h),a=c(g);d&&(g.length?d.reject(e,b,a):d.resolve(e));c.isFunction(l)&&l.call(f,e,b,a)}function i(b,a){b.src===k||-1!==c.inArray(b,j)||(j.push(b),a?g.push(b):h.push(b),c.data(b,"imagesLoaded",{isBroken:a,src:b.src}),o&&d.notifyWith(c(b),[a,e,c(h),c(g)]),e.length===j.length&&(setTimeout(m),e.unbind(".imagesLoaded")))}var f=this,d=c.isFunction(c.Deferred)?c.Deferred():
0,o=c.isFunction(d.notify),e=f.find("img").add(f.filter("img")),j=[],h=[],g=[];e.length?e.bind("load.imagesLoaded error.imagesLoaded",function(b){i(b.target,"error"===b.type)}).each(function(b,a){var e=a.src,d=c.data(a,"imagesLoaded");if(d&&d.src===e)i(a,d.isBroken);else if(a.complete&&a.naturalWidth!==n)i(a,0===a.naturalWidth||0===a.naturalHeight);else if(a.readyState||a.complete)a.src=k,a.src=e}):m();return d?d.promise(f):f}})(jQuery);

/*! Smooth Scroll - v1.4.9 - 2013-01-21
* https://github.com/kswedberg/jquery-smooth-scroll
* Copyright (c) 2013 Karl Swedberg; Licensed MIT */
(function(e){function s(e){return e.replace(/(:|\.)/g,"\\$1")}var t="1.4.9",n={exclude:[],excludeWithin:[],offset:0,direction:"top",scrollElement:null,scrollTarget:null,beforeScroll:function(){},afterScroll:function(){},easing:"swing",speed:400,autoCoefficent:2},r=function(t){var n=[],r=!1,i=t.dir&&t.dir=="left"?"scrollLeft":"scrollTop";return this.each(function(){if(this==document||this==window)return;var t=e(this);t[i]()>0?n.push(this):(t[i](1),r=t[i]()>0,r&&n.push(this),t[i](0))}),n.length||this.each(function(e){this.nodeName==="BODY"&&(n=[this])}),t.el==="first"&&n.length>1&&(n=[n[0]]),n},i="ontouchend"in document;e.fn.extend({scrollable:function(e){var t=r.call(this,{dir:e});return this.pushStack(t)},firstScrollable:function(e){var t=r.call(this,{el:"first",dir:e});return this.pushStack(t)},smoothScroll:function(t){t=t||{};var n=e.extend({},e.fn.smoothScroll.defaults,t),r=e.smoothScroll.filterPath(location.pathname);return this.unbind("click.smoothscroll").bind("click.smoothscroll",function(t){var i=this,o=e(this),u=n.exclude,a=n.excludeWithin,f=0,l=0,c=!0,h={},p=location.hostname===i.hostname||!i.hostname,d=n.scrollTarget||(e.smoothScroll.filterPath(i.pathname)||r)===r,v=s(i.hash);if(!n.scrollTarget&&(!p||!d||!v))c=!1;else{while(c&&f<u.length)o.is(s(u[f++]))&&(c=!1);while(c&&l<a.length)o.closest(a[l++]).length&&(c=!1)}c&&(t.preventDefault(),e.extend(h,n,{scrollTarget:n.scrollTarget||v,link:i}),e.smoothScroll(h))}),this}}),e.smoothScroll=function(t,n){var r,i,s,o,u=0,a="offset",f="scrollTop",l={},c={},h=[];typeof t=="number"?(r=e.fn.smoothScroll.defaults,s=t):(r=e.extend({},e.fn.smoothScroll.defaults,t||{}),r.scrollElement&&(a="position",r.scrollElement.css("position")=="static"&&r.scrollElement.css("position","relative"))),r=e.extend({link:null},r),f=r.direction=="left"?"scrollLeft":f,r.scrollElement?(i=r.scrollElement,u=i[f]()):i=e("html, body").firstScrollable(),r.beforeScroll.call(i,r),s=typeof t=="number"?t:n||e(r.scrollTarget)[a]()&&e(r.scrollTarget)[a]()[r.direction]||0,l[f]=s+u+r.offset,o=r.speed,o==="auto"&&(o=l[f]||i.scrollTop(),o/=r.autoCoefficent),c={duration:o,easing:r.easing,complete:function(){r.afterScroll.call(r.link,r)}},r.step&&(c.step=r.step),i.length?i.stop().animate(l,c):r.afterScroll.call(r.link,r)},e.smoothScroll.version=t,e.smoothScroll.filterPath=function(e){return e.replace(/^\//,"").replace(/(index|default).[a-zA-Z]{3,4}$/,"").replace(/\/$/,"")},e.fn.smoothScroll.defaults=n})(jQuery);

/*
* @fileOverview TouchSwipe - jQuery Plugin
* @version 1.6.0
*
* @author Matt Bryson http://www.github.com/mattbryson
* @see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
* @see http://labs.skinkers.com/touchSwipe/
* @see http://plugins.jquery.com/project/touchSwipe
*
* Copyright (c) 2010 Matt Bryson (www.skinkers.com)
* Dual licensed under the MIT or GPL Version 2 licenses.
*/
(function(d){+"use strict";var n="left",m="right",c="up",u="down",b="in",v="out",k="none",q="auto",j="swipe",r="pinch",e="click",x="horizontal",s="vertical",h="all",f="start",i="move",g="end",o="cancel",a="ontouchstart" in window,w="TouchSwipe";var l={fingers:1,threshold:75,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"button, input, select, textarea, a, .noSwipe"};d.fn.swipe=function(A){var z=d(this),y=z.data(w);if(y&&typeof A==="string"){if(y[A]){return y[A].apply(this,Array.prototype.slice.call(arguments,1))}else{d.error("Method "+A+" does not exist on jQuery.swipe")}}else{if(!y&&(typeof A==="object"||!A)){return t.apply(this,arguments)}}return z};d.fn.swipe.defaults=l;d.fn.swipe.phases={PHASE_START:f,PHASE_MOVE:i,PHASE_END:g,PHASE_CANCEL:o};d.fn.swipe.directions={LEFT:n,RIGHT:m,UP:c,DOWN:u,IN:b,OUT:v};d.fn.swipe.pageScroll={NONE:k,HORIZONTAL:x,VERTICAL:s,AUTO:q};d.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:h};function t(y){if(y&&(y.allowPageScroll===undefined&&(y.swipe!==undefined||y.swipeStatus!==undefined))){y.allowPageScroll=k}if(!y){y={}}y=d.extend({},d.fn.swipe.defaults,y);return this.each(function(){var A=d(this);var z=A.data(w);if(!z){z=new p(this,y);A.data(w,z)}})}function p(S,af){var aF=(a||!af.fallbackToMouseEvents),ax=aF?"touchstart":"mousedown",U=aF?"touchmove":"mousemove",au=aF?"touchend":"mouseup",D=aF?null:"mouseleave",R="touchcancel";var ac=0;var N=null;var ag=0;var aB=0;var A=0;var ai=1;var aH=0;var H=d(S);var O="start";var aE=0;var ah=null;var I=0;var Y=0;var aA=0;var aJ=0;try{H.bind(ax,ar);H.bind(R,M)}catch(aC){d.error("events not supported "+ax+","+R+" on jQuery.swipe")}this.enable=function(){H.bind(ax,ar);H.bind(R,M);return H};this.disable=function(){Q();return H};this.destroy=function(){Q();H.data(w,null);return H};function ar(aM){if(X()){return}if(d(aM.target).closest(af.excludedElements,H).length>0){return}var aN=aM.originalEvent;var aL,aK=a?aN.touches[0]:aN;O=f;if(a){aE=aN.touches.length}else{aM.preventDefault()}ac=0;N=null;aH=null;ag=0;aB=0;A=0;ai=1;pinchDistance=0;ah=T();z();if(!a||(aE===af.fingers||af.fingers===h)||ao()){aI(0,aK);I=B();if(aE==2){aI(1,aN.touches[1]);aB=A=Z(ah[0].start,ah[1].start)}if(af.swipeStatus||af.pinchStatus){aL=aD(aN,O)}}else{aL=false}if(aL===false){O=o;aD(aN,O);return aL}else{aj(true)}}function P(aN){var aQ=aN.originalEvent;if(O===g||O===o||ae()){return}var aM,aL=a?aQ.touches[0]:aQ;var aO=V(aL);Y=B();if(a){aE=aQ.touches.length}O=i;if(aE==2){if(aB==0){aI(1,aQ.touches[1]);aB=A=Z(ah[0].start,ah[1].start)}else{V(aQ.touches[1]);A=Z(ah[0].end,ah[1].end);aH=an(ah[0].end,ah[1].end)}ai=y(aB,A);pinchDistance=Math.abs(aB-A)}if((aE===af.fingers||af.fingers===h)||!a||ao()){N=aq(aO.start,aO.end);C(aN,N);ac=G(aO.start,aO.end);ag=L();if(af.swipeStatus||af.pinchStatus){aM=aD(aQ,O)}if(!af.triggerOnTouchEnd||af.triggerOnTouchLeave){var aK=true;if(af.triggerOnTouchLeave){var aP=at(this);aK=az(aO.end,aP)}if(!af.triggerOnTouchEnd&&aK){O=aG(i)}else{if(af.triggerOnTouchLeave&&!aK){O=aG(g)}}if(O==o||O==g){aD(aQ,O)}}}else{O=o;aD(aQ,O)}if(aM===false){O=o;aD(aQ,O)}}function aa(aM){var aO=aM.originalEvent;if(a){if(aO.touches.length>0){av();return true}}if(ae()){aE=aJ}aM.preventDefault();Y=B();if(af.triggerOnTouchEnd||(af.triggerOnTouchEnd==false&&O===i)){O=g;var aL=((aE===af.fingers||af.fingers===h)||!a);var aK=ah[0].end.x!==0;var aN=aL&&aK&&(am()||ay());if(aN){aD(aO,O)}else{O=o;aD(aO,O)}}else{if(O===i){O=o;aD(aO,O)}}aj(false)}function M(){aE=0;Y=0;I=0;aB=0;A=0;ai=1;z();aj(false)}function W(aK){var aL=aK.originalEvent;if(af.triggerOnTouchLeave){O=aG(g);aD(aL,O)}}function Q(){H.unbind(ax,ar);H.unbind(R,M);H.unbind(U,P);H.unbind(au,aa);if(D){H.unbind(D,W)}aj(false)}function aG(aN){var aM=aN;var aL=ap();var aK=ad();if(!aL){aM=o}else{if(aK&&aN==i&&(!af.triggerOnTouchEnd||af.triggerOnTouchLeave)){aM=g}else{if(!aK&&aN==g&&af.triggerOnTouchLeave){aM=o}}}return aM}function aD(aM,aK){var aL=undefined;if(ab()){aL=al(aM,aK,j)}if(ao()&&aL!==false){aL=al(aM,aK,r)}if(K()&&aL!==false){aL=al(aM,aK,e)}if(aK===o){M(aM)}if(aK===g){if(a){if(aM.touches.length==0){M(aM)}}else{M(aM)}}return aL}function al(aN,aK,aM){var aL=undefined;if(aM==j){if(af.swipeStatus){aL=af.swipeStatus.call(H,aN,aK,N||null,ac||0,ag||0,aE);if(aL===false){return false}}if(aK==g&&ay()){if(af.swipe){aL=af.swipe.call(H,aN,N,ac,ag,aE);if(aL===false){return false}}switch(N){case n:if(af.swipeLeft){aL=af.swipeLeft.call(H,aN,N,ac,ag,aE)}break;case m:if(af.swipeRight){aL=af.swipeRight.call(H,aN,N,ac,ag,aE)}break;case c:if(af.swipeUp){aL=af.swipeUp.call(H,aN,N,ac,ag,aE)}break;case u:if(af.swipeDown){aL=af.swipeDown.call(H,aN,N,ac,ag,aE)}break}}}if(aM==r){if(af.pinchStatus){aL=af.pinchStatus.call(H,aN,aK,aH||null,pinchDistance||0,ag||0,aE,ai);if(aL===false){return false}}if(aK==g&&am()){switch(aH){case b:if(af.pinchIn){aL=af.pinchIn.call(H,aN,aH||null,pinchDistance||0,ag||0,aE,ai)}break;case v:if(af.pinchOut){aL=af.pinchOut.call(H,aN,aH||null,pinchDistance||0,ag||0,aE,ai)}break}}}if(aM==e){if(aK===o){if(af.click&&(aE===1||!a)&&(isNaN(ac)||ac===0)){aL=af.click.call(H,aN,aN.target)}}}return aL}function ad(){if(af.threshold!==null){return ac>=af.threshold}return true}function ak(){if(af.pinchThreshold!==null){return pinchDistance>=af.pinchThreshold}return true}function ap(){var aK;if(af.maxTimeThreshold){if(ag>=af.maxTimeThreshold){aK=false}else{aK=true}}else{aK=true}return aK}function C(aK,aL){if(af.allowPageScroll===k||ao()){aK.preventDefault()}else{var aM=af.allowPageScroll===q;switch(aL){case n:if((af.swipeLeft&&aM)||(!aM&&af.allowPageScroll!=x)){aK.preventDefault()}break;case m:if((af.swipeRight&&aM)||(!aM&&af.allowPageScroll!=x)){aK.preventDefault()}break;case c:if((af.swipeUp&&aM)||(!aM&&af.allowPageScroll!=s)){aK.preventDefault()}break;case u:if((af.swipeDown&&aM)||(!aM&&af.allowPageScroll!=s)){aK.preventDefault()}break}}}function am(){return ak()}function ao(){return !!(af.pinchStatus||af.pinchIn||af.pinchOut)}function aw(){return !!(am()&&ao())}function ay(){var aK=ap();var aM=ad();var aL=aM&&aK;return aL}function ab(){return !!(af.swipe||af.swipeStatus||af.swipeLeft||af.swipeRight||af.swipeUp||af.swipeDown)}function E(){return !!(ay()&&ab())}function K(){return !!(af.click)}function av(){aA=B();aJ=event.touches.length+1}function z(){aA=0;aJ=0}function ae(){var aK=false;if(aA){var aL=B()-aA;if(aL<=af.fingerReleaseThreshold){aK=true}}return aK}function X(){return !!(H.data(w+"_intouch")===true)}function aj(aK){if(aK===true){H.bind(U,P);H.bind(au,aa);if(D){H.bind(D,W)}}else{H.unbind(U,P,false);H.unbind(au,aa,false);if(D){H.unbind(D,W,false)}}H.data(w+"_intouch",aK===true)}function aI(aL,aK){var aM=aK.identifier!==undefined?aK.identifier:0;ah[aL].identifier=aM;ah[aL].start.x=ah[aL].end.x=aK.pageX;ah[aL].start.y=ah[aL].end.y=aK.pageY;return ah[aL]}function V(aK){var aM=aK.identifier!==undefined?aK.identifier:0;var aL=J(aM);aL.end.x=aK.pageX;aL.end.y=aK.pageY;return aL}function J(aL){for(var aK=0;aK<ah.length;aK++){if(ah[aK].identifier==aL){return ah[aK]}}}function T(){var aK=[];for(var aL=0;aL<=5;aL++){aK.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0})}return aK}function L(){return Y-I}function Z(aN,aM){var aL=Math.abs(aN.x-aM.x);var aK=Math.abs(aN.y-aM.y);return Math.round(Math.sqrt(aL*aL+aK*aK))}function y(aK,aL){var aM=(aL/aK)*1;return aM.toFixed(2)}function an(){if(ai<1){return v}else{return b}}function G(aL,aK){return Math.round(Math.sqrt(Math.pow(aK.x-aL.x,2)+Math.pow(aK.y-aL.y,2)))}function F(aN,aL){var aK=aN.x-aL.x;var aP=aL.y-aN.y;var aM=Math.atan2(aP,aK);var aO=Math.round(aM*180/Math.PI);if(aO<0){aO=360-Math.abs(aO)}return aO}function aq(aL,aK){var aM=F(aL,aK);if((aM<=45)&&(aM>=0)){return n}else{if((aM<=360)&&(aM>=315)){return n}else{if((aM>=135)&&(aM<=225)){return m}else{if((aM>45)&&(aM<135)){return u}else{return c}}}}}function B(){var aK=new Date();return aK.getTime()}function at(aK){aK=d(aK);var aM=aK.offset();var aL={left:aM.left,right:aM.left+aK.outerWidth(),top:aM.top,bottom:aM.top+aK.outerHeight()};return aL}function az(aK,aL){return(aK.x>aL.left&&aK.x<aL.right&&aK.y>aL.top&&aK.y<aL.bottom)}}})(jQuery);

jQuery(function($){

/*==========================*/
/* Global Variables */
/*==========================*/

var   THE_BODY              = $('body'),
      HEADER                = $('#header'),
      FOOTER                = $('#footer'),
      IS_INDEX              = (THE_BODY.hasClass('template-index')) ? true : false,
      IS_COLLECTION         = (THE_BODY.hasClass('template-collection')) ? true : false,
      IS_COLLECTION_LISTING = ($('#collection-list').length > 0) ? true : false,
      IS_PRODUCT            = (THE_BODY.hasClass('template-product')) ? true : false,
      IS_BLOG               = (THE_BODY.hasClass('template-blog')) ? true : false,
      IS_ARTICLE            = (THE_BODY.hasClass('template-article')) ? true : false,
      IS_SEARCH             = (THE_BODY.hasClass('template-search')) ? true : false,
      IS_CART               = (THE_BODY.hasClass('template-cart')) ? true : false,
      HAS_LOGO              = (HEADER.hasClass('use-logo')) ? true : false,
      BE_WIDE               = (HEADER.hasClass('wide')) ? true : false,
      HAS_CURRENCIES        = (HEADER.hasClass('currencies')) ? true : false,
      IS_IE                 = /msie/i.test(navigator.userAgent),
      PRODUCT_IMAGE_W_TO_H_RATIO = product_image_w_to_h_ratio || 1,
      THREE_PER_ROW_W       = 268,
      FOUR_PER_ROW_W        = 191,
      THREE_PER_ROW_H       = parseInt(THREE_PER_ROW_W/PRODUCT_IMAGE_W_TO_H_RATIO,  10),
      FOUR_PER_ROW_H        = parseInt(FOUR_PER_ROW_W/PRODUCT_IMAGE_W_TO_H_RATIO,   10),
      IS_MOBILE             = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);

$('html').removeClass('no-js');

/* Global JS */
/*==========================*/

/* loadImages function */
/* elems are the images, and ch is the container height */
/* Sizes image appropriately to fill as much of the container as possible
   without cropping it, and making sure the image is vertically aligned */
var loadImages = function(elems, ch) {

    $(elems).each(function(){
        $(this).imagesLoaded( function() {
            var i_w = $(this).width();  // image width
            var i_h = $(this).height(); // image height
            var c_h = ch;               // container height
            var v_o = (c_h - i_h) / 2;  // vertical offset            
            if ( i_h > c_h ) {
                $(this).css('height',ch).css('width','auto');
            } else {
                $(this).css('margin-top',v_o);
            }   
            $(this).fadeTo(200,1); // reveals image with a 200 ms-lomg fade-in.
        });
    });
}

/* Custom Select Styling */
/*==========================*/
$('select').not('#product-select, .single-option-selector').addClass('special-select').customStyle();

/* Snippet JS */
/*==========================*/

/* Additional Products */
loadImages('.related-products-list img',FOUR_PER_ROW_H);

/* Layout JS */
/*==========================*/

/* Handle footer */
$('#footer-modules li:last-child').css('margin-right', 0)

/* Handle Cart Total */
var char_elem = $('#cart-price');
var char_count = char_elem.text().length;

if (char_count <= 5) { char_elem.css('opacity',1); }
if (char_count >= 6) { char_elem.css('font-size', '18px').css('opacity',1) }
if (char_count >= 7) { char_elem.css('font-size', '15px').css('opacity',1) }
if (char_count >= 8) { char_elem.css('font-size', '13px').css('opacity',1) }
if (char_count >= 9) { char_elem.css('font-size', '11px').css('opacity',1) }

/* Format Navigation */
/* Will the nav bar be on the right of the logo or site title,
   or will it be below and full width */
   
var logo_title = $('#logo,#title');
var nav_width = 0;
var max_nav_width = 592;
var site_width = 884;
var nav_elem = $('#nav');
var nav_item = $('#nav .nav-item');
var hidden_header_items = $('#nav, #title, #logo');

// Calculating the width of all the links.
nav_item.each(function(){
    nav_width += $(this).outerWidth();
});

// If we have enough links, then we will have the logo or title
// above the menu. End of story.
if ( BE_WIDE || (nav_width >= max_nav_width) ) {
    HEADER.addClass('wide');
    hidden_header_items.css('visibility','visible');
}
// If we need to know the width of the logo or site title.
else {
    // If we have a logo.
    if (HAS_LOGO) {
        // The logo image,
        var logo = $('#logo img');
        // Its width.
        var logo_width = logo.width();
        var logo_height = logo.height();
        // If the logo was cached, yay!
        if (logo_width > 0) {
            if ((nav_width + logo_width) >= site_width) {
                HEADER.addClass('wide');
            }
            else {
                $('#nav').css('marginTop', logo_height*0.45 +20);
            }
            hidden_header_items.css('visibility','visible');
        }
        // If not, we need to wait till it is loaded...
        else {
            // Waiting...
            logo.load(function() {
                var logo_width = $(this).width();
                var logo_height = $(this).height();
                if ((nav_width + logo_width) >= site_width) {
                    HEADER.addClass('wide');
                }
                else {
                    $('#nav').css('marginTop', logo_height*0.45 +20);
                }
                hidden_header_items.css('visibility','visible');
            });
        }
    }
    // If we have a site title.
    else {
        var title_width = logo_title.width();
        if ((nav_width + title_width) >= site_width) {
            HEADER.addClass('wide');
        }
        hidden_header_items.css('visibility','visible');    
    }
}

/* Index JS */
/*==========================*/

if (IS_INDEX) {

    if (slideshow) {
        /* Slideshow */

        var container_width = 884;
        var main_slider = $('#slides');
        var slide_count = $('.slide').length;
        var main_slider_width = slide_count * container_width;

        main_slider.css('width', main_slider_width);
        
        if (slide_count > 1) {
            for (i=1;i<=slide_count;i++) {
                $('<li>', {
                    id:'slide-control-' + i,
                    'class':'slide-control'
                    }).appendTo('#slideshow-controls').html('&#8226;');
            }
        } else {
            $('#slideshow-controls').remove();
        }


        if (slideshow_auto && slide_count > 1 ) {
            /* Auto Slide */
            function autoSlide() {
                var current_slide = $('.slide-control.active');
                var current_slide_index = current_slide.index();

                if (current_slide_index != (slide_count - 1)) {
                    var elem = current_slide.next();
                    var slider_distance = (elem.index() * container_width) * -1;
                    $('#slides').animate({
                        marginLeft: slider_distance
                    });
                    $('.slide-control').removeClass('active');
                    elem.addClass('active');
                } else {
                    var elem = $('.slide-control').eq(0);
                    var slider_distance = (elem.index() * container_width) * -1;
                    $('#slides').animate({
                        marginLeft: slider_distance
                    });
                    $('.slide-control').removeClass('active');
                    elem.addClass('active');
                }
            }

            function init_auto_slide() {
                startAutoSlide = setInterval(autoSlide,slideshow_speed);
            };
            init_auto_slide();

        }

        $('.slide-control').click(function(){

            if (slideshow_auto == true) {
                clearInterval(startAutoSlide);
            }

            var elem = $(this);
            var slider_distance = (elem.index() * container_width) * -1;
            $('#slides').animate({
                marginLeft: slider_distance
            });
            $('.slide-control').removeClass('active');
            elem.addClass('active');
        });

        $('#slide-control-1').addClass('active');

        /* Resize Video */
        var $allVideos = $("#slides iframe[src^='http://www.youtube.com'], #slides iframe[src^='http://player.vimeo.com']");
        var newHeight = 490;
        $allVideos.each(function(){
            var aspect_ratio = this.width / this.height;
            $(this)
            .removeAttr('height')
            .removeAttr('width')
            .height(newHeight)
            .width(newHeight * aspect_ratio);
        });
        
        /* Utility function */
        var slideshow_action = function(direction) {
            if (slideshow_auto == true) {
                clearInterval(startAutoSlide);
            }
            var current_slide = $('.slide-control.active');
            var current_slide_index = current_slide.index();
            var new_slide_index = 0;
            if (direction == 'next') {
                if (!((current_slide_index + 1) == slide_count)) {
                    new_slide_index  = current_slide_index + 1;
                }
            }
            else if (direction == 'prev') {
                new_slide_index = slide_count - 1;
                if (!(current_slide_index === 0)) {
                    new_slide_index = current_slide_index - 1;
                }
            }
            var slider_distance = (new_slide_index * container_width) * -1;
            $('#slides').animate({
                marginLeft: slider_distance
            });
            $('.slide-control').removeClass('active');
            $('.slide-control:eq(' + new_slide_index + ')').addClass('active');
        };
        
        if (IS_MOBILE) { 
        
            $('#slideshow-container').swipe({
                click: function(event, target) {
                    if ($(target).attr('href')) {
                        window.location.href = $(target).attr('href');
                    }
                },
                swipe: function(event, direction, distance, duration, fingerCount) {
                    if (direction == 'left')  {
                        slideshow_action('next');    
                    }
                    else if (direction == 'right') {
                        slideshow_action('prev');
                    }
                },
                threshold:50,
                excludedElements:[]
            });
        
        }
            
    } // END of if (slideshow)

    /* Product Slider */

    /*
    Pay careful attention to the difference between "mini_slider" 
    which is the entire slider, and "mini_slide" which denotes 
    an individual slide
    */

    var mini_slider = $('#mini-slides');
    var mini_slide_count = $('#mini-slides > li').length;
    var mini_slide_width = THREE_PER_ROW_W;
    var mini_slide_margin = 40;
    var mini_slide_total_width = mini_slide_width + mini_slide_margin;
    var mini_slider_distance = mini_slide_total_width * 3;
    var mini_slider_width = mini_slide_count * mini_slide_total_width;
    var current_position = 0;

    /* Set Slider Width */
    mini_slider.css('width', mini_slider_width);

    /* Preload and Format Images */
    loadImages('#mini-slides .three-per-row img',THREE_PER_ROW_H);
    loadImages('#mini-slides .four-per-row img',FOUR_PER_ROW_H);

    /* Next / Prev Function */

    var mini_slide_action = function(direction) {
        var animating = ($(mini_slider).filter(':animated').length) ? true : false;
        current_position = parseFloat(mini_slider.css('margin-left'));
        var more_to_load = ( (mini_slider_width - (current_position * -1)) > mini_slider_distance ) ? true : false;

        if (!animating && direction == 'next' && more_to_load) {
            mini_slider.animate({
                marginLeft: '-=' + mini_slider_distance
            },400, 'swing',function(){
                current_position = parseFloat(mini_slider.css('margin-left'));
                more_to_load = ( (mini_slider_width - (current_position * -1)) > mini_slider_distance ) ? true : false;

                $('#mini-slider-prev').fadeIn(200);
                if (more_to_load == false) {
                    $('#mini-slider-next').fadeOut(200);
                }
            });

        }
        if (!animating && direction == 'prev' && current_position != 0 ) {
            mini_slider.animate({
                marginLeft: '+=' + mini_slider_distance
            },400,'swing',function(){

                current_position = parseFloat(mini_slider.css('margin-left'));

                $('#mini-slider-next').fadeIn(200);
                if (current_position == 0) {
                    $('#mini-slider-prev').fadeOut(200);
                }
            });

        }
    }
    
    if ( mini_slide_count <= 3 ) {
        $('#mini-slider-next').hide();
    }
    
    /* Auto hide prev */
    $('#mini-slider-prev').hide();

    /* Next */
    $('#mini-slider-next').click(function(){
        mini_slide_action('next');
        return false;
    });

    /* Prev */
    $('#mini-slider-prev').click(function(){
        mini_slide_action('prev');
        return false;
    });
    
    if (IS_MOBILE) { 

        $('#product-slider').swipe({
            click: function(event, target) {
                if ($(target).attr('href')) {
                    window.location.href = $(target).attr('href');
                }
            },
            swipe: function(event, direction, distance, duration, fingerCount) {
                if (direction == 'left')  {
                    mini_slide_action('next');
                }
                else if (direction == 'right') {
                    mini_slide_action('prev');
                }
            },
            threshold:50,
            excludedElements:[]
        });
    
    }

    /* Front Page Product List */

    /* Preload and Format Images */
    loadImages('#fp-product-list .four-per-row img', FOUR_PER_ROW_H);
    loadImages('#fp-product-list .three-per-row img', THREE_PER_ROW_H);

    /* Set equal row heights */
    var golden_height = 0;
    $('#fp-product-list li').each(function(i){
        if ($(this).height() > golden_height) {
            golden_height = $(this).height();
        }
    });

    $('#fp-product-list li').css('height',golden_height);

} // END of IS_INDEX

 /* Collection JS */
/*==========================*/
if (IS_COLLECTION || IS_CART || IS_SEARCH) {

    /* Preload and Format Images */
    loadImages('#coll-product-list .four-per-row img',FOUR_PER_ROW_H);
    loadImages('#coll-product-list .three-per-row img',THREE_PER_ROW_H);

    var golden_height = 0;
    $('#coll-product-list li').each(function(i){
        if ($(this).height() > golden_height) {
            golden_height = $(this).height();
        }
    });

    $('#coll-product-list li').css('height',golden_height);

} // END of IS_COLLECTION

/* Collection Listing JS */
/*==========================*/
if (IS_COLLECTION_LISTING) {

    /* Preload and Format Images */
    loadImages('#collection-list .four-per-row img',FOUR_PER_ROW_H);
    loadImages('#collection-list .three-per-row img',THREE_PER_ROW_H);

    var golden_height = 0;
    $('#collection-list li').each(function(i){
        if ($(this).height() > golden_height) {
            golden_height = $(this).height();
        }
    });

    $('#collection-list li').css('height',golden_height);

} // END of IS_COLLECTION_LISTING



/* Product JS */
/*==========================*/
if (IS_PRODUCT) {

    // Activate "Add Medallion"
    $('#product-add-medallion').click(function(){
        $('#add').click();
    });

    // PRODUCT VIEWER

    // Format Thumbnails
    loadImages('.product-photo-thumb img',114);

    // Activate Colorbox
    $('a.gallery').colorbox( {
        rel:'gallery',
        maxWidth:"95%",
        maxHeight:"95%",
        scalePhotos:true} );

    var product_container = $('#product-photo-container');      

    // Initialize first photo
    product_container.find('img:first').imagesLoaded(function(){
        var elem = $(this);
        elem.addClass('active').fadeIn(100);
        product_container.css('height',elem.height());
        elem.parent().css( {'height':elem.height(), 'width':elem.width()} );
    });

    // Display new photo
    $('.product-photo-thumb').click(function(){

        var active_index = $(this).index();
        var photo_to_show = product_container.find('img').eq(active_index);
        var photo_to_hide = product_container.find('.active');

        photo_to_hide.fadeOut(100, function(){
            photo_to_hide.removeClass('active');
            photo_to_hide.parent().css( {'height':0, 'width':0} );
            var photo_to_show = product_container.find('img').eq(active_index);
            photo_to_show.imagesLoaded(function(){
                product_container.animate({height:photo_to_show.height()},200,function(){
                    photo_to_show.fadeIn(100, function(){
                        $(this).addClass('active');
                        $(this).parent().css( {'height':$(this).height(), 'width':$(this).width()} );
                    });
                });
            });
        });

    }); 

} // END of IS_PRODUCT

                    
/* Placeholder JS */
/*==========================*/

$('[placeholder]').each(function(){
    if ($(this).val() === '') {
        var hint = $(this).attr('placeholder');
        $(this).val(hint).addClass('hint');
    }
});

$('[placeholder]').focus(function() {
    if ($(this).val() === $(this).attr('placeholder')) {
        $(this).val('').removeClass('hint');
    }
}).blur(function() {
    if ($(this).val() === '') {
        $(this).val($(this).attr('placeholder')).addClass('hint');
    }
});                    

/* Form validation JS */
/*==========================*/

$('input.error, textarea.error').focus(function() {
    $(this).removeClass('error');
});

$('form :submit').click(function() {
    $(this).parents('form').find('input.hint, textarea.hint').each(function() {
        $(this).val('').removeClass('hint');
    });
    return true;
});

/* Cart.liquid */
/*==========================*/
                    
if (IS_CART) {
    
    /* This auto-saves cart attribute and cart note.
       This will save quantity edits too.
       See this: http://wiki.shopify.com/Ask_customer_for_additional_information#My_clients_fill_up_the_cart_attributes.2C_but_they_are_not_saved._When_they_leave_the_cart_page_and_come_back.2C_the_boxes_previously_filled-up_are_empty._How_can_I_fix_this.3F */
    $(window).unload(function() {
        var params = {
            type: 'POST',
            url: '/cart/update.js',
            data: $('form[action="/cart"]').serialize(),
            dataType: 'json',
            async: false
        };
        $.ajax(params);
    });

}

/* IE JS */
/*==========================*/
if (IS_IE) {
    $('#widgets li:last-child').css('border-bottom','none');
    $('#product-details li:last-child').css('border-bottom','none');
}

/* Multiple currencies */
/*==========================*/

if (HAS_CURRENCIES) {
    
    $('#currency-picker-toggle a').click(function() {
        $('#currency-picker-toggle').hide();
        $('#currencies-picker').fadeIn();
        return false;
    });

    $('#currencies-picker select').change(function() {
        $('#currencies-picker').hide();
        $('#currency-picker-toggle').fadeIn();
        return true;
    }).blur(function() {
        $('#currencies-picker').hide();
        $('#currency-picker-toggle').fadeIn();
        return true;
    });

}

/* Social sharing stats */
/*==========================*/

$('.share-stats').each(function(){
    var wrapper = $(this);
    var stats = '';
    var url = $(this).attr('data-url');
    $.when(
        $.getJSON("https://api.facebook.com/method/fql.query?query=select%20total_count,like_count,comment_count,share_count,click_count%20from%20link_stat%20where%20url='" + url + "'&format=json")
    ).then(function(dataFacebook) {
        var times = ' times ';
        var facebookCount = dataFacebook[0][0].total_count;
        if (facebookCount > 0) {
            stats += ' Shared ';
        }
        if (facebookCount > 0) {
            times = ( facebookCount == 1 ) ? ' time ' : ' times ';
            stats += facebookCount + times + 'on Facebook';
        }
        wrapper.html(stats);
    });  
});

/* Lightbox ALL THE THINGS (images) in RTE-generated content */

if ($.isFunction($.fn.colorbox)) {
  // For all images added with the RTE that aren't linking to a page.
  $('.rte img').not('a > img').each(function() {
    // Matching images that aren't already shown in their original size.
    var re = /(_small)|(_compact)|(_medium)|(_large)|(_grande)/;
    var src = $(this).attr('src');
    if (re.test(src)) {
      // Determining the URL to the original image.
      var href = src.replace(re, '');
      // Activating lightbox.
      $(this).wrap('<a></a>')
        .parent()
        .attr('href', href)
        .addClass('lightbox')
        .colorbox( {
            maxWidth:"95%",
            maxHeight:"95%",
            scalePhotos:true} );
    }
  });
  $('.lightbox').colorbox( {
            maxWidth:"95%",
            maxHeight:"95%",
            scalePhotos:true} );
  $('.inline').colorbox( {
            maxWidth:"95%",
            maxHeight:"95%",
            inline:true} );
}

/* Smooth scrolling */
$('a').smoothScroll();

/* Follow along table of content */
/* http://css-tricks.com/scrollfollow-sidebar */

var $sidebar   = $(".follow-along"), 
    $window    = $(window),
    offset     = $sidebar.offset(),
    topPadding = 15;
    
    if ($sidebar.length) {
        $window.scroll(function() {
            if ($window.scrollTop() > offset.top) {
                $sidebar.stop().animate({
                    marginTop: $window.scrollTop() - offset.top + topPadding
                });
            } else {
                $sidebar.stop().animate({
                    marginTop: 0
                });
            }
        });    
    }
    
/* The following code opens all external + PDF download links in a new browser tab */
/* Uncomment this section to turn on that feature in your store */
/*

$('a[href^="http"]')
  .not('a[href^="' + shop_url + '"]')
  .not('a[href*="' + Shopify.shop + '"]')
  .not('a[href^="http://static.shopify.com"]')
  .not('a[href^="http://cdn.shopify.com"]')
  .not('.lightbox')
  .attr('target', '_blank');

*/

});
