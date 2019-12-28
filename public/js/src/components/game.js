class Game extends PageManager{

    static get GameState(){
        return class{
            static get start(){
                return 0
            }

            static get chooseParty(){
                return 1
            }

            static get mission(){
                return 2
            }

            static get postMission(){
                return 3
            }

            static get endGame(){
                return 4
            }
        }
    }

    constructor(container){
        super(container)
        this.canvas = document.createElement('canvas')
        this.gameContainer = document.createElement('div')
        this.gameContainer.id = 'game-container'
        this.state = Game.GameState.start
        this.sprite = new Sprite('public/assets/sprites/Male/Male\ 01-2.png', null, {x: 100, y: 100}, {
            top: 0, bottom: this.canvas.height, left: 0, right: this.canvas.width
        })
        this.arrowsPressed = []
        this.initBindingsAndEventListeners()
    }

    renderStaticHTML(){
        // this.container.innerHTML = ''
        this.container.appendChild(this.gameContainer)
        this.gameContainer.appendChild(this.canvas)
        this.canvasSetup()
    }


    initBindingsAndEventListeners(){
        window.onresize = this.canvasSetup.bind(this)
        document.addEventListener('keydown', (e) => {
            e.preventDefault()
            // console.log(e)
            switch(e.key){
                case 'ArrowUp':
                    this.sprite.activeState = Sprite.Image.states.WALKING_UP
                    if(!this.arrowsPressed.includes(Sprite.Image.states.WALKING_UP)){ this.arrowsPressed.push(Sprite.Image.states.WALKING_UP) }
                    break
                case 'ArrowRight':
                    this.sprite.activeState = Sprite.Image.states.WALKING_RIGHT
                    if(!this.arrowsPressed.includes(Sprite.Image.states.WALKING_RIGHT)){ this.arrowsPressed.push(Sprite.Image.states.WALKING_RIGHT) }
                    break
                case 'ArrowLeft':
                    this.sprite.activeState = Sprite.Image.states.WALKING_LEFT
                    if(!this.arrowsPressed.includes(Sprite.Image.states.WALKING_LEFT)){ this.arrowsPressed.push(Sprite.Image.states.WALKING_LEFT) }
                    break
                case 'ArrowDown':
                    this.sprite.activeState = Sprite.Image.states.WALKING_DOWN
                    if(!this.arrowsPressed.includes(Sprite.Image.states.WALKING_DOWN)){ this.arrowsPressed.push(Sprite.Image.states.WALKING_DOWN) } 
                    break
                default:
                    break
            }
        })
        document.addEventListener('keyup', e => {
            e.preventDefault()
            // console.log(e)
            switch(e.key){
                case 'ArrowUp':
                    this.arrowsPressed = this.arrowsPressed.filter(ap => ap !== Sprite.Image.states.WALKING_UP)
                    if(this.arrowsPressed.length > 0){
                        this.sprite.activeState = this.arrowsPressed[this.arrowsPressed.length - 1]
                    }else{
                        this.sprite.activeState = Sprite.Image.states.STANDING_UP
                    }
                    
                    break
                case 'ArrowRight':
                    this.arrowsPressed = this.arrowsPressed.filter(ap => ap !== Sprite.Image.states.WALKING_RIGHT)
                    if(this.arrowsPressed.length > 0){
                        this.sprite.activeState = this.arrowsPressed[this.arrowsPressed.length - 1]
                    }else{
                        this.sprite.activeState = Sprite.Image.states.STANDING_RIGHT
                    }
                    
                    break
                case 'ArrowLeft':
                    this.arrowsPressed = this.arrowsPressed.filter(ap => ap !== Sprite.Image.states.WALKING_LEFT)
                    if(this.arrowsPressed.length > 0){
                        this.sprite.activeState = this.arrowsPressed[this.arrowsPressed.length - 1]
                    }else{
                        this.sprite.activeState = Sprite.Image.states.STANDING_LEFT
                    }
                    break
                case 'ArrowDown':
                    this.arrowsPressed = this.arrowsPressed.filter(ap => ap !== Sprite.Image.states.WALKING_DOWN)
                    if(this.arrowsPressed.length > 0){
                        this.sprite.activeState = this.arrowsPressed[this.arrowsPressed.length - 1]
                    }else{
                        this.sprite.activeState = Sprite.Image.states.STANDING_DOWN
                    }
                    break
                default:
                    break
            }
        })
    }

    canvasSetup(){
        this.canvas.width = this.gameContainer.clientWidth
        this.canvas.height = this.gameContainer.clientHeight
        this.sprite.locationBoundaries.bottom = this.canvas.height
        this.sprite.locationBoundaries.right = this.canvas.width
        this.ctx = this.canvas.getContext('2d')
    }

    render(){
        super.render()
        this.lastTime = Date.now();
        this.gameLoop()
    }

    gameLoop(){
        const now = Date.now()
        const dt = (now - this.lastTime) / 1000.0
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
        this.update(dt)
        //render()

        this.lastTime = now
        requestAnimationFrame(this.gameLoop.bind(this))
    }


    update(dt){
        // console.log(this.sprite.img, this.sprite.imgPos.x, this.sprite.imgPos.y, this.sprite.location.x, this.sprite.location.y)
        this.sprite.update(dt)
        this.sprite.draw(this.ctx)

    }


}