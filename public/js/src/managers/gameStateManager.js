class GameStateManager{
    

    constructor(states){
        this.states = states
    }

    addState(name, gameState){
        this.states = {...this.states, name: gameState}
    }
 
}