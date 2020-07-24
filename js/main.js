document.addEventListener('DOMContentLoaded', () => {

    // DOM References
    const movementTag = document.querySelector('#movement');
    const game = document.querySelector('#game')

    // Canvas Configs
    game.setAttribute('height', 400)
    game.setAttribute('width', 800)

    // Context
    let context = game.getContext("2d")

    const drawBox = (x, y, size, color) => {
        context.fillStyle = color
        context.fillRect(x, y, size, size)
    }
    
})