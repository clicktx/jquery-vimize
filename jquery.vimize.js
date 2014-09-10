// firefox(mac) 非対応 keypressで0が返る

(function($){
  $.fn.vimize = function(options){
    var defaults = {
      escKey: 'true',
      searchBoxSelector: '',
      homePagePath: '/',
      scrollVal: $(window).height() *0.8
    };
    var setting = $.extend(defaults,options);
    var keyPressBuffer = '';
    console.log(setting);


    // functions
    var fnPageTop = function(){
      $((navigator.userAgent.indexOf("Opera") != -1) ? document.compatMode == 'BackCompat' ? 'body' : 'html' :'html,body').animate({scrollTop:0}, 'slow');
      return false;
    };
    var fnPageBottom = function(){
      $((navigator.userAgent.indexOf("Opera") != -1) ? document.compatMode == 'BackCompat' ? 'body' : 'html' :'html,body').animate({scrollTop: $(document).height()-$(window).height()}, 'slow');
      return false;
    };
    var fnScrollDown = function(){
      $((navigator.userAgent.indexOf("Opera") != -1) ? document.compatMode == 'BackCompat' ? 'body' : 'html' :'html,body').animate({scrollTop: '+='+setting.scrollVal}, 'fast');
      return false;
    };
    var fnScrollUp = function(){
      $((navigator.userAgent.indexOf("Opera") != -1) ? document.compatMode == 'BackCompat' ? 'body' : 'html' :'html,body').animate({scrollTop: '-='+setting.scrollVal}, 'fast');
      return false;
    };
    // jkhl
    // j,k対象
    var elementsArray = $("a");
    console.log(elementsArray.length);
    // var elementsArray = $("#product-list-wrap div a, #detailarea a, #detailarea select");
    // if (elementsArray.length == 0){
    //     elementsArray = $("#category_area a:visible");
    // }
    var activeElementNo = -1;
    var activeFunction = function(n){ $(elementsArray[n]).focus(); };
    $(window).keydown(function(e){
      // ctrl
      if (e.ctrlKey){
        switch (e.keyCode){
          case 68: // ctrl+d
            fnScrollDown();
            break;
          case 85: // ctrl+u
            fnScrollUp();
            break;
        }
      } else if (e.shiftKey){
        // code
      } else {
        // if (e.keyCode == 27) { $(':focus').blur(); keyPressBuffer =''; } // esc key
        // if ( $("input:focus").length ){ return; }
        switch (e.keyCode){
          case 27: // esc
            $(':focus').blur();
            keyPressBuffer ='';
            break;
          default:
            break;
        }
      }
    });
    $(window).keypress(function(e){
      if ( $("input:focus").length ){ return; }
      switch (e.keyCode){
        case 100: // d
          scrollBy(0,setting.scrollVal);
          break;
        case 117: // u
          scrollBy(0,'-'+setting.scrollVal);
          break;

        case 106: // j
          if ((elementsArray.length -1) > activeElementNo){ activeFunction(++activeElementNo); }
            console.log(activeElementNo);
          break;
        case 107: // k
          if (activeElementNo > 0){ activeFunction(--activeElementNo); }
            console.log(activeElementNo);
          break;
        case 104: // h
          history.back();
          break;
        case 108: // l
          history.forward();
          break;
        case 72: // H
        case 48: // 0
        case 94: // ^
          activeFunction(activeElementNo=0);
          break;
        case 76: // L
        case 36: // $
          activeFunction(activeElementNo=(elementsArray.length -1));
          break;
        case 47: // '/'
        case 63: // ?
          $(setting.searchBoxSelector).focus();
          return false;
          // break;
        case 103: // g
          if (keyPressBuffer == 'g'){
            keyPressBuffer =''; fnPageTop();
          } else{
            keyPressBuffer = 'g';
          }
          break;
        case 71: // G
          fnPageBottom();
          break;
        case 45: // -
          window.location.href = setting.homePagePath;
          break;
        default:
          break;
      }
      if (e.keyCode != 103 ){keyPressBuffer ='';}
    });




  }; //
})(jQuery);


// 100: // d
// 117: // u
// 74: // J(Shift+j)
// 75: // K(Shift+k)
// 32: // Space key
// 17: // Ctrl key??



