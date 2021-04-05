window.onload = function(){
  $(document).ready(function(){
    $('.loading').hide();
    $('.popup_exit').on('click', function(){
      //$('.center_popup').hide();
    });
  });

  var el = document.getElementById("ajaxbutton");
  if(el){
    el.addEventListener('click', function(event){
      var name = event.target.className;
      ajax('name', name);
      });
  }

  ajax = function(url, data){
    var data = {'name' : data};
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
