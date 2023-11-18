// terrain.js

document.addEventListener("DOMContentLoaded", function () {
    // Get the canvas element and its context
    var canvas = document.getElementById("terrainCanvas");
    var ctx = canvas.getContext("2d");
  
    // Set the canvas size
    var canvasWidth = 800;
    var canvasHeight = 600;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  
    // Set the size of each map tile
    var tileSize = 20;
  
    // Calculate the number of tiles in the x and y directions
    var numTilesX = canvasWidth / tileSize;
    var numTilesY = canvasHeight / tileSize;
  
    // Initialize player position in the middle of the map
    var player = {
      x: Math.floor(numTilesX / 2),
      y: Math.floor(numTilesY / 2)
    };
  
     // Dictionary to store generated maps
  var generatedMaps = {};

  // Function to generate a more structured map
  function generateStructuredMap() {
    var map = [];

    //beginning
    /*for (var i = 0; i < numTilesX; i++) {
      map[i] = [];
      for (var j = 0; j < numTilesY; j++) {
        // Use weighted random selection for terrain types
        var rand = Math.random();
        if (rand < 0.5) {
          map[i][j] = "land"; // 40% chance of land
        } else if (rand < 0.0) {
          map[i][j] = "water"; // 40% chance of water
        } */
        
    for (var i = 0; i < numTilesX; i++) {
        map[i] = [];
        for (var j = 0; j < numTilesY; j++) {

            if (i < 1) {
                // Use weighted random selection for terrain types
                var rand = Math.random();
                if (rand < 0.5) {
                  map[i][j] = "land"; // 50% chance of land
                } else{
                  map[i][j] = "water"; // 50% chance of water
                }
            
            }

            if (i >= 1 && map[i-1][j] == "land") {
                var rand = Math.random();
                    if (rand < 0.90) {
                      map[i][j] = "land"; // 75% chance of land
                    } else{
                      map[i][j] = "water"; // 25% chance of water
                    }
            }

            else{
                var rand = Math.random();
                    if (rand < 0.90) {
                      map[i][j] = "water"; // 75% chance of land
                    } else{
                      map[i][j] = "land"; // 25% chance of water
                    }
            }
           
      }
    }


    return map;
  }
  
    // Function to draw the map on the canvas
    function drawMap(map) {
      for (var i = 0; i < numTilesX; i++) {
        for (var j = 0; j < numTilesY; j++) {
          // Set the color based on whether the tile is land or water
          ctx.fillStyle = map[i][j] === "land" ? "#8B4513" : "#87CEEB";
  
          // Draw a rectangle representing the tile
          ctx.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
        }
      }
    }
  
    // Function to draw the player on the canvas
    function drawPlayer() {
      ctx.fillStyle = "#FF0000"; // Red color for the player
      ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
    }
  
  // Function to handle keyboard input
  function handleInput(event) {
    var keyCode = event.keyCode;

    // Save the current player position for terrain generation
    var prevX = player.x;
    var prevY = player.y;

    // Update player position based on WASD keys
    if (keyCode === 87 && player.y > 0) player.y--; // W key
    else if (keyCode === 83 && player.y < numTilesY - 1) player.y++; // S key
    else if (keyCode === 65 && player.x > 0) player.x--; // A key
    else if (keyCode === 68 && player.x < numTilesX - 1) player.x++; // D key

    // Wrap around when reaching the map borders
    if (player.x === numTilesX - 1 && keyCode === 68) {
        // If the player is at the furthest right border and presses D,
        // wrap around to the left side and reuse the map if it exists
        player.x = 0;
        var key = player.x + "_" + player.y;
        if (generatedMaps[key]) {
          map = generatedMaps[key];
        } else {
          map = generateStructuredMap();
          generatedMaps[key] = map;
        }
      }
      if (player.x === 0 && keyCode === 65) {
        // If the player is at the left border and presses A,
        // wrap around to the right side and reuse the map if it exists
        player.x = numTilesX - 1;
        var key = player.x + "_" + player.y;
        if (generatedMaps[key]) {
          map = generatedMaps[key];
        } else {
          map = generateStructuredMap();
          generatedMaps[key] = map;
        }
      }
      if (player.y === numTilesY - 1 && keyCode === 83) {
        // If the player is at the bottom border and presses S,
        // wrap around to the top side and reuse the map if it exists
        player.y = 0;
        var key = player.x + "_" + player.y;
        if (generatedMaps[key]) {
          map = generatedMaps[key];
        } else {
          map = generateStructuredMap();
          generatedMaps[key] = map;
        }
      }
      if (player.y === 0 && keyCode === 87) {
        // If the player is at the top border and presses W,
        // wrap around to the bottom side and reuse the map if it exists
        player.y = numTilesY - 1;
        var key = player.x + "_" + player.y;
        if (generatedMaps[key]) {
          map = generatedMaps[key];
        } else {
          map = generateStructuredMap();
          generatedMaps[key] = map;
        }
      }
  
    // Redraw the map and player
    drawMap(map);
    drawPlayer();
  }
  
    // Function to generate new terrain based on the direction
  function generateNewTerrain(direction) {
    if (generatedMaps[direction]) {
      map = generatedMaps[direction];
    } else {
      map = generateStructuredMap();
      generatedMaps[direction] = map;
    }
  }
  
    // Generate the initial map and draw it
    var map = generateStructuredMap();
    drawMap(map);
  
    // Draw the player on top of the map
    drawPlayer();
  
    // Add a keyboard event listener for handling input
    document.addEventListener("keydown", handleInput);
  });
  