ig.module(
	'game.entities.canon'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityCanon = ig.Entity.extend({
	
	size: {x:30, y:30},
    //type:ig.Entity.TYPE.A,
	//checkAgainst:ig.Entity.TYPE.B,
    currentDamageLevel: 0, //main.js just upgrades this attribute because the ball instances depend on this attribute
    name: 'canon',
    reloadPeriod: 0.175,
    shootTimer: new ig.Timer(0),

    //own defined properties
    font: new ig.Font('media/04b03.font.png'),
    message : 'No Ammunition left!',
	
	animSheet: new ig.AnimationSheet( 'media/canons.png', 120, 20),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
                              
		this.sound = new ig.Sound('media/soundbible.com/Glass_Break-stephan_schutze-958181291.ogg');
		this.sound.volume = 1;
                              
                           
                               
                               this.addAnim( 'level0', 1, [0] );
                               this.addAnim( 'level1', 1, [1] );
                               this.addAnim( 'level2', 1, [2] );
                               this.addAnim( 'level3', 1, [3] );
                               this.currentAnim=this.anims.level0;

                                                              // Set a reference to the player on the game instance
                               ig.game.canon = this;
   	},
	
                               giveCoins: function( amount ) {
                               // Custom function, called from enemies
                               this.coins += amount;
                               },
                               
                               reduceHealth: function( amount ) {
                               // Custom function, called from enemies
                               this.health = this.health - amount;
                               },
	update: function()
	{
                               //console.log('Canon ' + this.currentDamageLevel);

		if (ig.game.levelDone==false)
		{
             //this.currentAnim.angle=this.currentAnim.angle
                   //   console.log(ig.input.mouse.x)
                   //   console.log(ig.input.mouse.y)
                               
                var mx = (ig.input.mouse.x + ig.game.screen.x); //Figures out the x coord of the mouse in the entire world
                var my = (ig.input.mouse.y + ig.game.screen.y); //Figures out the y coord of the mouse in the entire world
                var r = Math.atan2(my-(this.pos.y+15), mx-(this.pos.x+60));
                var r = Math.atan2(my-(this.pos.y), mx-(this.pos.x));//Gives angle in radians from player's location to the mouse location, assuming directly right is 0
                this.currentAnim.angle=r;
                
                if( ig.input.pressed('fire') )//instead of state use pressed for single events
                {
				     var amox = ig.game.getEntitiesByType( EntityAmox )[0];
                    
                               
                            if ((amox.ammunition > 0) & (this.shootTimer.delta()>0))
                               {
                                    var angle=r;
                               
                               var newBall=ig.game.spawnEntity('EntityBall', this.pos.x + 40 + Math.cos(angle)*80, this.pos.y+Math.sin(angle)*80, {currentDamageLevel:this.currentDamageLevel} );
                               
                                    newBall.vel.x=Math.cos(angle)*100;
                                    newBall.vel.y=Math.sin(angle)*100;
                                    newBall.currentAnim.angle= angle;
                               
                                    amox.reduceAmmunition();
                                    this.shootTimer.set(this.reloadPeriod);
                               }else{
                               console.log('no ammo left!');
                               }
				
			     }
           
		}
                               
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
                               break;
                               
                               }

                               
		this.parent();
		
	}
            
        
//                               
//    draw: function() {
//        this.parent();
//            var amox = ig.game.getEntitiesByType( EntityAmox )[0];
//            if(amox.ammunition < 1) { //message: no ammunition
//        ig.game.font.draw(this.message, ig.system.width/2, ig.system.height/2,ig.Font.ALIGN.CENTER);
//          }
//    },
//                               

    
                               
//	check: function(other)
//	{
//		if (ig.game.levelDone==false /*&& other.alivecounter>17*/)
//		{
//			//other.kill();
//            //this.health--;
//            //console.log(this.health);
//			this.damage=this.damage+1;
//                               
//			if (this.damage<9)
//			{
//				var angle=this.currentAnim.angle;
//				eval("this.currentAnim=this.anims.idle"+this.damage); //change animation
//				this.currentAnim.angle=angle;
//				this.sound.play();
//			}else
//			{
//				this.damage=0; //dead
//				ig.game.startLevel(ig.game.level);
//			}
			
//			
//		}
//		
//	}
});

});