ig.module(
	'game.entities.ufo'
)
.requires(
    'game.entities.enemy'

)
.defines(function(){

EntityUfo = EntityEnemy.extend({
	
	size: {x:50, y:50},
	collides:ig.Entity.COLLIDES.ACTIVE,
	type:ig.Entity.TYPE.B,
	checkAgainst:ig.Entity.TYPE.A,
    health: 4,
    name:"ufo",
	animSheet: new ig.AnimationSheet( 'media/ufo.png', 100, 50 ),
    bounciness: 0,
    speed: 90,
    timer: new ig.Timer(),
    init: true, //help variable for the timer
    killed: true, //true --> killed by player, false --> timer

                                       
	init: function( x, y, settings ) {
        var xdir = 1;
        var ydir = 1;
        this.addAnim( 'idle', 1, [0] );
        this.addAnim( 'blink', 0.3, [0,1] );
        this.currentAnim = this.anims.idle;
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
                               
                               freezeEnemy: function() {
                               this.stop = true;
                               if(this.timer<0){
                               this.init = false;
                               }
                               },
        
                               update: function()
                               {
                               var amox = ig.game.getEntitiesByType( EntityAmox )[0];
                               this.parent();
                               
                               if ( this.distanceTo( amox ) > 230 ) {
                               this.radiusMoveTowardsAmox();
                               
                               }else{ //stand still if a specific distance is reached
                               this.vel.x = 0;
                               this.vel.y = 0;
                               this.setTimer();
                               
                                    if (this.timer.delta() > 0){ //during the countdown
                                    console.log('läuft...');
                                    ig.game.spawnEntity('EntityAlien', this.pos.x+20, this.pos.y+20, null );
                                    ig.game.spawnEntity('EntityAlien', this.pos.x+20, this.pos.y+20, null );
                                    ig.game.spawnEntity('EntityAlien', this.pos.x+20, this.pos.y+20, null );
                                    ig.game.spawnEntity('EntityAlien', this.pos.x+20, this.pos.y+20, null );
                                    this.killed = false; //killed by timer
                                    this.kill();
                                    }
                               
                               }
                                                              },
                               setTimer: function(){
                               if (this.init){
                               console.log('timer wird gesetzt');
                               this.currentAnim = this.anims.blink;
                               this.timer.set(4); // = -4   !
                               this.init = false}
                               
                               },
     
        kill: function(){
                               if(this.killed == true & !this.atomb){
                               ig.game.spawnEntity('EntityAlien', this.pos.x+20, this.pos.y+20, null );
                               ig.game.spawnEntity('EntityAlien', this.pos.x+20, this.pos.y+20, null );
                               this.parent(10); //how many coins per Kill? --> 5!
                               }else{
                                this.parent(10); //how many coins per Kill? --> 5!
                               }
                               
        }
                               
        
	});

});