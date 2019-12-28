class App{


    constructor(container){
        this.container = container
        // this.container.innerHTML = `<h1>Resistance</h1>`
        this.game = new Game(this.container)
        this.game.render()
    }


}