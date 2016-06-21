export default class Player extends Phaser.Graphics {

	constructor(game, x, y, socket) {
		super(game, x, y)
    this.beginFill(0xFFFFFF, 1)
    this.drawCircle(0, 0, 100)
    this.sprite = game.add.sprite(0, 0)
    this.sprite.addChild(this)
    game.physics.arcade.enable(this.sprite)
    this.enableBody = true
    this.socket = socket
    this.physicsBodyType = Phaser.Physics.ARCADE
    this.pressLeft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    this.pressRight = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    this.pressUp = game.input.keyboard.addKey(Phaser.Keyboard.UP)
    this.pressShift = game.input.keyboard.addKey(Phaser.KeyCode.SHIFT)
    this.pressSpace = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
    this.pressDown = game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    console.log('this body', this.body)
    this.socket.emit('created', {
        player: {
          x: this.sprite.x,
          y: this.sprite.y
        }
      })
    this.socket.on(`move`, data => {
      switch (data.direction) {
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
          this.velocity.x = 0
          this.velocity.y = 0
      }
    })
    
	}
  move (player,direction) {
    player.socket.emit('move', {
        player: {
          x: player.sprite.x,
          y: player.sprite.y
        },
        direction: direction
      })
  }
  
  update () {
    // this.game.debug.body(this.sprite)
    // this.game.playerText.setText('has updated: true')
    if (this.pressRight.isDown) {
      this.move(this, 'right')
      // this.sprite.body.velocity.x = 100
      // console.log('keyboard movement')
    } else if (this.pressLeft.isDown) {
      this.move(this, 'left')
      // this.sprite.body.velocity.x = -100
      // console.log('keyboard movement')
    } else if (Math.abs(this.sprite.body.velocity.x) > 0) {
      this.move(this, 'stopX')
    }
    if (this.pressUp.isDown) {
      this.move(this, 'up')
      // this.sprite.body.velocity.y = -100
      // console.log('keyboard movement')
    } else if (this.pressDown.isDown) {
      this.move(this, 'down')
      // this.sprite.body.velocity.y = 100
      // console.log('keyboard movement')
    } else if ( Math.abs(this.sprite.body.velocity.y) > 0) {
      this.move(this, 'stopY')
    }
  }

}