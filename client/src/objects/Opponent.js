export default class Opponent extends Phaser.Graphics {

	constructor(game, x, y, id) {
		super(game, x, y)
    this.beginFill(0xFFFFFF, 1)
    this.drawCircle(0, 0, 100)
    this.sprite = game.add.sprite(0, 0)
    this.sprite.addChild(this)
    game.physics.arcade.enable(this.sprite)
    this.enableBody = true
    //this.socket = socket
    
    console.log('this opponent body', this.body)
    
	}
  moveOpponent (data) {
    console.log('move opponent', data)
    switch (data.move.direction) {
        case 'left':
          this.sprite.body.velocity.x = -100
          break
        case 'right':
          this.sprite.body.velocity.x = 100
          break
        case 'down':
          this.sprite.body.velocity.y = 100
          break
        case 'up':
          this.sprite.body.velocity.y = -100
          break
        case 'stopX':
          this.sprite.body.velocity.x = 0
          break
        case 'stopY':
          this.sprite.body.velocity.y = 0
          break
        default:
          this.sprite.velocity.x = 0
          this.sprite.velocity.y = 0
      }
  }
  
  update () {
    // this.game.debug.body(this.sprite)
    
  }

}