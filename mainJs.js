var gl;
var theta;
var thetaLoc;
var bufferId;
var vertices;
var points;
var letter;
var dots;
var isDirClockWise = false;
var Xloc;
var x;
var Yloc;
var y;
var ColorLoc;
var scaleLoc;
var scalex=1;
var scaley=1;

function RotatingNotClockWise()
{
    theta += 0.1;
}
function RotatingClockWise()
{
    theta -= 0.1;
}
function TranslatexLeft()
{
    x -=0.1;
}
function TranslatexRight()
{
    x +=0.1;
}
function TranslateYDown()
{
    y -= 0.1;
}
function TranslateYUp()
{
    y += 0.1;
}

window.onload = function init() { //function init triggered when onload called 

    const canvas = document.querySelector("#glcanvas");
        // Initialize the GL context
    gl = WebGLUtils.setupWebGL(canvas);
        // Only continue if WebGL is available and working
    if (!gl) 
    {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }
    
    var program = initShaders(gl,"vertex-shader","fragment-shader");
    gl.useProgram(program);

    //accessing the web page button and defining the callback function // buttona basınca yön değiştirme yapıldı
    document.getElementById("RightRotation").onclick = RotatingClockWise;//this line executed when button is clicked
    document.getElementById("LeftRotation").onclick = RotatingNotClockWise;
    document.getElementById("Xtranslate").onclick = TranslatexLeft;
    document.getElementById("XtranslateRight").onclick = TranslatexRight;
    document.getElementById("YtranslateUp").onclick =TranslateYUp;
    document.getElementById("YtranslateDown").onclick = TranslateYDown;
    document.getElementById("larger").onclick = function(){
        scalex /=0.5;
        scaley /=0.5;
    };
    document.getElementById("smaller").onclick = function(){
        scalex *=0.5;
        scaley *=0.5;
    };
    // color slider
    document.getElementById("Red").onchange = function(){
        Red = this.value;
    };
    document.getElementById("Green").onchange = function(){
        Green = this.value;
    };
    document.getElementById("Blue").onchange = function(){
        Blue = this.value;
    };
    
    vertices = [ vec2(.3, .3), 
                     vec2(.1, .3),
                     vec2(.1,-.3),
                     vec2(.3,-.3)];

     points = [ vec2(.3,.4),vec2(.3,.5),vec2(.1,.5),vec2(.1,.4)];
    
     //LETTER Ş
    
    letter =[ vec2(.8,.3),vec2(.8,.2),vec2(.4,.3),vec2(.5,.2),vec2(.4,.0),vec2(.5,.1),vec2(.7,0),vec2(.8,.1),vec2(.7,-.2),vec2(.8,-.3),vec2(.4,-.2),vec2(.4,-.3)];
    dots =  [ vec2(.6,-.4),vec2(.6,-.5),vec2(.7,-.5),vec2(.7,-.4)];

    //BUFFER

    bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program , "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( vPosition );
    thetaLoc = gl.getUniformLocation(program,"theta");
    theta =0;
    Yloc = gl.getUniformLocation(program,"y");
    y=0;
    Xloc = gl.getUniformLocation(program,"x");
    x=0;
    ColorLoc = gl.getUniformLocation(program,"Colors1");
    scaleLoc = gl.getUniformLocation(program, "scale");

    gl.clearColor(0.9, 0.9, 0.9 ,1.0);
    requestAnimFrame(render);
    
};


function render(){ 

    gl.clear(gl.COLOR_BUFFER_BIT); 
    gl.uniform1f(thetaLoc, theta);
    gl.uniform4f(Xloc,x,y,0.0,0.0);
    gl.uniform4f(Yloc,x,y,0.0,0.0);
    gl.uniform4f(ColorLoc,Red,Green,Blue,1.0);
    gl.uniform2f(scaleLoc, scalex,scaley);
       //Drawing I
    gl.bufferData( gl.ARRAY_BUFFER,flatten(vertices), gl.STATIC_DRAW );
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    //Initilazation buffer to . to i
    gl.bufferData(gl.ARRAY_BUFFER,flatten(points),gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLE_FAN,0,4);
    //Drawing s
    gl.bufferData(gl.ARRAY_BUFFER,flatten(letter),gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,12);
     ////Initilazation buffer to . to s
    gl.bufferData(gl.ARRAY_BUFFER,flatten(dots),gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLE_FAN,0,4);
    requestAnimFrame(render);
   
}