var Vimize = {
  VERSION: '0.0.2'
};

(function($){
  $.fn.vimize = function(options){
    // initialize
    var defaults = {
      escKey: 'true',
      searchBoxSelector: '',
      homePagePath: '/',
      scrollVal: $(window).height() *0.3,
      selectors: {0: 'a'},
      defaultSelectors: 0,
      command: {
        NEKO: function(){window.location.href = 'https://www.google.co.jp/search?tbm=isch&q=%E7%8C%AB';},
        NYAN: function(){window.location.href = 'https://www.google.co.jp/search?tbm=isch&q=%E3%81%AB%E3%82%83%E3%82%93';},
        CAT: function(){window.location.href = 'https://www.google.co.jp/search?tbm=isch&q=cat';}
      }
    };
    var setting = $.extend(defaults,options);
    var mode = '';
    var command = '';
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
    var fnDoCmmand = function(cmd){
      try {
        setting.command[cmd]();
      } catch(e){
        var err = cmd+': command not found';
        if (typeof setting.commandError === 'function'){ setting.commandError(err); }
        else { console.log(err); }
      }
    };
    var fnEscKey = function(keyCode){
      $(':focus').blur();
      keyPressBuffer = '';
      mode = '';
      command = '';
    };
    var fnCtrlKey = function(keyCode,$focused){
      switch (keyCode){
        case 68: // ctrl+d
          fnScrollDown();
          break;
        case 85: // ctrl+u
          fnScrollUp();
          break;
        case 87: // ctrl+w
          if ($focused.length) { $focused.val(''); }
          break;
      }
      keyPressBuffer = '';
    };
    var fnShfitKey = function(keyCode){
      switch (keyCode){
                  // command mode
        case 59:  // : *firefox & Opera
        case 186: // : *safari & IE
          mode = 'cmd';
          break;
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
        case 191: // ? (shift+/)
          $(setting.searchBoxSelector).focus();
          break;
      }
    };
    var fnCommand = function(keyCode){
      if (keyCode == 13) { //enter
        fnDoCmmand(command);
        mode = '';
        command = '';
      } else {
        command += String.fromCharCode(keyCode);
      }
    };
    var fnGCommand = function(keyCode){
      if(keyPressBuffer != 71){ keyPressBuffer = 71; return; }
      switch(keyCode){
        case 71: // gg
          fnPageTop();
          break;
        // case 78: // gn
        //   window.location.href = $(setting.nextPage).attr('href');
        //   break;
        // case 80: // gp
        // window.location.href = $(setting.prevPage).attr('href');
        //   break;
      }
      keyPressBuffer = '';
    };
    var fnAnyKey = function(keyCode){
      switch (keyCode){
        case 189: // -
          window.location.href = setting.homePagePath;
          break;
        case 68: // d
          scrollBy(0,setting.scrollVal);
          break;
        case 85: // u
          scrollBy(0,'-'+setting.scrollVal);
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
        case 191: // '/'
          $(setting.searchBoxSelector).focus();
          return false;
      }
      keyPressBuffer = keyCode;
    };

    // keydown action
    $(window).keydown(function(e){
      var $focused = $("input:focus");
      console.log(e.keyCode);
      console.log(keyPressBuffer);

      if (e.keyCode == 27) {        // esc key
        fnEscKey(e.keyCode);
      } else if (e.ctrlKey){        // ctrl key
        fnCtrlKey(e.keyCode,$focused);
      }
      if ($focused.length) return;

      if (e.shiftKey){              // shift key
        fnShfitKey(e.keyCode);
        return false;
      } else if (mode == 'cmd'){    // command mode
          fnCommand(e.keyCode);
          return false;
      } else if(e.keyCode == 71){   // g commands
          fnGCommand(e.keyCode);
          return false;
      } else {                      // any key
        ret = fnAnyKey(e.keyCode);
        console.log(ret);
        return ret; // ⌘+` 等が使えなくなる
      }
    });

  }; //
})(jQuery);
