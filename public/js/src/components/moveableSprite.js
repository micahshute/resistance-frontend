class MoveableSprite extends Sprite{

    constructor(sprite, user, location, canvas, size){
        super(sprite, user, location, canvas, size)
        this.arrowsPressed = []
        // this.sprite = new Sprite('public/assets/sprites/Male/Male\ 01-2.png', null, {x: 100, y: 100}, {
        //     top: 0, bottom: this.canvas.height, left: 0, right: this.canvas.width
        // })
        this.sprite = this
        this.boundKeyUpEL = this.keyUpEL.bind(this)
        this.boundKeyDownEL = this.keyDownEL.bind(this)
        
        this.makeControllble()
        // setInterval(this.makeUncontrollable.bind(this), 10000)
    }



    makeControllble(){
        document.addEventListener('keydown', this.boundKeyDownEL)
        document.addEventListener('keyup', this.boundKeyUpEL)
    }

    makeUncontrollable(){
        this.arrowsPressed = []
        document.removeEventListener('keydown', this.boundKeyDownEL)
        document.removeEventListener('keyup', this.boundKeyUpEL)
        this._activeState = Sprite.Image.states.STANDING_DOWN
    }

    keyDownEL(e){
        e.preventDefault()
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
    }

    keyUpEL(e){
        e.preventDefault()
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
    }





}
