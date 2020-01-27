class CanvasGridStrategy{

    constructor(canvas, gridDimensions, type="centered"){
        this.canvas = canvas
        this.canvasWidth = this.canvas.width
        this.canvasHeight = this.canvas.height
        this.generator = this.forDimensions(gridDimensions)
        this.type = type
    }

    get canvasSizeDidChange(){
        const didChange = (this.canvas.width !== this.canvasWidth) || (this.canvas.height !== this.canvasHeight)
        if(didChange){
            this.canvasWidth = this.canvas.width
            this.cavasHeight = this.canvas.height
        }
        return didChange
    }

    get maxCols(){
        return Math.floor(this.canvas.width / this.currentBoxWidth)
    }

    get maxRows(){
        return Math.floor(this.canvas.height / this.currentBoxHeight)
    }

    forDimensions({width, height, startRow, startCol} = { width: 100, height: 100}){
        if(startRow === undefined || startCol === undefined){ 
            startRow = 0
            startCol = 0
        }
        this.currentBoxWidth = width
        this.currentBoxHeight = height
        if( width > this.canvas.width || height > this.canvas.height){ 
            throw {error: `The dimensions are larger than the canvas`}
        }
    
        const maxCols = this.maxCols
        const maxRows = this.maxRows
        const maxBoxes = maxCols * maxRows
        return function *({startingRow, startingCol} = {startingRow: startRow, startingCol: startCol}){

            const currentRowCol = {row: startingRow, col: startingCol }
            yield this.topLeftForRowCol(currentRowCol)
            let currentIter = ( startingRow * maxCols ) + startingCol
            currentIter += 1
            while(currentIter < maxBoxes){
                if(this.canvasSizeDidChange){ throw {error: "Canvas size changed during render"}}
                const currRow = Math.floor(currentIter / maxCols)
                const currCol = currentIter - (currRow * maxCols)
                yield this.topLeftForRowCol({row: currRow, col: currCol})
                currentIter += 1
            }
        }.bind(this)()
    }


    //0-indexed 
    topLeftForRowCol({row, col}){
        switch(this.type){
            case "centered":
                const rightBump = ((this.canvas.width / this.currentBoxWidth) - Math.floor(this.canvas.width / this.currentBoxWidth)) * this.currentBoxWidth 
                
                return {
                    x: col * this.currentBoxWidth + rightBump,
                    y: row * this.currentBoxHeight
                }
            default: 
                return {
                    y: row * this.currentBoxHeight,
                    x: col * this.currentBoxWidth
                }
        }
        
    }
}