// A Button Entity for Impact.js

ig.module( 'plugins.balken' )
.requires(
  'impact.entity'
)
.defines(function() {

  Balken = ig.Entity.extend({
  animSheet: new ig.AnimationSheet( 'media/balken.png', 110, 40),

    state: 'a0',
    
    init: function(x, y, settings) {
      this.parent(x , y, settings);
      this.addAnim( 'a0', 1, [0] );
      this.addAnim( 'a1', 1, [1] );
      this.addAnim( 'a2', 1, [2] );
      this.addAnim( 'a3', 1, [3] );
                            if ( this.state == '2' ) {
                            this.currentAnim = this.anims.level2;}
                            
                            
                            
    console.log(this.state);
    },
    
    update: function() {
                            this.parent();
    if ( this.state == 'a0' ) {
        this.currentAnim = this.anims.a0;}
                            
    if ( this.state == 'a1' ) {
        this.currentAnim = this.anims.a1;}
                            
    if ( this.state == 'a2' ) {
        this.currentAnim = this.anims.a2;}
                            
    if ( this.state == 'a3' ) {
        this.currentAnim = this.anims.a3;}
                            
                            
    }
    
//    draw: function() {
//        this.parent();
//                            
//    },
    
//    setState: function( s ) {
//      this.state = s;
//        }
    
                            
});

});