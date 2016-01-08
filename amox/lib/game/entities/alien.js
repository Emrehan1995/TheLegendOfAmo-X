ig.module(
	'game.entities.alien'
)
.requires(
    'game.entities.enemy'

)
.defines(function(){

EntityAlien = EntityEnemy.extend({
	
	size: {x:50, y:50},
	collides:ig.Entity.COLLIDES.ACTIVE,
	type:ig.Entity.TYPE.B,
	checkAgainst:ig.Entity.TYPE.A,
    name:"alien",
    health: 1,
    initial: true,
	animSheet: new ig.AnimationSheet( 'media/alien.png', 30, 30 ),
    bounciness: 0,
    speed: 40,
                                 
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
//                                 if( this.initial == true || this.vel.x > 50 || this.vel.y > 50){
//                                 console.log('test');
//                                 this.initial = false;
                                 this.radiusMoveTowardsAmox();
//                                 }

            },
                                 

                                 
    kill: function(){
        this.parent(2); //how many coins per Kill? --> 5!
    }
});

});