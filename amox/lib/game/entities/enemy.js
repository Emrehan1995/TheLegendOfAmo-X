ig.module(
	'game.entities.enemy'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityEnemy = ig.Entity.extend({
	
	size: {x:50, y:50},
	collides:ig.Entity.COLLIDES.ACTIVE,
	type:ig.Entity.TYPE.B,
	checkAgainst:ig.Entity.TYPE.A,
    name:"enemy",
    initial: true, //"help"-variable for move Method (reference to asteroid)
    health: 1,
	
	animSheet: new ig.AnimationSheet( 'media/hansChristian.png', 50, 50 ),
    maxVel: { x: 50, y: 50 },
    speed: 25,
    
    //for the freeze powerup
    stop: false,
    //for killmethod of UFO
    atomb: false,


                                       
	init: function( x, y, settings ) {
        var xdir = 1;
        var ydir = 1;
		this.addAnim( 'cool!', 1, [0, 1] );
        this.parent( x, y, settings );
        //var amox = ig.game.getEntitiesByType( EntityAmox )[0];
                                       
        var xtarget = 0;
        xtarget = ig.system.width/2;
        var ytarget = 0;
        ytarget = ig.system.height/2;
        
        //make them move!
        xdir = 1;
        ydir = 1;
        this.vel.x = xdir;
        this.vel.y = ydir;
                               
		//this.sound = new ig.Sound('media/soundbible.com/Mario_Jumping-Mike_Koenig-989896458.ogg');
		//this.sound.volume = 1;
	},
	
	

	
	update: function()
	{
        this.parent();
                                       
        },
                               radiusMoveTowardsAmox: function()
                               {
                               // Evalute targets and move towards them
                               var oldDistance = 0;
                               var target = ig.game.getEntitiesByType( EntityAmox )[0];
                               if( target ) {
                               oldDistance = this.distanceTo(target);
                               
                               var angle = this.angleTo( target );
                               this.vel.x = Math.cos(angle) * this.speed;
                               this.vel.y = Math.sin(angle) * this.speed;
                               
//                               this.currentAnim = this.anims.walk;
//                               this.currentAnim.angle = angle;
                               }
                               
                               
                               if(this.stop) {
                               var x = this.vel.x;
                               var y = this.vel.y;
                               
                               this.vel.x = 0;
                               this.vel.y = 0;
                               
                               var dies = this;
                               setTimeout(function() {
                                          
                                          dies.vel.x = x;
                                          dies.vel.y = y;
                                          this.stop = false;
                                          }, 3000); 
                               }

                               
                               },
                               
                               freezeEnemy: function() {
                               this.stop = true;
                               },

                               
    //obsolete method - not in use anymore
    moveTowardsAmox: function(){ //include in the update method of all classes! except UFO
                               var xdir = 1;
                               var ydir = 1;
                               var amox = ig.game.getEntitiesByType( EntityAmox )[0];
                               //enemies shall move to Amo-X (no handling of Axis!)
                               if ( this.distanceTo( amox ) > 0 ) {
                               
                               var xtarget = 0;
                               xtarget = amox.pos.x;
                               var ytarget = 0;
                               ytarget = amox.pos.y;
                               
                               //console.log( 'Distance: ' + this.distanceTo( canon )  );
                               
                               }
                               //console.log( 'xtarget = ' + xtarget );
                               //                                       console.log( 'ytarget = ' + ytarget );
                               //                                       console.log( 'this.pos.x = ' + this.pos.x);
                               //                                       console.log( 'this.pos.y = ' + this.pos.y);
                               if ( xtarget < this.pos.x & ytarget > this.pos.y ) {
                               //1.Quadrant
                               //console.log( '1.Quadrant' );
                               xdir = -1;
                               ydir = 1;
                               
                               this.vel.x = this.speed * Math.abs(this.pos.x - xtarget) * xdir;
                               this.vel.y = this.speed * Math.abs(ytarget -this.pos.y) * ydir;
                               //                               if (this.vel.x < 100){
                               //                               this.vel.x += 50;
                               //                               }
                               //
                               //                               if (this.vel.y < 100){
                               //                               this.vel.y += 50;
                               //                               }
                               
                               }else if ( xtarget > this.pos.x & ytarget > this.pos.y) {
                               //2.Quadrant
                               //console.log( '2.Quadrant' );
                               xdir = 1;
                               ydir = 1;
                               this.vel.x = this.speed * Math.abs(xtarget - this.pos.x) * xdir;
                               this.vel.y = this.speed * Math.abs(ytarget - this.pos.y) * ydir;
                               } else if ( xtarget > this.pos.x & ytarget < this.pos.y) {
                               //3.Quadrant
                               //console.log( '3.Quadrant' );
                               xdir = 1;
                               ydir = -1;
                               this.vel.x = this.speed * Math.abs(xtarget - this.pos.x ) * xdir;
                               this.vel.y = this.speed * Math.abs(this.pos.y - ytarget) * ydir;
                               
                               }else if( xtarget < this.pos.x & ytarget < this.pos.y) {
                               //4.Quadrant
                               //console.log( '4.Quadrant' );
                               xdir = -1;
                               ydir = -1;
                               this.vel.x = this.speed * Math.abs(this.pos.x - xtarget) * xdir;
                               this.vel.y = this.speed * Math.abs(this.pos.y - ytarget) * ydir;
                               }else{
                               console.log('wird das hier langsamer??');
                               this.pos.x = this.pos.x + 10;
                               this.pos.y = this.pos.y - 10;
                               
                               }
                               
        },

//	handleMovementTrace: function( res ) {
//		if ((res.collision.x)||(res.collision.y))
//		{
//			this.sound.play();
//		}
//		
//		this.parent(res);
	
        check: function(other){
                               if (other.name=="ball")
                               {
                               //console.log('erkennung: es ist ein ball');
                               
                               //Level of Weapon??
                               switch(other.currentDamageLevel) {
                               case 0:
                               this.receiveDamage(1); //damageOfBall?
                               break;
                               case 1:
                               this.receiveDamage(2);
                               break;
                               case 2:
                               this.receiveDamage(3);
                               case 3:
                               this.receiveDamage(4);
                               default:
                               console.log('Hier sollte ich nicht sein #enemyjs');
                               }
                               
                               other.kill();
                               }},
                               
                               
        kill: function(coins){ //parameterübergabe
                               this.parent();
                               var amox = ig.game.getEntitiesByType( EntityAmox )[0];
                               amox.giveCoins(coins);
                               }
                });

});