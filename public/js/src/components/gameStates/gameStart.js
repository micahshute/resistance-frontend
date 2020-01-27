class GameStart extends GameState{

    constructor(){
        
        super(SPRITES)

        this.selectedSprite = 0
        this.startRow = 4
        this.startCol = 0
    }

    get sprites(){
        return this.objs
    }

    get selectedSprite(){
        return this._selectedSprite
    }

    set selectedSprite(num){
        if(num >= this.sprites.length || num < 0){ 
            return
        }
        const prevSelectedSprite = this.selectedSprite
        
        this._selectedSprite = num
        if(prevSelectedSprite || prevSelectedSprite === 0 ){
            this.sprites[prevSelectedSprite] = this.sprites[prevSelectedSprite].removeBorder()
        }
        this.sprites[num] = new BorderedSprite(this.sprites[num])
    }

    transitionIn(){
        super.transitionIn()
        this.keydownEventListener = e => {
            e.preventDefault()
            // console.log(e)
            switch(e.key){
                case "ArrowRight": 
                    this.selectedSprite = this.selectedSprite + 1
                    break
                case "ArrowLeft":
                    this.selectedSprite = this.selectedSprite - 1
                    break
                case "ArrowDown":
                    this.selectedSprite = this.selectedSprite + this.gridStrategy.maxCols
                    break
                case "ArrowUp":
                    this.selectedSprite = this.selectedSprite - this.gridStrategy.maxCols
                    break
                case "Enter":
                    this.transitionOut([SPRITES[this.selectedSprite].removeBorder()])
                    break
                default:
                    break
            }
        }

        document.addEventListener('keydown', this.keydownEventListener)
    }

    transitionOut(data){
        document.removeEventListener('keydown', this.keydownEventListener)
        super.transitionOut(data)
    }

    initGridStrategy(){
        this.gridStrategy = new CanvasGridStrategy(document.querySelector('canvas'), {width: 150, height: 100, startRow: this.startRow, startCol: this.startCol})
        for(let sprite of this.objs){
            try{
                const next = this.gridStrategy.generator.next()
                if(next.done){ throw {error: `There are too many sprites!`}}
                sprite.location = next.value
            }catch(err){
                alert(document.querySelector('canvas').width)
            }
            
        }
    }

    updateAndDraw(dt, ctx){
        if(!this.gridStrategy || this.gridStrategy.canvasSizeDidChange ){ this.initGridStrategy()}
        
        super.updateAndDraw(dt, ctx)
        const canvas = document.querySelector('canvas')
        ctx.font = "80px WarFont"
        ctx.fillStyle = "red"
        ctx.textAlign = "center"
        ctx.fillText("resistance", canvas.width / 2, 100)
        ctx.font = '40px WarFont'
        ctx.fillText('choose your avatar', canvas.width / 2 ,200)
        
    }
    
}