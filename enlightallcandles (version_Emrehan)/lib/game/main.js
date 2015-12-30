ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.levels.first',
	'game.levels.second',
	'game.levels.third',
	'game.levels.fourth',
	'game.entities.canon',
    'game.entities.hansChristian',
	'game.entities.ball',
	'game.entities.kerze',
	'game.entities.flare'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	DoneImage : new ig.Image('media/done.png'),
	time2spawn:0,
	levelDone:false,
	level:1,
	
	
	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.bind(ig.KEY.MOUSE1,'ire');
        ig.input.bind(ig.KEY.MOUSE1,'fire');
		ig.input.bind(ig.KEY.UP_ARROW,'up');
		ig.input.bind(ig.KEY.DOWN_ARROW,'down');
		ig.input.bind(ig.KEY.RIGHT_ARROW,'right');
		ig.input.bind(ig.KEY.LEFT_ARROW,'left');
		ig.input.bind(ig.KEY.SPACE,'fire');
		this.loadLevel(LevelFirst);		
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		
		this.parent();
		
		var kerzen=this.getEntitiesByType( EntityKerze );
		var all_lit=true;
		for (var i=0;i<kerzen.length;i++)
		{
			if (kerzen[i].burn==false)
			{
				all_lit=false;
			}
		}
		if (all_lit && this.levelDone==false)
		{
			console.log("bind space to nextLevel");
			this.levelDone=true;
			ig.input.bind(ig.KEY.SPACE,'NextLevel');
		}
		
		if(ig.input.pressed('NextLevel')){
			this.levelDone=false;
			this.level=this.level+1;
			console.log("start the next level");
			
			this.startLevel(this.level);
			
			
		}	
	},
	
	startLevel:function(aLevel)
	{
		
			switch (aLevel) {
				
				case 2:	ig.input.bind(ig.KEY.SPACE,'fire');this.loadLevel(LevelSecond);
					break;
				case 3:	ig.input.bind(ig.KEY.SPACE,'fire');this.loadLevel(LevelThird);
					break;
				case 4:	ig.input.bind(ig.KEY.SPACE,'fire');this.loadLevel(LevelFourth);
					break;
				case 5: ig.system.setGame(GameEnd);
					break;
			}
		
	},
	
	draw: function() {
		
		//this.time2spawn=this.time2spawn-1;
		//if (this.time2spawn<0)
		//{
		//	this.time2spawn=100;
		//	//console.log("spawn");
		//	ig.game.spawnEntity('EntityKerze', Math.random()*240,Math.random()*160 );
		//}
		// Draw all entities and backgroundMaps
		
		this.parent();
		if (this.levelDone)
		{
			this.DoneImage.draw(0,0);	
		}
		
		
		
		
		
	}
});

OpenScreen = ig.Game.extend({
	StartImage : new ig.Image('media/openscreen.jpg'),
	init:function(){		
		ig.input.bind(ig.KEY.SPACE,'LoadGame');
	},
	update:function(){
		if(ig.input.pressed('LoadGame')){
			ig.system.setGame(MyGame);
		}
	},
	draw: function(){
		this.parent();
		this.StartImage.draw(0,0);
	}
});

GameEnd = ig.Game.extend({
	EndImage : new ig.Image('media/gameend.jpg'),
	init:function(){		
		ig.input.bind(ig.KEY.SPACE,'LoadGame');
	},
	update:function(){
		if(ig.input.pressed('LoadGame')){
			
			ig.system.setGame(MyGame);
		}
	},
	draw: function(){
		this.parent();
		this.EndImage.draw(0,0);
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', OpenScreen, 60, 240, 160, 3 );

});
