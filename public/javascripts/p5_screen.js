var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
let sketch = function(p) {
  let imgTest;
  p.setup = function(){
    p.createCanvas(window.screen.width, window.screen.height);
    p.background(255);
    p.fill(0);
  }
  p.draw = function(){

  }
  p.mouseClicked = function(){
    //imgTest=p.loadImage("resource/processing/"+ parseInt(Math.random() * 6 + 1) +".png");
    //p.image(imgTest, p.mouseX, p.mouseY, 100, 100);
  }
  p.keyPressed = function(){
    if(p.key == 'Escape')
      p.background(255);
  }
};

if (!isMobile)
  new p5(sketch, 'p5_screen');
