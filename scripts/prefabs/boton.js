var Boton = function(game, x, y, key, label, callback,
                       callbackContext, overFrame, outFrame, downFrame, upFrame)
{
    Phaser.Button.call(this, game, x, y, key, callback,
        callbackContext, overFrame, outFrame, downFrame, upFrame);
 
    //Style how you wish...
    this.style = {
        'font': '13px Century Schoolbook',
        'fill': 'black'
    };
    this.anchor.setTo( 0, 0.5 );
    this.label = new Phaser.Text(game, 10, 0, label, this.style);
    
    this.renderable = false;
 
    //puts the label in the center of the button
    this.label.anchor.setTo( 0, 0.5 );
 
    this.addChild(this.label);
    this.setLabel( label );
 
    //adds button to game
    game.add.existing( this );
};
 
Boton.prototype = Object.create(Phaser.Button.prototype);
Boton.prototype.constructor = Boton;
 
Boton.prototype.setLabel = function( label ) {
    
   this.label.setText(label);
 
};