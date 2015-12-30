ig.module(
	'game.entities.hansChristian'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityHansChristian = ig.Entity.extend({
	
	size: {x:50, y:50},
	
	collides:ig.Entity.COLLIDES.ACTIVE,
	type:ig.Entity.TYPE.A,
	checkAgainst:ig.Entity.TYPE.A,
	alivecounter:0,
	spawnflare:0,
	name:"hans",
	
	animSheet: new ig.AnimationSheet( 'media/hansChristian.png', 50, 50),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'er lebt', 1, [0] );
		
		this.vel.x=200;
		this.sound = new ig.Sound('media/soundbible.com/Mario_Jumping-Mike_Koenig-989896458.ogg');
		this.sound.volume = 1;
	},
	
	

	
	update: function()
	{
		this.alivecounter=this.alivecounter+1;
		
		this.spawnflare=this.spawnflare+1;
		if (this.spawnflare>2)
		{
			this.spawnflare=0;
			ig.game.spawnEntity('EntityFlare', this.pos.x, this.pos.y, null );
		}
		
		this.parent();		
	},
	
	handleMovementTrace: function( res ) {
		if ((res.collision.x)||(res.collision.y))
		{
			this.sound.play();
		}
		
		
		this.parent(res); 
	},
	
	check: function(other)
	{
		
		//console.log("this.name="+this.name+" other.name="+other.name);
		//other.kill();
		if (other.name=="ball")
		{
		
			//other.kill();
			this.kill();
			
		}
		
		
	}
});

});