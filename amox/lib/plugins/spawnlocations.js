ig.module('plugins.functions.spawnlocations').
  defines(function(){
    ig.spawnlocations = ig.Class.extend({
      spawnIf: function(x, y)
      {
          if (this.CollisionAt(x,y) || this.getEntitiesAt(x,y)){
              var x1 = x + Math.round(Math.random())*10;
              var x2 = x + Math.round(Math.random())*10;
              this.spawnIf(x1,x2); //recursion
          }
          ig.game.spawnEntity('EntityEnemy', x, y);
      },

      getEntitiesAt: function(x, y)
      {
          var n = ig.game.entities.length;
          var ents = [];
          for (var i=0; i<n; i++)
          {
              var ent = ig.game.entities[i],
                  x0 = ent.pos.x,
                  x1 = x0 + ent.size.x,
                  y0 = ent.pos.y,
                  y1 = y0 + ent.size.y;
                  
              if (x0 <= x && x1 > x && y0 <= y && y1 > y)
                  return true;
          }
          return false;
      },
      CollisionAt: function(x,y)
      {
          var Map = ig.game.collisionMap;
          var player = ig.game.getEntitiesByType("EntityPlayer")[0];
          var ent = new EntityEnemy();
          var res = Map.trace( x, y, 5,5,x+ ent.size.x, y + ent.size.y ); // position, distance, size
          
          // true if there is a collision on either x or y axis 
         return res.collision.x || res.collision.y;
      
      }
    });
  })