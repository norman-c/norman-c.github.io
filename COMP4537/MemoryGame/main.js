let angle = 90;

function gameStart(x, y, numGood, goodtiles, badtiles, goodClicked, badClicked, score) {
  document.getElementById('game').style.display = 'block';
  document.getElementById('summary').style.display = 'none';
  document.getElementById('terminate').onclick = () => terminate(score,false);
  deleteGrid();
  createGrid(x, y);
  document.getElementById('score').innerHTML = `${score}`;
  let tiles = Array.from(document.querySelectorAll(".tile"));
  for(let i = 0; i < 3; i++){
    let tempTile = getRandomTile();
    while(goodtiles.includes(tempTile)){
      tempTile = getRandomTile();
    }
    goodtiles.push(tempTile);
    numGood++;
  
  }
  badtiles = tiles.filter(
    function(e) {
      return this.indexOf(e) < 0;
    },
    goodtiles
  );
  goodtiles.forEach((e) => e.style.background = "green");
  setTimeout(() => {
    rotateGrid();
    goodtiles.forEach((e) => e.onclick = () => {
      e.style.backgroundColor = 'green';
      goodClicked.push(e.id);
      score++;
      document.getElementById('score').innerHTML = `${score}`;
      game(x,y,numGood,goodtiles,badtiles,goodClicked,badClicked, score);
    });
    badtiles.forEach((e) => e.onclick = () => {
      e.style.backgroundColor = 'red';
      badClicked = true;
      terminate(score,true);
    });
    tiles.forEach((e) => e.style.background = "blue");
  }, 750);
}


function game(x, y, numGood,goodtiles, badtiles, goodClicked, badClicked, score) {
  if(score < 0){
    console.log("game restarting");
    gameStart(2,2,[],[],[],[],0);
  }else if(goodClicked.length == goodtiles.length){ 
    score = score + goodtiles.length;
    document.getElementById('terminate').onclick = () => terminate(score,false);
    document.getElementById('score').innerHTML = `${score}`;
    goodClicked = [];
    if(!badClicked){
      tempXYGood = increaseDifficulty(x,y,numGood);
      x = tempXYGood.x;
      y = tempXYGood.y;
      numGood = tempXYGood.numGood;
    }else{
      badClicked = false;
      tempXYGood = decreaseDifficulty(x,y,numGood);
      x = tempXYGood.x;
      y = tempXYGood.y;
      numGood = tempXYGood.numGood;
    }
    deleteGrid();
    createGrid(x , y );
    let tiles = Array.from(document.querySelectorAll(".tile"));
    let newGoodTiles = [];
    for(let i = 0; i <= goodtiles.length; i++){
      let tempTile = getRandomTile();
      while(newGoodTiles.includes(tempTile)){
        tempTile = getRandomTile();
      }
      newGoodTiles.push(tempTile);
      numGood++;
    
    }
    badtiles = tiles.filter(
      function(e) {
        return this.indexOf(e) < 0;
      },
      newGoodTiles
    );
    console.log(newGoodTiles);
    newGoodTiles.forEach((e) => e.style.background = "green");
    setTimeout(() => {
      rotateGrid();
      newGoodTiles.forEach((e) => e.onclick = () => {
        e.style.backgroundColor = 'green';
        score++;
        goodClicked.push(e.id);
        document.getElementById('score').innerHTML = `${score}`;
        game(x,y,numGood,newGoodTiles,badtiles,goodClicked,badClicked, score);
      });
      badtiles.forEach((e) => e.onclick = () => {
        e.style.backgroundColor = 'red';
        score--;
        badClicked = true
        document.getElementById('score').innerHTML = `${score}`;
        game(x,y,numGood,newGoodTiles,badtiles,goodClicked,badClicked, score);
      });
      tiles.forEach((e) => e.style.background = "blue");
    }, 750);
    
  }
  
}

function increaseDifficulty(x,y,numGood) {  
  if(numGood%2 == 0){
    if(x < 7 || y < 7){
      if(x > y){
        y++;
        return {x,y,numGood};
      }else{
        x++;
        return {x,y,numGood};
      }
    }else{
      numGood++;
    return {x,y,numGood};
    }
  }else{
    numGood++;
    return {x ,y ,numGood};
  }
};

function decreaseDifficulty(x,y,numGood) {  
  if(numGood%2 == 0){
    if(x > y){
      y--;
      return {x,y,numGood};
    }else{
      x--;
      return {x,y,numGood};
    }
  }else{
    numGood--;
    return {x,y,numGood};
  }
};

function terminate(score, check){
  if(check){
    deleteGrid();
    document.getElementById('game').style.display = 'none';
    document.getElementById('summary').style.display = 'block';
  }else{
    if (confirm("Are you sure you want to terminate?")) {
      deleteGrid();
      document.getElementById('game').style.display = 'none';
      console.log(score)
      document.getElementById('scoresummary').innerHTML = `${score}`;
      document.getElementById('summary').style.display = 'block';
    }
  }
  
} 

function deleteGrid() {
    let grid = document.getElementById('grid');
    let rows = Array.from(grid.children);
    rows.forEach((tile) =>
        grid.removeChild(tile)
    );
}

function createGrid(x, y) {
    let grid = document.getElementById('grid');
    for (let i = 0; i < x; i++) {
        let row = document.createElement('div');
        row.setAttribute('class', 'row');
        grid.appendChild(row);
        for (let j = 0; j < y; j++) {
            let tile = document.createElement('div');
            tile.setAttribute('class', 'tile');
            // tile.setAttribute('onclick', 'tileClicked(event.currentTarget)');
            row.appendChild(tile);
        }
    }

}

function getRandomTile() {
    let tiles = document.querySelectorAll(".tile");
    return tiles[parseInt(Math.random() * tiles.length)];
}

function rotateGrid() {
  let grid = document.getElementById('grid');
  let deg = angle;
  grid.style.transform = 'rotate('+deg+'deg)'; 
  angle = angle + 90;
}


