var game = new Phaser.Game(800, 480, Phaser.CANVAS, 'game_canvas');

game.state.add('load', load_state);
game.state.add('menu', menu_state);
game.state.add('play', play_state);

game.state.start('load');