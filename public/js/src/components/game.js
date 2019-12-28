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
        this.sprite = new MoveableSprite('public/assets/sprites/Male/Male\ 01-2.png', null, {x: 100, y: 100}, this.canvas)
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
      
    }

    canvasSetup(){
        this.canvas.width = this.gameContainer.clientWidth
        this.canvas.height = this.gameContainer.clientHeight
        this.ctx = this.canvas.getContext('2d')
    }

    render(){
        super.render()
        this.lastTime = Date.now();
        this.gameLoop()
    }

    update(dt){
        // console.log(this.sprite.img, this.sprite.imgPos.x, this.sprite.imgPos.y, this.sprite.location.x, this.sprite.location.y)
        this.sprite.update(dt)
        this.sprite.draw(this.ctx)

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


    


}