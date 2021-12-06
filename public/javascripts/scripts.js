window.onload = function(){
  $(document).ready(function(){
    $('.loading').hide();
    $('.folder_popup').hide();
    $('.center_popup').hide();
    $('.touchblock').hide();
    $('.zoom_img').hide();

    /*key input*/
    $(document).keydown(function(e){
      if(e.which == 27){
        if($('.zoom_img').is(':visible')){
          $('.zoom_img').hide(100);
        }
        else if($('.center_popup').is(':visible')){
          $('.center_popup').hide(100);
        }
        else if($('.folder_popup').is(':visible')){
          $('.folder_popup').hide(100);
          $('.touchblock').hide();
        }
        else if($('.center_animation').is(':visible')){
          $('.center_animation').hide(100);
          $('.animation').css({'background-image': 'url("../resource/imgs/animation.png")'});
          window.clearInterval(anime);
        }
      }
    });

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
    $('.animation_random').on('click', function(){
        window.clearInterval(anime);
        loadanime();
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

    /* Zoom img */
    $('.zoom_exit').on('click', function(){
      $('.zoom_img').hide(100);
    });
    $('.zoom_prev').on('click', function(){
      var path = $(this).parent().children('.zoom_contents').css('background-image');
      var counter = parseInt(path.substring(path.search('img/img') + 7, (path.search('jpg') || path.search('png')) - 1)) - 1;
      var newpath = path.substring(0, path.search('img/img') + 7) +
        counter +
        path.substring((path.search('jpg') || path.search('png')) - 1, path.length);
      $('.zoom_next').parent().children('.zoom_contents').css({'background-image' : newpath});
      $('.zoom_title').text($('.contents_title').text() + '_img' + counter);
      zoomPageButtonOnOff(counter);
    });
    $('.zoom_next').on('click', function(){
      var path = $(this).parent().children('.zoom_contents').css('background-image');
      var counter = parseInt(path.substring(path.search('img/img') + 7, (path.search('jpg') || path.search('png')) - 1)) + 1;
      var newpath = path.substring(0, path.search('img/img') + 7) +
        counter +
        path.substring((path.search('jpg') || path.search('png')) - 1, path.length);
      $('.zoom_next').parent().children('.zoom_contents').css({'background-image' : newpath});
      $('.zoom_title').text($('.contents_title').text() + '_img' + counter);
      zoomPageButtonOnOff(counter);
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

  zoomPageButtonOnOff = function(counter)
  {
    if(counter <= 0)
      $('.zoom_prev').hide();
    else
      $('.zoom_prev').show();
    var img_last = $('.popup_contents').children('.contents_img').last().attr('src');
    var img_length = img_last.substring(img_last.search('img/img')+7, (img_last.search('jpg') || img_last.search('png'))-1);
    if(counter >= parseInt(img_length))
      $('.zoom_next').hide();
    else
      $('.zoom_next').show();
  }
}
