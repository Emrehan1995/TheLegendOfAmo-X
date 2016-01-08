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
	checkAgainst:ig.Entity.TYPE.B,
	bounciness:0,
	name:"ball",
    damage: 0, //damage of the weapon -> Not in use! The enemy.js Class does determine the damage via the "check:" method.
    currentDamageLevel: 0, //Upgrade Logic, is determined in canon.js
	
	animSheet: new ig.AnimationSheet( 'media/ball_12px.png', 12, 12),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle', 1, [0] );
		//for different stylesheets:
                              switch(this.currentDamageLevel){
                              case 0:
                              break;
                              case 1:
                              break;
                              case 2:
                              break;
                              case 3:
                              break;
                              default:
                              }
//		this.sound = new ig.Sound('media/soundbible.com/Mario_Jumping-Mike_Koenig-989896458.ogg');
//		this.sound.volume = 1;
	},
	
	

	
	update: function()
	{
		this.parent();		
	}
	
                              });

});