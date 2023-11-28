// Anonymous closure to sandbox my code
void function() {
		
    // Tells the JS engine to use strict syntax rules
    // e.g. creating variables without var, let or const
    // creates an error in strict mode
    "use strict";
    
    var canvasWidth = 250;
    var canvasHeight = 250;
    var canvas = null;
    var ctx = null;
    var mouse = {x: 0.0, y: 0.0};
    var box = {x: 0.0, y: 0.0, width: 20, height: 20};
    var boxMoveSpeed = 25.0;
    
    // Called whenever the mouse moves 
    // (canvas.onmousemove can be used too)
    window.onmousemove = function(e) {
        if (canvas) {
            // Gets the canvas' offset from the top left of the screen
            var boundingRect = canvas.getBoundingClientRect();
            
            mouse.x = e.clientX - boundingRect.left;
            mouse.y = e.clientY - boundingRect.top;
        }
    }
    
    // Game loop
    function loop() {
        // Tick (Update game logic)
        box.x += (mouse.x - box.x - box.width * 0.5) / boxMoveSpeed;
        box.y += (mouse.y - box.y - box.height * 0.5) / boxMoveSpeed;
        
        // Render
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0,0,canvasWidth,canvasHeight);
        
        ctx.lineWidth = 3;
        ctx.strokeStyle = "white";
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.rect(box.x,box.y,box.width,box.height);
        ctx.fill();
        ctx.stroke();
        
        // Handy function that loops this
        // function at 60Hz (60 fps) for me.
        requestAnimationFrame(loop);
    }
    
    // Called when the page finishes loading
    // I treat it like a 'main method' you see
    // in other languages
    window.onload = function() {
        canvas = document.getElementById("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        
        ctx = canvas.getContext("2d");
        
    loop();
    }

}();