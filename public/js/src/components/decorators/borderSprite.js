class BorderedSprite{

    constructor(sprite, color="white"){
        this.sprite = sprite
        this.color = color
    }


    removeBorder(){
        return this.sprite
    }

    update(dt){
        this.sprite.update(dt)
    }

    set location(newLocation){
        this.sprite.location = newLocation
    }

    get location(){
        return this.sprite.location
    }

    draw(ctx){
        // console.log(this.sprite)
        ctx.strokeRect(this.sprite.location.x, this.sprite.location.y, this.sprite.size.x + 2, this.sprite.size.y + 2)
        ctx.strokeStyle = this.color
        this.sprite.draw(ctx)
        
        
        // TODO: Use context to draw a border of color this.color around the sprite
    }



}