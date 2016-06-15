import RainbowText from 'objects/RainbowText';
import Io from 'socket.io-client'
let socket
class GameState extends Phaser.State {

	create() {
		socket = this.state.states['GameState'].socket
		let initialState = this.state.states['GameState'].initialData
		console.log(initialState)
		socket.emit(`my other event`, 'message:', Date.now())
		this.game.world.setBounds(-(initialState.world.size.x/2), -(initialState.world.size.y/2), 
			initialState.world.size.x/2, initialState.world.size.y/2)
		let center = { x: this.game.world.centerX, y: this.game.world.centerY }
		//let text = new RainbowText(this.game, center.x, center.y, "- phaser -\nwith a sprinkle of\nES6 dust!");
		//text.anchor.set(0.5);
		this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.world.enableBody = true
		let graphics = this.game.add.graphics(center.x, center.y)
		graphics.beginFill(0xFFFFFF, 1)
    graphics.drawCircle(0, 0, 100)
		//this.game.camera.follow(text)
		this.game.camera.follow(graphics)
	}

}

export default GameState;
