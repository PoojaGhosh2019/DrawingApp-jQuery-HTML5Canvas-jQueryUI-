$(function(){
  $("#slider").slider({
      min: 3,
      max: 30,
      slide: function(event, ui){
         $("#circle").height(ui.value);
         $("#circle").width(ui.value);
      }
  });  
    //declare variables
        //painterasing or not - boolean variable
        var paint = false;
        //painting or erasing
        var paint_erase = "paint"
        //get the canvas and context
        var canvas = document.getElementById("paint");
        var ctx = canvas.getContext('2d');
        //get the canvas container
        var container = $("#container");
        //mouse position
        var mouse = {x:0,y:0};
    
    //onload load saved work from localStorge
    if(localStorage.getItem("imageCanvas") != null){
        var img = new Image();
        img.onload = function(){
            ctx.drawImage(img,0,0);
        }
        img.src = localStorage.getItem("imageCanvas");
    }
       
    //set drawing parameters(lineWidth, linejoin, linecap) , 3 is the initial diameter of the circle
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap= "round";
    
    //click inside container
    container.mousedown(function(e){
        paint = true;
        ctx.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        ctx.moveTo(mouse.x,mouse.y)
    });
    //move the mouse while holding mouse key
     container.mousemove(function(e){
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
         if(paint == true){
             if(paint_erase == "paint"){
                 //get color input
                 ctx.strokeStyle = $("#paintColor").val();
             }else{
                 //erasing so white color
                 ctx.strokeStyle = "white"
             }
             ctx.lineTo(mouse.x, mouse.y);
             ctx.stroke();
         }
    });
    //move up-> we are not paintingerasing anymore
    container.mouseup(function(){
       paint = false; 
    });
    //if we leave the container we are not painting erasing anymore
     container.mouseleave(function(){
       paint = false; 
    });
    
    //click on the reset button
    $("#reset").click(function(){
       ctx.clearRect(0,0,canvas.width,canvas.height);
        paint_erase = "paint";
        $("#erase").removeClass("eraseMode");
    });
    //click on save button
    //localStorage - noexpiration of the data
    //sessionStorage - valid for user session , if closes browser then looses data
    //for this app using localstorage
    $("#save").click(function(){
        if(typeof(localStorage) != null){
       localStorage.setItem("imageCanvas",canvas.toDataURL());
       // window.alert(localStorage.getItem("imageCanvas"));
    }else{
        window.alert("Your browser doesnot support local storage");
    }
    });
    //click on the erase button
    $("#erase").click(function(){
        if(paint_erase == "paint")
            paint_erase = "erase";
        else
            paint_erase = "paint";
        $(this).toggleClass("eraseMode");
    })
    //change color input
    $("#paintColor").change(function(){
        $("#circle").css("background-color",$(this).val());
    });
    //change linewidth using slider
     $("#slider").slider({
      min: 3,
      max: 30,
      slide: function(event, ui){
         $("#circle").height(ui.value);
         $("#circle").width(ui.value);
          ctx.lineWidth = ui.value;
      }
  }); 
   
});

/*code lines to learn HTML 5 canvas
 var canvas = document.getElementById("paint");
    var context = canvas.getContext('2d');
    
    //draw a line
    //declare a new path
    context.beginPath();
    
    //set line width
    context.lineWidth = 40;
    //set line color
    context.strokeStyle = '#42e565';
    //set cap to the line(round, butt , square)
    context.lineCap="round";
    //set line join style(bevel,round,miter)
    context.lineJoin = "round";
    //position the context point
    context.moveTo(50,50);
    //draw a straight line from starting point to a new position
    context.lineTo(200,200);
    //draw another line
    context.lineTo(400,100);
    
    //make line visible
    context.stroke();
*/