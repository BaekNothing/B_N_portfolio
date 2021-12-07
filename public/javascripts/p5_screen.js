var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
let sketch = function(p) {
  let imgTest;
  let objects = new Array();
  let counter = 0;
  p.setup = function(){
    p.createCanvas(window.screen.width, window.screen.height);
    p.background(255);
    p.fill(0);
  }
  p.draw = function(){
    p.background(255);
    for (var i = 0; i < counter; i++)
    {
      p.image(objects[i].img ,objects[i].xpos, objects[i].ypos, objects[i].img.width, objects[i].img.height);
      objects[i].move();
    }
  }
  p.mouseClicked = function(){
    let imgTest=p.loadImage("resource/processing/"+ parseInt(Math.random() * 6 + 1) +".png");
    //p.image(imgTest, p.mouseX, p.mouseY, 100, 100);
    objects[counter] = new p_Object(imgTest, p.mouseX, p.mouseY, parseInt(Math.random() * 6) -3, 2);
    counter++;
  }
  p.keyPressed = function(){
    if(p.key == 'Escape')
      p.background(255);
      for (let i = objects.length; i > 0; i--)
        objects.pop();
      counter = 0;
      console.log("clear");
  }
};

class p_Object{
  constructor(img, xpos, ypos, xVector, yVector)
  {
    this.img = img;
    this.xpos = xpos;
    this.ypos = ypos;
    this.xVector = xVector;
    this.yVector = yVector;
  }

  move(){
    if(this.ypos < window.innerHeight){
      this.xpos += this.xVector;
      this.ypos += this.yVector;
    }
  }
}

if (!isMobile)
  new p5(sketch, 'p5_screen');
