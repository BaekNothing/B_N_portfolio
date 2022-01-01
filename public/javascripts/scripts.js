window.onload = function(){
  $(document).ready(function(){
    $('.loading').hide();
  });

  let openflag = 0;

  $('.see_more').on('click', function(){
    if (openflag === 0){
      shuffle();
      $('.see_more').css({'transform': 'rotate(0.499turn)'});
      $('.bottom').css({'width' : '520px'});
      $('.contents').css({'width' : (window.innerWidth - 692) + 'px', 'opacity' : '1', 'transition-duration': '0s'});
      $('.content').css({'opacity' : '1',
                          'transition-duration': '0.4s',
                          'transition-delay': '0.4s',
                          'pointer-events' : 'auto',
                          'width' : ($('.contents').css('width').slice(0,-2) / 7 * 3) + 'px'
                         });
      openflag = 1;
    }
    else {
      $('.see_more').css({'transform': 'rotate(-0turn)'});
      $('.bottom').css({ 'width' : window.innerWidth + 'px'});
      $('.contents').css({'width' : '0px', 'opacity' : '0', 'transition-duration': '0.3s'});
      $('.content').css({'transition-delay': '0s',
                         'transition-duration': '0.1s',
                         'pointer-events' : 'none',
                         'opacity' : '0'});
      openflag = 0;
    }
  });

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
