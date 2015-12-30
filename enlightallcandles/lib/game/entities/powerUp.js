ig.module(
	'game.entities.powerUp'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityPowerUp = ig.Entity.extend({
	
	collides: ig.Entity.COLLIDES.FIXED,
	size: {x:20, y:20},
	type:ig.Entity.TYPE.A,
	checkAgainst:ig.Entity.TYPE.A,
	burn:false,
	timer:0,
	
	
	animSheet: new ig.AnimationSheet( 'media/powerup.png', 20, 20),	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'in', 1, [0] );
	},
	
	
	
	update: function()
	{
		this.parent();
		
	},
	
	check: function(other)
	{
		
		if (0 == 1)
		{
			this.kill();
			
		}
	}
	
});

});