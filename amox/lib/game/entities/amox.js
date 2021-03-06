ig.module(
	'game.entities.amox'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityAmox = ig.Entity.extend({
	
	size: {x:30, y:30},
    type:ig.Entity.TYPE.A,
	checkAgainst:ig.Entity.TYPE.B,
	health:3,
    maxHealth: 3,
    ignorePause: true,
    name: 'amox',
    

                   
    //own defined properties
    ammunition: 30,
    currentArmorLevel: 3, //through Upgrade
    armor: 3, //current Armor
    //canon: ig.game.getEntitiesByType( EntityCanon )[0],
    //GripperHere
    font: new ig.Font('media/04b03.font.png'),
    damage: 0, //damage TAKEN!
    message : 'No Ammunition left!',
    deathMessage : 'You are Dead!',
    coins: 0,
	
	animSheet: new ig.AnimationSheet( 'media/AmoxBodies.png', 70, 130),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
        //this.armor = currentArmorLevel;
		this.addAnim( 'level0', 1, [0] );
        this.addAnim( 'level1', 1, [1] );
        this.addAnim( 'level2', 1, [2] );
        this.addAnim( 'level3', 1, [3] );
                              
		this.currentAnim=this.anims.level0;
        this.armor = this.currentArmorLevel;
		this.sound = new ig.Sound('media/soundbible.com/Glass_Break-stephan_schutze-958181291.ogg');
		this.sound.volume = 1;
                               // Set a reference to the player on the game instance
                               ig.game.amox = this;

	},
	
                               giveCoins: function( amount ) {
                               // Custom function, called from enemies
                               this.coins += amount;
                               },
                               
                               reduceHealth: function( amount ) {
                               // Custom function, called from enemies
                              if (this.armor > 0){
                              this.armor = this.armor - amount;
                              }else{
                               this.health = this.health - amount;
                              
                              } },
                              
                              reduceAmmunition: function() {
                              // Custom function, called from enemies
                              this.ammunition--;
                              //console.log(this.ammunition);
                              },
                              
                              increaseAmmunition: function(i)
                              {
                              if((this.ammunition + i) <= 30)
                              this.ammunition += i;
                              else
                              this.ammunition = 30;
                              },

                              

	update: function()
	{
                              
		this.parent();
                              switch(this.currentArmorLevel){
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
		
	},
            
        
                               
    draw: function() {
        this.parent();
            if(this.ammunition < 1) { //message: no ammunition
        ig.game.font.draw(this.message, ig.system.width/2, ig.system.height/2,ig.Font.ALIGN.CENTER);
          }
        if(this.health < 1){
            ig.game.font.draw(this.deathMessage, ig.system.width/2, ig.system.height/2,ig.Font.ALIGN.CENTER);
         }
    },
                              
                               
	check: function(other)
	{
                             this.reduceHealth(1);
                             other.kill();
        }
		
});

});