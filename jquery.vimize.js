// firefox(mac) 非対応 keypressで0が返る

(function($){
  $.fn.vimize = function(options){
    var defaults = {
      escKey: 'true',
      searchBoxSelector: '',
      homePagePath: '/',
      scrollVal: $(window).height() *0.3,
      selectors: {0: 'a'},
      defaultSelectors: 0
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
    // var $objElements = $(".posttitle a, .navigationpost a");
    var $objElements = $(setting.selectors[0]);

    console.log($objElements);
    // var $objElements = $("#product-list-wrap div a, #detailarea a, #detailarea select");
    // if ($objElements.length == 0){
    //     $objElements = $("#category_area a:visible");
    // }
    var activeElementNo = -1;
    var fnActiveElement = function(n){ console.log('acticve'+n);$($objElements[n]).focus(); };

    $(window).keydown(function(e){
      if (e.keyCode == 27) { $(':focus').blur(); keyPressBuffer =''; } // esc key
      var $focused = $("input:focus");

      // ctrl key
      if (e.ctrlKey){
        switch (e.keyCode){
          case 68: // ctrl+d
            fnScrollDown();
            break;
          case 85: // ctrl+u
            fnScrollUp();
            break;
          case 87: // ctrl+w
            if ($focused.length) { $focused.val(''); }
            break;
          default:
            break;
        }
      }
      if ($focused.length) return;

      // shift key
      if (e.shiftKey){
        switch (e.keyCode){
          case 191: // ? (shift+/)
            $(setting.searchBoxSelector).focus();
            return false;
            // break;
          case 71: // G
            fnPageBottom();
            break;
          case 72: // H
            fnActiveElement(activeElementNo=0);
            break;
          case 76: // L
            fnActiveElement(activeElementNo=($objElements.length -1));
            break;
          case 52: // $ (shift+4)
            fnActiveElement(activeElementNo=($objElements.length -1));
            break;
          default:
            break;
        }
      } else {
        switch (e.keyCode){
          case 189: // -
            window.location.href = setting.homePagePath;
            break;
          case 68: // d
            scrollBy(0,setting.scrollVal);
            break;
          case 85: // u
            scrollBy(0,'-'+setting.scrollVal);
            break;
          case 191: // '/'
            $(setting.searchBoxSelector).focus();
            return false;
            // break;
          case 71: // g
            if (keyPressBuffer == 71){ keyPressBuffer =''; fnPageTop(); return false; }
            break;
          case 74: // j
            if (($objElements.length -1) > activeElementNo){ fnActiveElement(++activeElementNo); }
              console.log(activeElementNo);
            break;
          case 75: // k
            if (activeElementNo > 0){ fnActiveElement(--activeElementNo); }
              console.log(activeElementNo);
            break;
          // case 72: // h
          //   history.back();
          //   break;
          // case 76: // l
          //   history.forward();
          //   break;
          case 66: // b pagerに対応する？
            history.back();
            break;
          case 78: // n << f にするべき？
            history.forward();
            break;
          case 48: // 0
          case 96: // 0(テンキー)
          case 222: // ^
            fnActiveElement(activeElementNo=0);
            break;
          default:
            break;
        }
      }
      keyPressBuffer = e.keyCode;
    });



  }; //
})(jQuery);
