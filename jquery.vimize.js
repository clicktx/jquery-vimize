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
    var intActiveCol = setting.defaultSelectors;
    var arrActiveElement = {};
    var $objElements = {};
    var maxCols = 0;
    for (var i in setting.selectors){
      arrActiveElement[i] = -1;
      $objElements[i] = $(setting.selectors[i]);
      ++maxCols;
    }
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
    var fnActiveElement = function(n){ $($objElements[intActiveCol][n]).focus(); };

    // hjkl
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
            fnActiveElement(arrActiveElement[intActiveCol]=0);
            break;
          case 76: // L
            fnActiveElement(arrActiveElement[intActiveCol]=($objElements[intActiveCol].length -1));
            break;
          case 52: // $ (shift+4)
            fnActiveElement(arrActiveElement[intActiveCol]=($objElements[intActiveCol].length -1));
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
            if (($objElements[intActiveCol].length -1) > arrActiveElement[intActiveCol]){
              fnActiveElement(++arrActiveElement[intActiveCol]);
            }
            break;
          case 75: // k
            if (arrActiveElement[intActiveCol] > 0){
              fnActiveElement(--arrActiveElement[intActiveCol]);
            }
            break;
          case 72: // h
            if (intActiveCol > 0){--intActiveCol;}
            if (arrActiveElement[intActiveCol] < 0){ arrActiveElement[intActiveCol] = 0; }
            fnActiveElement(arrActiveElement[intActiveCol]);
            break;
          case 76: // l
            if (intActiveCol < maxCols -1){++intActiveCol;}
            if (arrActiveElement[intActiveCol] < 0){ arrActiveElement[intActiveCol] = 0; }
            fnActiveElement(arrActiveElement[intActiveCol]);
            break;
          case 66: // b pagerに対応する？
            history.back();
            break;
          case 78: // n << f にするべき？
            history.forward();
            break;
          case 48: // 0
          case 96: // 0(テンキー)
          case 222: // ^
            fnActiveElement(arrActiveElement[intActiveCol]=0);
            break;
          default:
            break;
        }
      }
      keyPressBuffer = e.keyCode;
    });



  }; //
})(jQuery);
