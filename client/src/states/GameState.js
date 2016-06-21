import RainbowText from 'objects/RainbowText';
import Io from 'socket.io-client'
import Player from 'objects/Player'
import Opponent from 'objects/Opponent'
let socket
class GameState extends Phaser.State {

	create() {
		socket = this.state.states['GameState'].socket
		let initialState = this.state.states['GameState'].initialData
		console.log(initialState)
		//socket.emit(`my other event`, 'message:', Date.now())
		this.game.world.setBounds(-(initialState.world.size.x/2), -(initialState.world.size.y/2), 
			initialState.world.size.x/2, initialState.world.size.y/2)
		let center = { x: this.game.world.centerX, y: this.game.world.centerY }
		//let text = new RainbowText(this.game, center.x, center.y, "- phaser -\nwith a sprinkle of\nES6 dust!");
		//text.anchor.set(0.5);
		this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.world.enableBody = true
		this.game.player = new Player(this.game, center.x, center.y, socket)
		this.game.add.existing(this.game.player)
		this.game.camera.follow(this.game.player)
		this.game.camera.x = initialState.start.x
		this.game.camera.y = initialState.start.y
		this.game.randomText = this.game.add.text(0,100, 'Time left: ' + 10, {
        font: '30px Arial',
        fill: '#ff0044',
        align: 'center'
    });
		
		this.players = []
		console.log('existing players:', initialState.players)
		for (let player in initialState.players) {
			this.players[player] = new Opponent(this.game, center.x, center.y, player)
			console.log('player:', player)
		}
		this.game.randomText.fixedToCamera = true
		
		this.socket.on(`newPlayer`, data => {
			console.log('new player:', data)
			this.players[data.id] = new Opponent(this.game, data.player.x, data.player.y, data.id)
			this.game.add.existing(this.players[data.id])
			
		})
		this.socket.on('opponentMove', data => {
			// console.log('opponentMove:', data)
			console.log('this:', data.id)
			console.log('players:', this.players)
			this.players[data.id].moveOpponent(data)
		})
	}
	update() {
		this.game.debug.bodyInfo(this.game.player.sprite)
		// this.game.player.update()
		this.players.forEach(function (player, idx) {
			this.game.debug.body(player.sprite)
		})
		this.game.randomText.setText('Time: ' + Date.now())
	}

}

export default GameState;
