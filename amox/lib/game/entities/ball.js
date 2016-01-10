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
	
	animSheet: new ig.AnimationSheet( 'media/shots.png', 40, 20),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'level0', 0.1, [0, 1, 2] );
        this.addAnim( 'level1', 0.1, [3, 4, 5] );
        this.addAnim( 'level2', 0.1, [6, 7, 8] );
        this.addAnim( 'level3', 0.1, [9, 10, 11] );
        this.currentAnim=this.anims.level0;
        //for different stylesheets:
                              switch(this.currentDamageLevel){
                              case 0:
                              this.currentAnim=this.anims.level0;
                              break;
                              case 1:
                              this.currentAnim=this.anims.level1;
                              break;
                              case 2:
                              this.currentAnim=this.anims.level2;
                              break;
                              case 3:
                              this.currentAnim=this.anims.level3;
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