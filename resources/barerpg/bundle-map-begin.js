{
	// Map BGM
	addAudio:[
		["map-bgm",[audioserver+"tlol-village.mp3",audioserver+"tlol-village.ogg"],{channel:"bgmusic",loop:true}],	
	],
	// Map graphics
	addImage:[	
		["tiles","resources/tlol/gfx-village.png"],
	],
	// Map Tileset
	addTiles:[
		{id:"tiles",image:"tiles",tileh:30,tilew:30,tilerow:10,gapx:0,gapy:0},	
	],
	setObject:[
		{
			object:"tilemaps",
			property:"map",
			value:{					
				title:"Kariko Village",
				tileset:"tiles",
				map:[
					[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
					[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,   0,   0,   0,  0,  0,  0],
					[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,   0,   0,   0,  0,  0,  0],
					[   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  0,  0],
					[   0,   0,   0,   0,  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  0],
					[   0,   0,   0,  0,  0,  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
					[   0,   0,   0,  0,  0,   0,   0,   0,   0,   0,  0,  0,   0,   0,   0,   0],
					[   0,   0,   0,  0,   0,   0,   0,   0,   0,   0,   0,  0,   0,   0,   0,   0],
					[   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
					[   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
					[   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
					
				  ],
				 playerSpawnX:40,
				 playerSpawnY:180,
				 addObjects:function() {
					gbox.playAudio("map-bgm");
				 },
				 mapActions:function() {
					var pl=gbox.getObject("player","player");
					var ontile=help.getTileInMap(pl.x+pl.colx+pl.colhw,pl.y+pl.coly+pl.colhh,tilemaps.map,tilemaps._defaultblock,"map");
				 },
				tileIsSolid:function(obj,t){ return (t>9) }
			}
		}
	]
}
