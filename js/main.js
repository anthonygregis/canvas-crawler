let movementDisplay;
let context;
let game;
let hero;
let ogre;

// Crawler Constructor Function
function Crawler(x, y, width, height, color) {
    this.defaultX = x
    this.defaultY = y
    this.currentX = 0
    this.currentY = 0
    this.width = width
    this.height = height
    this.color = color
    this.alive = true
    this.render = function(x, y) {
        this.currentX = x
        this.currentY = y

        context.fillStyle = this.color
        context.fillRect(x, y, this.width, this.height)
    }
}

const movementHandler = (e) => {
    switch(e.code) {
        case "KeyW":
            if(hero.currentY > 0) {
                hero.currentY -= 5;
            }
            break
        case "KeyA":
            if(hero.currentX > 0) {
                hero.currentX -= 5;
            }
            break
        case "KeyS":
            if(hero.currentY + hero.height < game.height) {
                hero.currentY += 5
            }
            break
        case "KeyD":
            if(hero.currentX + hero.width < game.width) {
                hero.currentX += 5
            }
            break
        default:
            console.log("Nope, just no.")
    }
}

const detectHit = () => {
    let heroRight = hero.currentX + hero.width
    let heroLeft = hero.currentX
    let heroTop = hero.currentY
    let heroBottom = hero.currentY + hero.height

    let ogreRight = ogre.currentX + ogre.width
    let ogreLeft = ogre.currentX
    let ogreTop = ogre.currentY
    let ogreBottom = ogre.currentY + ogre.height

    if(heroRight > ogreLeft && heroLeft < ogreRight && heroBottom > ogreTop && heroTop < ogreBottom ) {
        ogre.alive = false
    }
}

const gameLoop = () => {
    //console.log('We be looping')

    //Clear the Gameboard
    context.clearRect(0, 0, game.width, game.height)

    //display the coords of the hero onto the dom
    movementDisplay.textContent = `X:${hero.currentX}\nY:${hero.currentY}`

    //check if ogre is alive and
    if(ogre.alive) {
        // render the ogre
        ogre.render(ogre.defaultX, ogre.defaultY)
        //check for collision
        detectHit()
    }

    //render the hero
    hero.render(hero.currentX, hero.currentY)
}

document.addEventListener('DOMContentLoaded', () => {

    // DOM References
    movementDisplay = document.querySelector('#movement');
    game = document.querySelector('#game')

    // Canvas Configs
    game.setAttribute('height', 400)
    game.setAttribute('width', 800)

    // Context
    context = game.getContext("2d")

    // Character References
    ogre = new Crawler(300, 100, 80, 120, 'chartreuse')
    hero = new Crawler(20, 100, 50, 50, 'hotpink')

    document.addEventListener('keydown', movementHandler)

    let runGame = setInterval(gameLoop, 60)
})
