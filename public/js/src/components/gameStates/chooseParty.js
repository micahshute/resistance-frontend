class ChooseParty extends GameState{

    constructor(playerSprites){
        super(playerSprites)
    }


   
    updateAndDraw(ctx, dt){
        super.updateAndDraw(ctx, dt)
        console.log(this.objs)
    }

}