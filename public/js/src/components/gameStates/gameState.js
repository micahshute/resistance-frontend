class GameState{

    constructor(objs = [], opts = []){
        this.objs = objs
        this.opts = opts
        this.initBindingsAndEventListeners()
    }

    initBindingsAndEventListeners(){

    }

    transitionIn(){
        //set up opts

        console.log(`Transition in ${this}`)
        console.log(this)
    }

    transitionOut(data){
        //remove options

        console.log(`Transition out ${this}`)
        console.log(this)
        this.unmount(data)
    }


    updateAndDraw(dt, ctx){
        for( let obj of this.objs){
            obj.update(dt)
            obj.draw(ctx)
        }
    }
}