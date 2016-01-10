ig.module( 
	'game.main' 
)
.requires(
    //Plugins
    'plugins.button',
    'plugins.button2', //button while playing
    'plugins.balken',
    'plugins.pause',
          
    //Levels
	'impact.game',
	'impact.font',
	'game.levels.first',
	'game.levels.second',
	'game.levels.third',
	'game.levels.fourth',
          
          
    //add Enemy Entities:
    'game.entities.enemy',
    'game.entities.meteorid',
    'game.entities.asteroid',
    'game.entities.alien',
    'game.entities.ufo',
          
    //add Player Entities
    'game.entities.canon',
    'game.entities.amox',
    'game.entities.gripper',
	'game.entities.ball',
    'game.entities.flare'
)
.defines(function(){

//Helpful global variables
ig.global.coins = 9999;
ig.global.level = 1;
ig.global.levelCanon = 1;
ig.global.levelGripper = 1;
ig.global.levelArmor = 1;
ig.global.pauseButtonPressed = false;
         

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	DoneImage : new ig.Image('media/done.png'),
	time2spawn:0,
	levelDone:false,
    // HUD icons
    heartFull: new ig.Image( 'media/heart-full.png' ),
    heartEmpty: new ig.Image( 'media/heart-empty.png' ),
    armorFull: new ig.Image( 'media/armor-full.png' ),
    armorBroken: new ig.Image( 'media/armor-broken.png' ),
    coinIcon: new ig.Image( 'media/coin.png' ),
    ammoIcon: new ig.Image( 'media/ammo.png' ),
    
	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.bind(ig.KEY.MOUSE2,'ire'); //4GripperArm
        ig.input.bind(ig.KEY.MOUSE1,'fire');
        ig.input.bind(ig.KEY.SPACE,'fire');
        //ig.input.bind( ig.KEY.MOUSE1, 'click2' );
        //this.loadLevel(LevelFirst);
        this.startLevel(ig.global.level);
        if(this.amox != null){
        this.amox.coins = ig.global.coins;
                        
        //setLevels
//        this.amox = ig.global.levelCanon = 0;
//        this.amox = ig.global.levelGripper = 0;
        this.amox.currentArmorLevel = ig.global.levelArmor;
        this.amox.armor = ig.global.levelArmor;
                        
        }
                        
                        if(this.canon != null){
                        this.canon.currentDamageLevel = ig.global.levelCanon;
                        
                        }
                        
                        if(this.gripper != null){
                        this.gripper.currentGripperLevel = ig.global.levelGripper;
                        }
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		
		this.parent();
        var enemies=this.getEntitiesByType( EntityEnemy );
        var all_dead=false;
        
        
        if (enemies[0]==null)
        {
        all_dead = true;
        }
                        
        if (all_dead == true && this.levelDone==false){
                        console.log("bind space to nextLevel");
                        this.levelDone=true;
                        
                        if(this.amox != null){
                        ig.global.coins = this.amox.coins;
                        }
                        ig.input.bind(ig.KEY.SPACE,'NextLevel');
        }
                        //console.log('Mouse X = ' + ig.input.mouse.x);
                        //console.log('Mouse Y = ' + ig.input.mouse.y);
                        
                        //Specify clickable Area of pause Button!
                        if ( ig.input.state('fire' ) && (ig.input.mouse.x > 700 ) &  (ig.input.mouse.y < 70) ) {
                        this.togglePause();
                        //idea: getEntitiesByName('Pausebutton') & this current Animation oder ig.spawn new entity or in "onpressed" method of button
                        }
                
            
        if(ig.input.pressed('NextLevel')){
			this.levelDone=false
			ig.global.level=ig.global.level+1;
			console.log("start the next level");
			this.startLevel(ig.global.level);
		}
                        
	},
	
	startLevel:function(aLevel)
	{
		
			switch (aLevel) {
                case 1: this.loadLevel(LevelFirst);
                    break;
                case 2: ig.system.setGame(UpdateScreen);
                    break;
				case 3:	ig.input.bind(ig.KEY.SPACE,'fire');this.loadLevel(LevelSecond);
					break;
                case 4: ig.system.setGame(UpdateScreen);
                    break;
				case 5:	ig.input.bind(ig.KEY.SPACE,'fire');this.loadLevel(LevelThird);
					break;
                case 6: ig.system.setGame(UpdateScreen);
                    break;
				case 7:	ig.input.bind(ig.KEY.SPACE,'fire');this.loadLevel(LevelFourth);
					break;
				case 8: ig.system.setGame(GameEnd);
					break;
                default: ig.system.setGame(OpenScreen);
                        ig.global.level=1;
                    break;

			}
		
	},
	
                
    draw: function() {
                        // Call the parent implementation to draw all Entities and BackgroundMaps
                        this.parent();
                        

                        if (this.levelDone)
                        {
                        this.DoneImage.draw(0,0);
                        }
                        // Draw the heart and number of coins in the upper left corner.
                        // 'this.player' is set by the player's init method
                        
                        if(this.amox != null){
                        var x = 16;
                        var y = 16;
                        
                        for( var i = 0; i < this.amox.maxHealth; i++ ) {
                        
                        // Full or empty heart?
                        if( this.amox.health > i ) {
                        this.heartFull.draw( x, y );
                        }
                        else {
                        this.heartEmpty.draw( x, y );
                        }
                        x += this.heartEmpty.width + 8;
                           }
                        
                        
                        //Armor!
                        for( var i = 0; i < this.amox.currentArmorLevel; i++ ) {
                        //Shield displayed?
                        if( this.amox.armor > i ) {
                        this.armorFull.draw( x, y );
                        }
                        else {
                        this.armorBroken.draw( x, y );
                        }
                        x += this.armorFull.width + 8;
                            }
                        
                        // We only want to draw the 0th tile of coin sprite-sheet
                        x += 48;
                        this.coinIcon.drawTile( x, y+6, 0, 36 );
                        x += 42;
                        this.font.draw( 'x ' + this.amox.coins, x, y+10 )
                        
                        // We only want to draw the 0th tile of ammo sprite-sheet
                        x += 100;
                        this.ammoIcon.drawTile( x, y+6, 0, 36 );
                        x += 42;
                        this.font.draw( 'x ' + this.amox.ammunition, x, y+10 )
                        
                        }
                        
                        // Draw touch buttons, if we have any
                        if( window.myTouchButtons ) {
                        window.myTouchButtons.draw(); 
                        }
                        //Edit Buttons
                        var btnWidth = 50;
                        var btnHeight  = 50;
                        var textPosX = 25;
                        var textPosY  = 15;
                        
                        //Mute Button
                        ig.game.spawnEntity( Button2, ig.system.width - 175, 10, {
                                            font: new ig.Font( 'media/04b03.font.png' ),
                                            text: [ 'M' ],
                                            textPos: { x: textPosX, y: textPosY },
                                            textAlign: ig.Font.ALIGN.CENTER,
                                            size: { x: btnWidth, y: btnHeight },
                                            animSheet: new ig.AnimationSheet( 'media/button.png', btnWidth, btnHeight ),
                                            
                                            pressedDown: function() {
                                            },
                                            pressed: function() {
                                            },
                                            pressedUp: function() {
                                            ig.system.setGame(MyGame);
                                            }
                                            
                                            });
                        //Pause Button
                        ig.game.spawnEntity( Button2, ig.system.width - 100, 10, {
                                            font: new ig.Font( 'media/04b03.font.png' ),
                                            text: [ 'II' ],
                                            textPos: { x: textPosX, y: textPosY },
                                            textAlign: ig.Font.ALIGN.CENTER,
                                            size: { x: btnWidth, y: btnHeight },
                                            animSheet: new ig.AnimationSheet( 'media/button.png', btnWidth, btnHeight ),
                                            
                        
                                            pressedDown: function() {
                                            console.log('pressedDown')
                                            
                                            },
                                            pressed: function() {
                                            console.log('pressed')

                                            },
                                            pressedUp: function() {
                                            //this.togglePause();
                                            
                                            }
                                            
                                            });
                        

                        
    }
                       
                        
                        
});

OpenScreen = ig.Game.extend({
	StartImage : new ig.Image('media/openscreen.jpg'),
	init:function(){
		ig.input.bind(ig.KEY.SPACE,'LoadGame');
        ig.input.bind( ig.KEY.MOUSE1, 'click' );
                            //Edit Buttons
                            var btnWidth = 200;
                            var btnHeight  = 50;
                            var textPosX = 100;
                            var textPosY  = 15;
                            
                            
                            ig.game.spawnEntity( Button, ig.system.width / 2 - 100, ig.system.height / 2, {
                                                font: new ig.Font( 'media/04b03.font.png' ),
                                                text: [ 'Play' ],
                                                textPos: { x: textPosX, y: textPosY },
                                                textAlign: ig.Font.ALIGN.CENTER,
                                                size: { x: btnWidth, y: btnHeight },
                                                animSheet: new ig.AnimationSheet( 'media/button.png', btnWidth, btnHeight ),
                                                
                                                pressedDown: function() {
                                                },
                                                pressed: function() {
                                                },
                                                pressedUp: function() {
                                                ig.system.setGame(MyGame);
                                                }
                                                
                                                });
                            
                            ig.game.spawnEntity( Button, ig.system.width / 2 - 100, ig.system.height / 2 + 100, {
                                                font: new ig.Font( 'media/04b03.font.png' ),
                                                text: [ 'Credits' ],
                                                textPos: { x: textPosX, y: textPosY },
                                                textAlign: ig.Font.ALIGN.CENTER,
                                                size: { x: btnWidth, y: btnHeight },
                                                animSheet: new ig.AnimationSheet( 'media/button.png', btnWidth, btnHeight ),
                                                
                                                pressedDown: function() {
                                                },
                                                pressed: function() {
                                                },
                                                pressedUp: function() {
                                                }
                                                
                                                });
                            
                            
                            

                            
                            
	},
	update:function(){
        this.parent();
		if(ig.input.pressed('LoadGame')){
			ig.system.setGame(MyGame);
		}
	},
	draw: function(){
		this.parent();
		this.StartImage.draw(0,0);
                            
                            
	}
});
      
         ig.global.createButtons = function(){ //create buttons on Updatescreen
         
         //Edit Buttons
         var btnWidth = 200;
         var btnHeight  = 50;
         var textPosX = 100;
         var textPosY  = 15;
         
         //button left
         if (ig.global.levelCanon < 3){
         ig.game.spawnEntity( Button, 30, ig.system.height / 2 + 200, {
                             font: new ig.Font( 'media/04b03.font.png' ),
                             text: [ 'Upgrade Canon' ],
                             textPos: { x: textPosX, y: textPosY },
                             textAlign: ig.Font.ALIGN.CENTER,
                             size: { x: btnWidth, y: btnHeight },
                             animSheet: new ig.AnimationSheet( 'media/button.png', btnWidth, btnHeight ),
                             
                             pressedDown: function() {
                             },
                             pressed: function() {
                             },
                             pressedUp: function() {
                             ig.global.buyUpgrade('Canon');
                             if(ig.global.levelCanon == 3){
                             ig.game.spawnEntity( Button, 30, ig.system.height / 2 + 200, {
                                                 font: new ig.Font( 'media/04b03.font.png' ),
                                                 text: [ 'Upgrade Canon' ],
                                                 textPos: { x: textPosX, y: textPosY },
                                                 textAlign: ig.Font.ALIGN.CENTER,
                                                 state: 'deactive',
                                                 size: { x: btnWidth, y: btnHeight },
                                                 animSheet: new ig.AnimationSheet( 'media/buttonDeactivated.png', btnWidth, btnHeight)
                                                 });
                             
                             }

                             }
                             
                             });
         }else{
         ig.game.spawnEntity( Button, 30, ig.system.height / 2 + 200, {
                             font: new ig.Font( 'media/04b03.font.png' ),
                             text: [ 'Upgrade Canon' ],
                             textPos: { x: textPosX, y: textPosY },
                             textAlign: ig.Font.ALIGN.CENTER,
                             state: 'deactive',
                             size: { x: btnWidth, y: btnHeight },
                             animSheet: new ig.AnimationSheet( 'media/buttonDeactivated.png', btnWidth, btnHeight)
                             });

         
         }
         
         //button middle
         if (ig.global.levelGripper < 3){
         ig.game.spawnEntity( Button, 300, ig.system.height / 2 + 200, {
                             font: new ig.Font( 'media/04b03.font.png' ),
                             text: [ 'Upgrade Gripper' ],
                             textPos: { x: textPosX, y: textPosY },
                             textAlign: ig.Font.ALIGN.CENTER,
                             size: { x: btnWidth, y: btnHeight },
                             animSheet: new ig.AnimationSheet( 'media/button.png', btnWidth, btnHeight ),
                             
                             pressedDown: function() {
                             },
                             pressed: function() {
                             },
                             pressedUp: function() {
                             ig.global.buyUpgrade('Gripper');
                             if(ig.global.levelGripper == 3){
                             ig.game.spawnEntity( Button, 300, ig.system.height / 2 + 200, {
                                                 font: new ig.Font( 'media/04b03.font.png' ),
                                                 text: [ 'Upgrade Gripper' ],
                                                 textPos: { x: textPosX, y: textPosY },
                                                 textAlign: ig.Font.ALIGN.CENTER,
                                                 state: 'deactive',
                                                 size: { x: btnWidth, y: btnHeight },
                                                 animSheet: new ig.AnimationSheet( 'media/buttonDeactivated.png', btnWidth, btnHeight)
                                                 });
                             
                             }
                             
                             }
                             });
         }else{
         
         ig.game.spawnEntity( Button, 300, ig.system.height / 2 + 200, {
                             font: new ig.Font( 'media/04b03.font.png' ),
                             text: [ 'Upgrade Gripper' ],
                             textPos: { x: textPosX, y: textPosY },
                             textAlign: ig.Font.ALIGN.CENTER,
                             state: 'deactive',
                             size: { x: btnWidth, y: btnHeight },
                             animSheet: new ig.AnimationSheet( 'media/buttonDeactivated.png', btnWidth, btnHeight)
                             });

         }
         
         //button right
         if (ig.global.levelArmor < 3){
         ig.game.spawnEntity( Button, 550, ig.system.height / 2 + 200, {
                             font: new ig.Font( 'media/04b03.font.png' ),
                             text: [ 'Upgrade Armor' ],
                             textPos: { x: textPosX, y: textPosY },
                             textAlign: ig.Font.ALIGN.CENTER,
                             size: { x: btnWidth, y: btnHeight },
                             animSheet: new ig.AnimationSheet( 'media/button.png', btnWidth, btnHeight ),
                             
                             pressedDown: function() {
                             
                             },
                             pressed: function() {
                             
                             },
                             pressedUp: function() {
                             ig.global.buyUpgrade('Armor');
                             if(ig.global.levelArmor == 3){
                             console.log('ich sollte schon da sein');
                             ig.game.spawnEntity( Button, 550, ig.system.height / 2 + 200, {
                                                 font: new ig.Font( 'media/04b03.font.png' ),
                                                 text: [ 'Upgrade Armor' ],
                                                 textPos: { x: textPosX, y: textPosY },
                                                 textAlign: ig.Font.ALIGN.CENTER,
                                                 state: 'deactive',
                                                 size: { x: btnWidth, y: btnHeight },
                                                 animSheet: new ig.AnimationSheet( 'media/buttonDeactivated.png', btnWidth, btnHeight)
                                                 });
                             
                             }

                             }
                             });
         }else{
         ig.game.spawnEntity( Button, 550, ig.system.height / 2 + 200, {
                             font: new ig.Font( 'media/04b03.font.png' ),
                             text: [ 'Upgrade Armor' ],
                             textPos: { x: textPosX, y: textPosY },
                             textAlign: ig.Font.ALIGN.CENTER,
                             state: 'deactive',
                             size: { x: btnWidth, y: btnHeight },
                             animSheet: new ig.AnimationSheet( 'media/buttonDeactivated.png', btnWidth, btnHeight)
                             });

         
         }
         
         };
         
         ig.global.getPrice = function(name){ //getPrices for Updates
         switch(name){
         case 'Canon':
         
         switch (ig.global.levelCanon){
         case 0 :
         return 100; //price for Level 1
         break;
         case 1 :
         return 500; //price for Level 1
         break;
         case 2 :
         return 1000; //price for Level 1
         break; //== case 3: To-Do --> Button not clickable any more
         default:
         return 'Max.';
         break;
         }
         
         break;
         
         
         case 'Gripper':
         
         switch (ig.global.levelGripper){
         case 0 :
         return 200;
         break;
         case 1 :
         return 500;
         break;
         case 2 :
         return 1000;
         break;
         default:
         return 'Max.';
         break;
         }
         
         break;
         
         case 'Armor':
         switch (ig.global.levelArmor){
         case 0 :
         return 300;
         break;
         case 1 :
         return 500;
         break;
         case 2 :
         return 1000;
         break;
         default:
         return 'Max.';
         break;
         }
         break;
         }
         
         };
         
         ig.global.buyUpgrade = function(name) {
         
         if(ig.global.coins >= ig.global.getPrice(name)){
         console.log(eval('LEVEL:' + "ig.global.level"+ name));
         //Reduce Money
         ig.global.coins = ig.global.coins - ig.global.getPrice(name);
         //LevelUp
         eval("ig.global.level"+ name + " = ig.global.level"+ name + "+ 1");
         
         switch(name){
         case 'Canon':
         ig.game.spawnEntity(Balken, 70, 430, {
                             state: String('a' + eval("ig.global.level"+ name))
                             });

         break;
         case 'Gripper':
         ig.game.spawnEntity(Balken, 340, 430, {
                             state: String('a' + eval("ig.global.level"+ name))
                             });

         break;
         case 'Armor':
         ig.game.spawnEntity(Balken, 590, 430, {
                             state: String('a' + eval("ig.global.level"+ name))
                             });

         break;
         default:
         console.log('hier sollte ich eigentlich nicht landen');
         break;
         
         }
         
         console.log(eval('LEVEL:' + "ig.global.level"+ name));
                 }else if(ig.global.getPrice(name) == 'Max.'){
         console.log('Maximum level reached');
         }else{ //in case you have not enough money
         console.log('not enough money!');
         
         }
         
         };

         
         UpdateScreen = ig.Game.extend({StartImage : new ig.Image('media/updateScreen.png'),
                                       font: new ig.Font( 'media/04b03.font.png' ),
                                       coinIcon: new ig.Image( 'media/coin.png' ),
                                       
                                       
                                       
                                       init: function() {
                                       ig.input.bind( ig.KEY.MOUSE1, 'click' );
                                       ig.input.bind(ig.KEY.SPACE,'LoadGame');
                                       ig.global.createButtons();
//                                       ig.game.spawnEntity(Balken, 70, 430, {
//                                       state: String(ig.global.levelCanon)
//                                                           
//                                       });
                                      
                                       //Canon
                                       ig.game.spawnEntity(Balken, 70, 430, {
                                        state: String('a' + ig.global.levelCanon)
                                                           });
                                       //Gripper
                                       ig.game.spawnEntity(Balken, 340, 430, {
                                        state: String('a' + ig.global.levelGripper)
                                                           });
                                       //Armor
                                       ig.game.spawnEntity(Balken, 590, 430, {
                                        state: String('a' + ig.global.levelArmor)
                                                           });


                                       },
                                       
                                       update: function(){
                                       this.parent();
                                       
                                       
                                       
                                       if(ig.input.pressed('LoadGame')){
                                       ig.global.level=ig.global.level+1;
                                       ig.system.setGame(MyGame);
                                       }
                                       
                                       },
                                       
                                       
                                       
                                       
                                       draw: function(){
                                       this.parent();
                                       
                                       this.StartImage.draw(0,0);
                                       //Price Canon
                                       this.font.draw( 'Price: ' + ig.global.getPrice('Canon')  , 60 , ig.system.height / 2 + 100  );
                                       //Price Gripper
                                       this.font.draw( 'Price: ' + ig.global.getPrice('Gripper')  , 330 , ig.system.height / 2 + 100  );
                                       //Price Armor
                                       this.font.draw( 'Price: ' + ig.global.getPrice('Armor')  , 580 , ig.system.height / 2 + 100  );
                                       
                                       
                                       this.coinIcon.drawTile( 600, 10+6, 0, 36 );
                                       this.font.draw( 'x ' + ig.global.coins, 650, 10+10 );

                                      
                                       }
                                       
                                       });

GameEnd = ig.Game.extend({
	EndImage : new ig.Image('media/gameend.jpg'),
	init:function(){		
		ig.input.bind(ig.KEY.SPACE,'LoadGame');
	},
	update:function(){
		if(ig.input.pressed('LoadGame')){
			
			ig.system.setGame(MyGame);
		}
	},
	draw: function(){
		this.parent();
		this.EndImage.draw(0,0);
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
//ig.main( canvas, gameClass, fps, width, height, [scale], [loaderClass] );¶
ig.main( '#canvas', OpenScreen, 60, 800, 600, 1 );

});
