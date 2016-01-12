ig.module(
	'game.entities.gripper'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityGripper = ig.Entity.extend({
	
	size: {x:30, y:30},
    type:ig.Entity.TYPE.A,
	checkAgainst:ig.Entity.TYPE.B,
	health:3,
    maxhealth: 3,
    name: 'gripper',
                   
    //own defined properties
    ammunition: 10,
    font: new ig.Font('media/04b03.font.png'),
    damage: 0, //damage TAKEN!
    message : 'No Ammunition left!',
    coins: 5,
    duration: 5,
    currentGripperLevel: 0,
	animSheet: new ig.AnimationSheet( 'media/grippers.png', 120, 30),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
                                 this.addAnim( 'level0', 1, [0] );
                                 this.addAnim( 'level1', 1, [1] );
                                 this.addAnim( 'level2', 1, [2] );
                                 this.addAnim( 'level3', 1, [3] );

        this.currentAnim=this.anims.level0;
		
		this.sound = new ig.Sound('media/soundbible.com/Glass_Break-stephan_schutze-958181291.ogg');
		this.sound.volume = 1;
                               // Set a reference to the player on the game instance
                               ig.game.gripper = this;

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
		
		if (ig.game.levelDone==false)
		{
             //this.currentAnim.angle=this.currentAnim.angle
                   //   console.log(ig.input.mouse.x)
                   //   console.log(ig.input.mouse.y)
                               
                var mx = (ig.input.mouse.x + ig.game.screen.x); //Figures out the x coord of the mouse in the entire world
                var my = (ig.input.mouse.y + ig.game.screen.y); //Figures out the y coord of the mouse in the entire world
                var r = Math.atan2(my-this.pos.y, mx-this.pos.x); //Gives angle in radians from player's location to the mouse location, assuming directly right is 0
                this.currentAnim.angle=r;
                
                                 switch(this.currentGripperLevel){
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

           
                                 if( ig.input.pressed('grip') )//instead of state use pressed for single events
                                 {
                                 
                                 var angle=this.currentAnim.angle;
                                 
                                 //Erstelle Arm
                                 var newArm = new Array();
                                 newArm[0]=ig.game.spawnEntity('EntityArm', ig.input.mouse.x, ig.input.mouse.y, null );
                                 newArm[0].vel.x=0;
                                 newArm[0].vel.y=0;
                                 
                                 var distanz=this.distanceTo(newArm[0]);
                                 newArm[0].kill();
                                 
                                 for( var i = 0; i < distanz; i++) {
                                 var dies = this;
                                 var create = function(i) {
                                 return function() {
                                 
                                 
                                 newArm[i]=ig.game.spawnEntity('EntityArm', dies.pos.x+5+Math.cos(angle)*i, dies.pos.y+5+Math.sin(angle)*i, null );
                                 
                                 //Bewege Hand
                                 var hand = ig.game.getEntitiesByType( EntityHand );
                                 hand[0].pos.x = dies.pos.x+20+Math.cos(angle)*i*1.1;
                                 hand[0].pos.y = dies.pos.y+20+Math.sin(angle)*i*1.1;
                                 }
                                 };
                                 setTimeout(create(i), this.duration * i);
                                 }
                                 
                                 //Lösche Arm
                                 setTimeout(function() {
                                            var oldArm = ig.game.getEntitiesByType( EntityArm );
                                            for( var i = oldArm.length-1; i >= 0 ; i--) {
                                            var tmp = oldArm.length - 1 - i;
                                            var clear = function(i) {
                                            return function() {
                                            
                                            oldArm[i].kill();
                                    
                                            //Bewege Hand
                                            var handpos = function() {
                                            return function() {
                                            var hand = ig.game.getEntitiesByType( EntityHand );
                                            hand[0].pos.x = dies.pos.x+20+Math.cos(angle)*i;
                                            hand[0].pos.y = dies.pos.y+20+Math.sin(angle)*i;
                                            }
                                            };
                                            setTimeout(handpos(), this.duration * tmp);
                                            }
                                            };
                                            setTimeout(clear(i), this.duration * tmp);
                                            }
                                            }, (this.duration + 0) * i);
                                 
                                 
                                 
                                 }
                                 
		}
                                 
                                 
                               
		this.parent();
		
	},
            
        
                               
    draw: function() {
        this.parent();
            if(this.ammunition < 1) { //message: no ammunition
        ig.game.font.draw(this.message, ig.system.width/2, ig.system.height/2,ig.Font.ALIGN.CENTER);
          }
    },
                               

    
                               
	check: function(other)
	{
		if (ig.game.levelDone==false /*&& other.alivecounter>17*/)
		{
			//other.kill();
            //this.health--;
            //console.log(this.health);
			this.damage=this.damage+1;
                               
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
			
		}
		
	}
});

});