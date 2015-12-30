ig.module(
	'game.entities.ball'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityBall = ig.Entity.extend({
	
	size: {x:12, y:12},
	
	collides:ig.Entity.COLLIDES.ACTIVE,
	type:ig.Entity.TYPE.A,
	checkAgainst:ig.Entity.TYPE.A,
	bounciness:1,
	alivecounter:0,
	spawnflare:0,
	name:"ball",
	
	animSheet: new ig.AnimationSheet( 'media/ball_12px.png', 12, 12),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [0] );
		
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
		//Dieser Part muss in die Entität des Arms
		var lpowerup = ig.game.getEntitiesByType(EntityPowerUp);
        if (lpowerup[0] != undefined && this.touches(lpowerup[0])) {
			var lhans = ig.game.getEntitiesByType( EntityHansChristian );
			
            //Ball Richtung Arm
			
			
			//Power Up Richtung Arm
			
			//Nachdem angekommen:
				//Effekt des PowerUps ausführen
				lhans[0].money = lhans[0].money + 50; //Habe einfach mal ein Attribut von Amo-X manipuliert
				console.log(lhans[0].money)
				
				//PowerUp und Arm-Entität killen
				lpowerup[0].kill();
				this.kill();
        }
		
		//console.log("this.name="+this.name+" other.name="+other.name);
		//other.kill();
		if (other.name=="ball")
		{
		
			other.kill();
			this.kill();
			
		}
		
		
	}
});

});