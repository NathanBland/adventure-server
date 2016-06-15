import GameState from 'states/GameState';
import Io from 'socket.io-client'
let socket = Io(`//localhost:8080`)
const baseSize = {
	width: Math.floor(window.innerWidth),
	height: Math.floor(window.innerHeight),
}
class Game extends Phaser.Game {
	
	constructor() {
		super(baseSize.width, baseSize.height, Phaser.AUTO, 'content', null);
		this.state.add('GameState', GameState, false);
		
		socket.on(`connected`, data => {
      console.log(data)
			this.state.states['GameState'].initialData = data
			this.state.states['GameState'].socket = socket
			this.state.start('GameState', true, false);
    })
		
	}

}

new Game();
