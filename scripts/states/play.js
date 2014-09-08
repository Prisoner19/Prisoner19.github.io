'use strict';

var datos_json;
var escena;

var final = false;

var play_state =
{
    create: function ()
    {
        datos_json = JSON.parse(game.cache.getText('game_data'));
        escena = new Escena(this.game);
        
        escena.cargar_escena("1.1");
    },

    update: function()
    {

    }
};