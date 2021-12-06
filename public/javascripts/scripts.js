window.onload = function(){
  $(document).ready(function(){
    $('.loading').hide();
    $('.folder_popup').hide();
    $('.center_popup').hide();
    $('.touchblock').hide();

    loadanime();
    /* Dance */
    var plaied = 0;
    $('.music').on('click', function(){
      console.log($('.bgm').paused);
      if (plaied == 1) {
          $('.bgm').trigger("pause");
          $('.music').css({"background-image": 'url("../resource/imgs/music_play.png")'});
          $('.dance').css({"background-image": "url('../resource/imgs/dance_play.png')"});
          $('.icon').css({"animation-iteration-count": "0"});
          plaied = 0;
      } else {
          $('.bgm').trigger("play");
          $('.music').css({"background-image": 'url("../resource/imgs/music_pause.png")'});
          $('.icon').each(function(){
            var random = Math.floor(Math.random() * 4)
            $(this).css({'animation-name': 'dance'+ random});
          });
          $('.icon').css({"animation-play-state": "running", "animation-iteration-count": "infinite"});
          $('.dance').css({"background-image": "url('../resource/imgs/dance_pause.png')"})
          plaied = 1;
      }
    });
    $('.dance').on('click', function(){
      console.log( $('.icon').css("animation-iteration-count"));
      if( $('.icon').css("animation-iteration-count") == "infinite")
      {
        $('.dance').css({"background-image": "url('../resource/imgs/dance_play.png')"});
        $('.icon').css({"animation-iteration-count": "0"});
      }
      else
      {
        $('.icon').each(function(){
          var random = Math.floor(Math.random() * 4)
          $(this).css({'animation-name': 'dance'+ random});
        });
        $('.icon').css({"animation-play-state": "running", "animation-iteration-count": "infinite"});
        $('.dance').css({"background-image": "url('../resource/imgs/dance_pause.png')"})
      }
    });
    /* Anime */
    $('.animation, .animation_exit').on('click', function(){
      if($('.center_animation').is(':visible')){
          $('.center_animation').hide(100);
          $('.animation').css({'background-image': 'url("../resource/imgs/animation.png")'});
          window.clearInterval(anime);
      }
      else{
        $('.center_animation').show(100);
        loadanime();
        $('.animation').css({'background-image': 'url("../resource/imgs/animation_after.png")'});
      }
    });
    /* Popup */
    $('.popup_exit').on('click', function(){
      $('.center_popup').hide(100);
      if(!$('.folder_popup').is(':visible')){
        $('.touchblock').hide();
      }
      ajaxcontent('name', 'welcome', 'welcome');
    });

    $('.folder_exit').on('click', function(){
      $('.folder_popup').hide(100);
      $('.touchblock').hide();
    });

    $('.folder').on('click', function(){
      $('.folder_popup').show(100);
      $('.touchblock').show();

      var name = event.target.id;
      console.log(name);
      $('#folder_unity').hide();
      $('#folder_design').hide();
      $('#folder_web').hide();
      $('#folder_'+name).show();
    });

    $('.folder_content').on('click', function(){
      $('.center_popup').show(100);
      $('.touchblock').show();
      var name = event.target.id;
      if($('#folder_unity').is(':visible')){ ajaxcontent('name', name, 'unity'); }
      else if($('#folder_design').is(':visible')){ ajaxcontent('name', name, 'design'); }
      else if($('#folder_web').is(':visible')){ ajaxcontent('name', name, 'web'); }
      else{ ajaxcontent('name', name, 'welcome'); }
    });
    $('.contents_img').on('click', function(){
      console.log("imgclicked");
    });
  });

  ajaxcontent = function(url, data, category){
    var data = {'name' : data, 'category' : category};
    data = JSON.stringify(data);
    console.log(data);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', "application/json");
    xhr.send(data);
    xhr.addEventListener('load', function(result){
      $(".popup_contents").html(xhr.responseText);
    });
  };

  loadanime = function(){
    $('.animation').css({'background-image': 'url("../resource/imgs/animation_after.png")'});
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/animation');
    xhr.setRequestHeader('Content-type', "application/json");
    xhr.send('');
    xhr.addEventListener('load', function(result){
      $(".animation_contents").html(xhr.responseText);
    });
  };
}
