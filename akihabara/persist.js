// this fixes an issue with the old method, ambiguous values
// with this test document.cookie.indexOf( name + "=" );
function Get_Cookie( check_name ) {
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f

	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );

		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

		// if the extracted name matches passed check_name
		if ( cookie_name == check_name )
		{

			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )
	{
		return null;
	}
}
	

function Set_Cookie( name, value, expires, path, domain, secure )
{
// set time, it's in milliseconds
var today = new Date();
today.setTime( today.getTime() );

/*
if the expires variable is set, make the correct
expires time, the current script below will set
it for x number of days, to make it for hours,
delete * 24, for minutes, delete * 60 * 24
*/
if ( expires )
{
expires = expires * 1000 * 60 * 60 * 24;
}
var expires_date = new Date( today.getTime() + (expires) );

document.cookie = name + "=" +escape( value ) +
( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
( ( path ) ? ";path=" + path : "" ) +
( ( domain ) ? ";domain=" + domain : "" ) +
( ( secure ) ? ";secure" : "" );
}


var persist = {

   _spriteId:1,

   _sprites:{},
   _state:{},
   restoredGame: false,


   add: function(sprite,state) {
     var obj_id = persist._spriteId++;
     sprite.obj_id = obj_id;
     persist._sprites[obj_id] = this.mergeState(sprite,state);
     return this.wrap(sprite); 

   },

   updateState:function(sprite) {
      persist._sprites[sprite.obj_id] = persist.getState(sprite,persist._sprites[sprite.obj_id]);
   },

   wrap:function(sprite) {
     for(var f in sprite) {
        if(sprite[f] instanceof Function) {
          (function(func) {
            sprite[f] = function(a,b) { 
              persist.setState(this,persist._sprites[this.obj_id]);
              var ret = func.call(this,a,b);
              persist._sprites[this.obj_id] = persist.getState(this,persist._sprites[this.obj_id]);
              return ret;
            }

          })(sprite[f]);
        }
     }
     return sprite;
   },

   mergeState:function(sprite,state) {
     for(var f in sprite) {
       if(!(sprite[f] instanceof Function)) {
         if(f != 'frames' && f != 'shadow') {
         if(!state.hasOwnProperty(f)) {
           state[f] = sprite[f];
         }
       }
       }
     }
     return state;

   },

   setState:function(sprite,state) {
     for(var f in state) {
       sprite[f] = state[f];
     }
   },

   getState:function(sprite,state) {
     for(var f in sprite) {
       if(!(sprite[f] instanceof Function)) {
         if(f != 'frames' && f != 'shadow') {
           state[f] = sprite[f];
         }
       }
     }
     return state;
   },

   saveLocalStorage: function() {
     persist._state = this.getState(maingame,persist._state);
     if(persist._state['state'] > 300) {
        persist._state['state'] = 210; // Go right to the game
     }

      player = gbox.getObject("player","player");
     if(player && persist._state['level']) {
       persist._state['level']['x'] = player.x;
       persist._state['level']['y'] = player.y;
     }


     var jsonString = JSON.stringify([persist._sprites,persist._state]);
     Set_Cookie('akihabara',jsonString);
   },

   restoreGameState: function() {
     restoreState = {}
     for(var i in this._state) {
       switch(i) { 
         case 'level':
         case 'state':
         restoreState[i] = this._state[i];
       }
     }
     this._state = restoreState;
     if(this._state['level'])
        this._state['_nextlevel'] = this._state['level'];
     this.setState(maingame,this._state);
   },

   restoreSavedData: function() {
     jsonString=  Get_Cookie('akihabara');
     if( jsonString) {
       persist.restoredGame = true;
       saved_data = JSON.parse(jsonString);
       persist._sprites = saved_data[0];
       persist._state = saved_data[1];
       return true;
     } else {
       return false;
     }

   },

   restoredData: function() {
      return persist.restoredGame;
   },

   fetch:function(sprite_id) {
     return persist._sprites[sprite_id];
   },

   restoreGame: function() {
      for(var i in this._sprites) {
         spriter.restoreSprite(this._sprites[i]['sprite_class'],this._sprites[i]);         
      }

   }


};

