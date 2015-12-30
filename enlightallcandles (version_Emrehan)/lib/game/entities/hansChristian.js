ig.module(
	'game.entities.hansChristian'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityHansChristian = ig.Entity.extend({
	
	size: {x:50, y:50},
	collides:ig.Entity.COLLIDES.ACTIVE,
	type:ig.Entity.TYPE.B,
	checkAgainst:ig.Entity.TYPE.A,
    name:"hans",
   
	
	animSheet: new ig.AnimationSheet( 'media/hansChristian.png', 50, 50 ),
    bounciness: 0,
    //friction: {x: 150, y: 0},
    speed: 0.5,
    //flip: false,

                                       
	init: function( x, y, settings ) {
        var xdir = 1;
        var ydir = 1;
        var canon = ig.game.getEntitiesByType( EntityCanon )[0];
		this.addAnim( 'cool!', 1, [0, 1] );
                                       this.parent( x, y, settings );
		
                                       var xtarget = 0;
                                       xtarget = canon.pos.x;
                                       var ytarget = 0;
                                       ytarget = canon.pos.y;
                                       //console.log( 'xtarget = ' + xtarget );
                                       //console.log( 'ytarget = ' + ytarget );
                                       //console.log( 'this.pos.x = ' + this.pos.x);
                                       //console.log( 'this.pos.y = ' + this.pos.y);
                                       
//                                       if ( xtarget < this.pos.x & ytarget > this.pos.y ) {
//                                       //1.Quadrant
//                                       console.log( '1.Quadrant' );
//                                       xdir = -1;
//                                       ydir = 1;
//                                       this.vel.x = xdir;
//                                       this.vel.y = ydir;
//                                       console.log('this.vel.x= ' +  this.vel.x);
//                                       console.log('this.vel.y= ' +  this.vel.y);
//
//                                       
//                                       } else if ( xtarget > this.pos.x & ytarget > this.pos.y) {
//                                       //2.Quadrant
//                                       console.log( '2.Quadrant' );
                                       xdir = 1;
                                       ydir = 1;
                                       this.vel.x = xdir;
                                       this.vel.y = ydir;
                                       
//                                       } else if ( xtarget > this.pos.x & ytarget < this.pos.y) {
//                                       //3.Quadrant
//                                       console.log( '3.Quadrant' );
//                                       xdir = 1;
//                                       ydir = -1;
//                                       this.vel.x = xdir;
//                                       this.vel.y = ydir;
//                                       
//                                       
//                                       }else if( xtarget < this.pos.x & ytarget < this.pos.y) {
//                                       //4.Quadrant
//                                       console.log( '4.Quadrant' );
//                                       xdir = -1;
//                                       ydir = -1;
//                                       this.vel.x = xdir;
//                                       this.vel.y = ydir;
//                                       }else { //spawn on Axis
//                                       this.kill;
//                                       }
//                                       
//                                       
//
//        
        
        //this.vel.x=-200;
		//this.sound = new ig.Sound('media/soundbible.com/Mario_Jumping-Mike_Koenig-989896458.ogg');
		//this.sound.volume = 1;
	},
	
	

	
	update: function()
	{
                                       
      var xdir = 1;
      var ydir = 1;
      var canon = ig.game.getEntitiesByType( EntityCanon )[0];
                                 //enemies shall move to Canon (no handling of Axis!)
                                if ( this.distanceTo( canon ) > 0 ) {
                                       
                                       var xtarget = 0;
                                       xtarget = canon.pos.x;
                                       var ytarget = 0;
                                       ytarget = canon.pos.y;
                                       
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
                                       this.vel.y = this.speed * Math.abs(ytarget - this.pos.y) * ydir;
                                       
                                       
                                } else if ( xtarget > this.pos.x & ytarget > this.pos.y) {
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
                                       
                                       this.pos.x = this.pos.x + 10;
                                       this.pos.y = this.pos.y - 10;
                                       
                                       }
                                       
                                
        this.parent();
                                       
        },

//	handleMovementTrace: function( res ) {
//		if ((res.collision.x)||(res.collision.y))
//		{
//			this.sound.play();
//		}
//		
//		this.parent(res);
	
	check: function(other)
	{
		
		//console.log("this.name="+this.name+" other.name="+other.name);
		//other.kill();
		if (other.name=="ball")
		{
		
			//other.kill();
			this.kill();
			
		}
		
		
	}
});

});