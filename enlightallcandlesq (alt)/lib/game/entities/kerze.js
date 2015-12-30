ig.module(
	'game.entities.kerze'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityKerze = ig.Entity.extend({
	
	size: {x:10, y:16},
	type:ig.Entity.TYPE.A,
	checkAgainst:ig.Entity.TYPE.A,
	burn:false,
	timer:0,
	
	
	animSheet: new ig.AnimationSheet( 'media/kerze.png', 10, 16),	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'out', 1, [0] );
		this.addAnim( 'burning', 0.2, [1,2,3] );
		this.currentAnim = this.anims.out;
		this.sound = new ig.Sound('media/soundbible.com/Dry Fire Gun-SoundBible.com-2053652037.ogg');
		this.sound.volume = 0.2;
	},
	
	
	
	update: function()
	{
		this.parent();
		this.timer=this.timer+1;
	},
	
	check: function(other)
	{
		
		if (this.timer >30)
		{
			this.timer=0;	
		
			if (other.name=="ball")
			{
				this.burn=!this.burn;
				
				this.sound.play();
			
				if (this.burn)
				{
					this.currentAnim = this.anims.burning;
					//console.log("set kerze anim to burning");
				}else
				{
					this.currentAnim = this.anims.out;
					//console.log("set kerze anim to out");
				}
			}
		
		}
		
		
		
	}
	
});

});