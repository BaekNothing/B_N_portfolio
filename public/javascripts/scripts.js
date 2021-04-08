window.onload = function(){
  $(document).ready(function(){
    $('.loading').hide();
    $('.folder_popup').hide();
    $('.center_popup').hide();
    $('.touchblock').hide();

    var plaied = 0;
    $('.music').on('click', function(){
      console.log($('.bgm').paused);
      if (plaied == 1) {
          $('.bgm').trigger("pause");
          $('.music').css({"background-image": 'url("../resource/imgs/music_play.png")'});
          $('.dance').css({"background-image": "url('../resource/imgs/dance_play.png')"});
          $('.icon').css({"animation-iteration-count": "1"});
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
        $('.icon').css({"animation-iteration-count": "1"});
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

    $('.popup_exit').on('click', function(){
      $('.center_popup').hide(100);
      $('.file').css({'background-image': 'url("../resource/imgs/top_files.png")', 'background-color':'white'});
      if($('.folder_popup').is(':visible')){
        $('.edit').css({'background-image': 'url("../resource/imgs/top_folders_after.png")', 'background-color':'#FF4D4D'});
      }
      else{ $('.touchblock').hide(); }
      ajaxcontent('name', 'welcome', 'welcome');
    });
    $('.folder_exit').on('click', function(){
      $('.folder_popup').hide(100);
      $('.touchblock').hide();
      $('.edit').css({'background-image': 'url("../resource/imgs/top_folders.png")', 'background-color':'white'});
    });

    $('.folder').on('click', function(){
      $('.folder_popup').show(100);
      $('.touchblock').show();
      $('.edit').css({'background-image': 'url("../resource/imgs/top_folders_after.png")', 'background-color':'#FF4D4D'});
      var name = event.target.id;
      console.log(name);
      $('#folder_unity').hide();
      $('#folder_design').hide();
      $('#folder_web').hide();
      $('#folder_'+name).show();
    });

    $('.edit').on('click', function(){
      $('.folder_popup').show(100);
      $('.touchblock').show();
      $('.edit').css({'background-image': 'url("../resource/imgs/top_folders_after.png")', 'background-color':'#FF4D4D'});
      $('#folder_unity').hide();
      $('#folder_design').hide();
      $('#folder_web').hide();
      var random = Math.floor(Math.random() * 3);
      console.log(random);
      if(random == 0) {$('#folder_unity').show(); }
      else if(random == 1) {$('#folder_design').show(); }
      else if(random == 2) {$('#folder_web').show(); }
    });

    $('.folder_content').on('click', function(){
      $('.center_popup').show(100);
      $('.touchblock').show();
      $('.file').css({'background-image': 'url("../resource/imgs/top_files_after.png")', 'background-color':'#FF4D4D'});
      $('.edit').css({'background-image': 'url("../resource/imgs/top_folders.png")', 'background-color':'white'});
      var name = event.target.id;
      if($('#folder_unity').is(':visible')){ ajaxcontent('name', name, 'unity'); }
      else if($('#folder_design').is(':visible')){ ajaxcontent('name', name, 'design'); }
      else if($('#folder_web').is(':visible')){ ajaxcontent('name', name, 'web'); }
      else{ ajaxcontent('name', name, 'welcome'); }
    });

    $('.file').on('click', function(){
      $('.center_popup').show(100);
      $('.touchblock').show();
      $('.file').css({'background-image': 'url("../resource/imgs/top_files_after.png")','background-color':'#FF4D4D'});
      $('.edit').css({'background-image': 'url("../resource/imgs/top_folders.png")','background-color':'white'});
      var name = 'welcome';
      console.log(name);
      ajaxcontent('name', name,'welcome');
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
  }

}
