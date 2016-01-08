ig.module(
	'game.entities.meteorid'
)
.requires(
    'game.entities.enemy'

)
.defines(function(){

EntityMeteorid = EntityEnemy.extend({
	
	size: {x:50, y:50},
	collides:ig.Entity.COLLIDES.ACTIVE,
	type:ig.Entity.TYPE.B,
    health: 2,
	checkAgainst:ig.Entity.TYPE.A,
    initial: true,
    name:"meteorid",
   
	animSheet: new ig.AnimationSheet( 'media/meteorid.png', 80, 40 ),
    speed: 90,
                                    
	init: function( x, y, settings ) {
        var xdir = 1;
        var ydir = 1;
        this.addAnim( 'burning', 0.1, [0, 1, 2] );
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
                                    
            //if( this.initial == true || this.vel.x > 50 || this.vel.y > 50){
                  //  console.log('test');
                    //this.initial = false;
                    this.radiusMoveTowardsAmox();
           // }
                                    
            var amox = ig.game.getEntitiesByType( EntityAmox )[0];
                                    var mx = amox.pos.x;
                                    var my = amox.pos.y;
                                    var r = Math.atan2(my-this.pos.y, mx-this.pos.x);
                                    this.currentAnim.angle=r;
                                    },
                                    
        kill: function(){
           this.parent(3); //how many coins per Kill? --> 5!
                                    }
	});

});