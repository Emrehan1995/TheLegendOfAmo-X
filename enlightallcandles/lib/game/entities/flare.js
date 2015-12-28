ig.module(
	'game.entities.flare'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityFlare = ig.Entity.extend({
	
	size: {x:12, y:12},
	
	
	
	alivecounter:0,
	
	animSheet: new ig.AnimationSheet( 'media/flare_12px.png', 12, 12),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [0] );
		
		
	},
	
	

	
	update: function()
	{
		this.alivecounter=this.alivecounter+1;
		
		if (this.alivecounter>15)
		{
			this.kill();
		}
		
		this.parent();		
	}
});

});