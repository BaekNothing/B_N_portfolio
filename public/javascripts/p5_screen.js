var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
let sketch = function(p) {
  let imgTest;
  let objects = new Array();
  let counter = 0;

  p.setup = function(){
    p.createCanvas(window.screen.width, window.screen.height);
    p.background(255);
    p.fill(0);
    p.imageMode(p.CENTER);
  }
  p.draw = function(){
    p.background(255);
    for (var i = 0; i < counter; i++)
    {
      p.push()
      p.translate(objects[i].xpos, objects[i].ypos);
      p.rotate(p.radians(objects[i].degree));
      p.image(objects[i].img, 0, 0, objects[i].img.width, objects[i].img.height);
      objects[i].move();
      p.pop()
    }
  }

  let touchblock = 'invisible';

  p.mousePressed = function(){
    if($('.touchblock').is(':visible'))
      touchblock = 'visible';
    else
      touchblock = 'invisible';
  }

  p.mouseClicked = function(){
    if(p.mouseY > 60 && touchblock === 'invisible' && !$('.touchblock').is(':visible')){
      let imgTest=p.loadImage("resource/processing/"+ parseInt(Math.random() * 6 + 1) +".png");
      objects[counter] = new p_Object(imgTest, p.mouseX, p.mouseY, parseInt(Math.random() * 14) -7, -15);
      counter++;
    }
  }

  p.keyPressed = function(){
    if(p.key === 'Escape')
    {
      p.background(255);
      for (let i = objects.length; i > 0; i--)
        objects.pop();
      counter = 0;
    }
  }
};

class p_Object{
  constructor(img, xpos, ypos, xVector, yForce)
  {
    this.img = img;
    this.xpos = xpos;
    this.ypos = ypos;
    this.xVector = xVector;
    this.yForce = yForce;
    this.gravity = 1;
    this.degree = 0;
    this.rotationForce = parseInt(Math.random() * 10) + 10;
  }

  move(){
    if(this.ypos < window.innerHeight - 100){
      this.xpos += this.xVector;
      this.ypos += this.yForce;
      this.yForce += this.gravity;
      this.degree += this.rotationForce;
    }
    else {
      this.ypos = window.innerHeight - 100;
    }
  }
}

if (!isMobile)
  new p5(sketch, 'p5_screen');
