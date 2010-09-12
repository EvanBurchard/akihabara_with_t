
var spriter={
  addSprite:function(sprite_class,state) {
      var sprite = gbox.getSprite(sprite_class);
      // Generate a unique hash for this object
      var obj = persist.add(sprite,state);

      gbox.addObject(obj);
    },

    restoreSprite: function(sprite_class,state) {
      var sprite = gbox.getSprite(sprite_class);
      gbox.addObject(persist.add(sprite,state));
    }
};


