ig.module(
	'game.entities.canon'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityCanon = ig.Entity.extend({
	
	size: {x:30, y:30},
	checkAgainst:ig.Entity.TYPE.A,
	damage:0,
	
	
	animSheet: new ig.AnimationSheet( 'media/canon_damage.png', 40, 40),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle0', 1, [0] );
		this.addAnim( 'idle1', 1, [1] );
		this.addAnim( 'idle2', 1, [2] );
		this.addAnim( 'idle3', 1, [3] );
		this.addAnim( 'idle4', 1, [4] );
		this.addAnim( 'idle5', 1, [5] );
		this.addAnim( 'idle6', 1, [6] );
		this.addAnim( 'idle7', 1, [7] );
		this.addAnim( 'idle8', 1, [8] );
		this.currentAnim=this.anims.idle0;
		
		this.sound = new ig.Sound('media/soundbible.com/Glass_Break-stephan_schutze-958181291.ogg');
		this.sound.volume = 1;
	},
	
	

	
	update: function()
	{
		
		if (ig.game.levelDone==false)
		{
             //this.currentAnim.angle=this.currentAnim.angle
                   //   console.log(ig.input.mouse.x)
                   //   console.log(ig.input.mouse.y)
                               
                var mx = (ig.input.mouse.x + ig.game.screen.x); //Figures out the x coord of the mouse in the entire world
                var my = (ig.input.mouse.y + ig.game.screen.y); //Figures out the y coord of the mouse in the entire world
                var r = Math.atan2(my-this.pos.y, mx-this.pos.x); //Gives angle in radians from player's location to the mouse location, assuming directly right is 0
                this.currentAnim.angle=r;
//                               
//			if( ig.input.state('right') )
//			{
//				
//				this.currentAnim.angle=this.currentAnim.angle+0.1;
//			}else
//			
//			if( ig.input.state('left') )
//			{
//				
//				this.currentAnim.angle=this.currentAnim.angle-0.1;
//			}
			
			if( ig.input.pressed('fire') )//instead of state use pressed for single events
			{
				
				var angle=this.currentAnim.angle;
				
				var newBall=ig.game.spawnEntity('EntityBall', this.pos.x+20+Math.cos(angle)*20, this.pos.y+20+Math.sin(angle)*20, null );
				newBall.vel.x=Math.cos(angle)*100;
				newBall.vel.y=Math.sin(angle)*100;
				
			}
		}
		this.parent();
		
	},
	check: function(other)
	{
		if (ig.game.levelDone==false && other.alivecounter>17)
		{
			other.kill();
			this.damage=this.damage+1;
			if (this.damage<9)
			{
				var angle=this.currentAnim.angle;
				eval("this.currentAnim=this.anims.idle"+this.damage);
				this.currentAnim.angle=angle;
				this.sound.play();
			}else
			{
				this.damage=0;
				ig.game.startLevel(ig.game.level);
			}
			
			console.log(this.health);
		}
		
		
	}
});

});