ig.module(
	'game.entities.asteroid'
)
.requires(
	'game.entities.enemy'
)
.defines(function(){

EntityAsteroid = EntityEnemy.extend({
	
	size: {x:50, y:50},
	collides:ig.Entity.COLLIDES.ACTIVE,
	type:ig.Entity.TYPE.B,
	checkAgainst:ig.Entity.TYPE.A,
    health: 3,
    name:"asteroid",
    initial: true,
	animSheet: new ig.AnimationSheet( 'media/asteroid.png', 60, 60 ),
    bounciness: 0,
    speed: 30,
                                       
	init: function( x, y, settings ) {
        var xdir = 1;
        var ydir = 1;
		this.addAnim( 'cool!', 1, [0] );
        this.parent( x, y, settings );
        //var amox = ig.game.getEntitiesByType( EntityAmox )[0];
                                       
        var xtarget = 0;
                                       xtarget = ig.system.width/2;
        var ytarget = 0;
        ytarget = ig.system.height/2;
          
        //make them move
        xdir = 1;
        ydir = 1;
        this.vel.x = xdir;
        this.vel.y = ydir;
        

	},
        update: function(){
            this.parent();
            this.radiusMoveTowardsAmox();
//            if( this.initial == true || this.vel.x > 50 || this.vel.y > 50){
//            this.initial = false;
//            this.moveTowardsAmox();
//            }
                                    
            this.currentAnim.angle+=0.01;
        },
                                
            kill: function(){
                    ig.game.spawnEntity( EntityExplosion2, this.pos.x + (this.size.x/2), this.pos.y + (this.size.y/2));
                    this.parent(5); //how many coins per Kill? --> 5!
                                    }
});

});