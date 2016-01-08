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
	
	animSheet: new ig.AnimationSheet( 'media/amox.png', 50, 50),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
        //this.armor = currentArmorLevel;
		this.addAnim( 'idle0', 1, [0] );
		this.currentAnim=this.anims.idle0;
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

	update: function()
	{
                              
		this.parent();
		
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