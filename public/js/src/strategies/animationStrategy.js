class AnimationStrategy{

    constructor(frames, fps, speed){
        //Frames can be anything you want returned to you every X fps.
        // So it oculd be the actual picture, the index number of the picture,
        // or the xy coordinates of the sprite, etc
        this.frames = frames
        this.fps = fps
        this.timeSinceLastFrameChange = 0
        this.speed = speed
        this.states = {
            ANIMATING: 0,
            NOT_ANIMATING: 1
        }
        this.lastFrame = 0
        this.activeState = this.states.NOT_ANIMATING
    }

    start(){
        this.activeState = this.states.ANIMATING
    }

    frame(dt){
        if(this.frames.length === 1){ return this.frames[0] }

        if(this.timeForNewFrame(dt)){
            this.lastFrame = (this.lastFrame + 1) % this.frames.length
            this.timeSinceLastFrameChange = 0
        }
        return this.frames[this.lastFrame]
    }

    timeForNewFrame(dt){
        if( this.activeState === this.states.NOT_ANIMATING) { return false }
        this.timeSinceLastFrameChange += dt
        return this.timeSinceLastFrameChange >= this.dt
    }


    ds(dt){
        return this.activeState === this.states.ANIMATING ? 
        {
            x: this.speed.x * dt,
            y: this.speed.y * dt
        }
        : 
        {
            x: 0,
            y: 0
        }
    }



    getNewFrameAndLocationChange(dt){
        return {
            frame: this.frame(dt),
            locationChange: this.ds(dt)
        }
    }

    stop(){
        this.activeState = this.states.NOT_ANIMATING
        this.timeSinceLastFrameChange = 0
    }

    get dt(){
        return 1.0 / this.fps
    }

}