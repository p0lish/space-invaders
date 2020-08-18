welcomeDraw = function (game, dt, ctx) {
  const charmap = 'q wertyuiopasdfghjklzxcvbnm'
  ctx.clearRect(0, 0, game.width, game.height);
  ctx.font = "30px Arial";
  ctx.fillStyle = '#ffffff';
  ctx.textBaseline = "center";
  ctx.textAlign = "center";
  ctx.fillText("Space Invaders", game.width / 2, game.height / 2 - 40);
  ctx.font = "16px Arial";

  ctx.fillText("Press 'Space' to start.", game.width / 2, game.height / 2);
  ctx.font = "30px invaders";
  ctx.fillText(charmap, game.width / 2, game.height / 2 + 100)
  ctx.font = "30px Arial";
  ctx.fillText(charmap, game.width / 2, game.height / 2 + 140)

  ctx.font = "30px invaders";
  ctx.fillText(charmap.toUpperCase(), game.width / 2, game.height / 2 + 180)
  ctx.font = "30px Arial";
  ctx.fillText(charmap.toUpperCase(), game.width / 2, game.height / 2 + 220)
};

const drawInvaders = (game, ctx) => {
  let frame = 0
  if (game.invaderspeed < game.gameSpeed) { game.invaderspeed += 1 } else {
    fr = game['frame'] ? game['frame'] = 0 : game['frame'] = 1

    if (game.swingDirection === 1) {
      game.swingState += 10 * game.swingDirection
      if (game.swingState > 200) { game.swingDirection = game.swingDirection * -1; game.invadersTop += game.spriteSize / 2 }
    }

    if (game.swingDirection === -1) {
      game.swingState += 10 * game.swingDirection
      if (game.swingState < -200) { game.swingDirection = game.swingDirection * -1; game.invadersTop += game.spriteSize / 2 }
    }
    game.invaderspeed = 0

  }
  ctx.clearRect(0, 0, game.width, game.height);
  game['tables'][game['level']].map((line, index) => {
    ctx.fillText(line[fr], game.width / 2 + game.swingState, game.invadersTop + index * 50)
  })
 

}

const drawTank = (game, ctx) => {
  ctx.font = `${game.spriteSize}px invaders`;
  ctx.fillText('Q', game.tankpos, game.height)
}

gameDraw = function (game, dt, ctx) {
  ctx.font = `${game.spriteSize}px invaders`;
  ctx.fillStyle = '#ffffff';
  ctx.textBaseline = "center";
  ctx.textAlign = "center";
  let invaderHop = 0
  setInterval(() => {
    drawInvaders(game, ctx)
    drawTank(game, ctx)
  }, game.fps);

};

(() => {


  const startGame = () => {
    gameState.scene = 'inGame'
    draw(gameDraw)
  }

  const goLeft = () => { if (gameState.tankpos > gameState.spriteSize) { gameState.tankpos -= 10 } }
  const goRight = () => { if (gameState.tankpos < gameState.width - gameState.spriteSize) { gameState.tankpos += 10 } }

  const shootBeam = () => {}


  const keymap = {
    '32': {
      'start': startGame,
      'inGame': shootBeam
    },
    '37': {
      'inGame': goLeft
    },
    '39': {
      'inGame': goRight
    }
  }

  const tables = {
    0: [
      ["G G G G G G G G G G", "J J J J J J J J J J"],
      ["G G G G G G G G G G", "J J J J J J J J J J"],
      ["G G G G G G G G G G", "J J J J J J J J J J"],
      ["G G G G G G G G G G", "J J J J J J J J J J"],
      ["G G G G G G G G G G", "J J J J J J J J J J"],


    ]

  }

  const sceneMap = {
    'start': welcomeDraw
  }

  const gameState = {
    lives: 3,
    scene: 'start',
    fps: 50,
    gameWidth: 400,
    gameHeight: 300,
    level: 0,
    tables: tables,
    frame: 0,
    swingState: 0,
    swingDirection: 1,
    tankpos: 0,
    invaderspeed: 1,
    invadersTop: 50,
    gameSpeed: 10,
    spriteSize: 50
  }

  let stateStack = []
  pressedKeys = {}
  gameCanvas = null

  const keyDownHandler = (_key) => {
    const pressedKey = _key.keyCode
    console.log('_key', _key)
    if (keymap[pressedKey]) {
      keymap[pressedKey][gameState['scene']]()
    }
  }

  const keyUpHandler = (_key) => {
  }

  const draw = (stateFn = null) => {
    const gameCanvas = document.querySelector("#gameCanvas");
    gameState.width = window.innerWidth - 200
    gameState.height = window.innerHeight - 200
    gameState.tankpos = window.innerHeight - 200 / 2
    gameCanvas.width = gameState.width
    gameCanvas.height = gameState.height
    if (stateFn) {
      let ctx = gameCanvas.getContext('2d');
      stateFn(gameState, null, ctx)
    }
  }

  const start = () => {
    window.addEventListener('keydown', keyDownHandler)
    window.addEventListener('keyup', keyUpHandler)
    window.addEventListener('resize', () => {
      draw(sceneMap[gameState['scene']])
    })
    draw(sceneMap[gameState['scene']])

  }



  start()
})()
