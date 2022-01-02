window.onload = function(){
  $(document).ready(function(){
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
    $('.loading').hide();
    $('.detail_background').css({'width' : (window.innerWidth - 540) + 'px'});

    if (isMobile)
    {
      $('.see_more').hide();
      $('.contents').hide();
    }
  });

  let openflag = 0;

  $(window).resize(function(){
    if (openflag === 1)
    {
      $('.contents').css({'width' : (window.innerWidth - 600) + 'px', 'opacity' : '1', 'transition-duration': '0s'});
      $('.content').css({'width' : getcontentWidth() + 'px'});
    }
    $('.detail_background').css({'width' : (window.innerWidth - 540) + 'px'});
  });

  var contentWidth = window.innerWidth - 600;

  $('.see_more').on('click', function(){
    if (openflag === 0){
      shuffle();
      $('.see_more').css({'transform': 'rotate(0.499turn)'});
      $('.bottom').css({'width' : '480px'});
      $('.contents').css({'width' : (window.innerWidth - 600) + 'px', 'opacity' : '1', 'transition-delay': '0s', 'transition-duration': '0s'});
      $('.content').css({'opacity' : '1',
                          'transition-duration': '0.4s',
                          'transition-delay': '0.8s',
                          'pointer-events' : 'auto',
                          'width' : ($('.contents').css('width').slice(0,-2) / 9 * 4) + 'px',
                          'width' : getcontentWidth() + 'px'
                         });
      openflag = 1;
    } else {
      $('.see_more').css({'transform': 'rotate(0turn)'});
      $('.bottom').css({ 'width' : window.innerWidth + 'px'});
      $('.contents').css({'width' : '0px', 'opacity' : '0', 'transition-delay': '0.2s', 'transition-duration': '0.3s'});
      $('.content').css({'transition-delay': '0s',
                         'transition-duration': '0.1s',
                         'pointer-events' : 'none',
                         'opacity' : '0'});
      openflag = 0;
    }
  });

  function getcontentWidth(){
    if(window.innerWidth >= 1200)
      return((window.innerWidth - 600) / 9 * 4);
    else if(window.innerWidth > 800)
      return((window.innerWidth - 600) / 9 * 8);
    else
      return(0);
  }

  function shuffle(){
    $('.contents').each(function() {
      var ul = $(this);

      var liArr = ul.children('.content');

      liArr.sort(function() {
        var temp = parseInt(Math.random()*liArr.length);
        var temp1 = parseInt(Math.random()*liArr.length);
        return temp1-temp; }).appendTo(ul);
    });
  }
}
