(function (){
    var LevelJsonReader = Mario.LevelJsonReader = function() {
    };

    LevelJsonReader.prototype.read = function( json ){
        var options = this.parseOptions( json.options );
        level = new Mario.Level( options );

        for( var i=0; i<json.items.length; i++  ){
            item = json.items[i];
            if ( item.type == "floor"){
                this.addFloor(item);
            } else if ( item.type == "cloud"){
                this.addCloud(item);
            } else if ( item.type == "brick"){
                this.addBrick(item);
            }
        };
    }

    LevelJsonReader.prototype.parseOptions = function( options ){
        this.replaceSpriteObjects( options );
        return options;
    }

    /**
     * recursively replace sprites jsons with Mario.Sprite objects
     */
    LevelJsonReader.prototype.replaceSpriteObjects = function( obj ){
        if (typeof obj === "object"){
            for (var key in obj ) {
                if ( obj.hasOwnProperty(key) ) {
                    var prop = obj[key];
                    if ( typeof prop === "object"){
                        if ( prop.hasOwnProperty("img")){
                            obj[key] = new Mario.Sprite( prop["img"], prop["pos"], prop["size"], prop["speed"] );
                        } else {
                            this.replaceSpriteObjects( obj[key]);
                        }
                    }
                }
            }
        } else if (typeof obj === "array"){
            for ( var key=0; key< obj.length; key++){
                var prop = obj[key];
                if ( typeof prop === "object"){
                    if ( prop.hasOwnProperty("img")){
                        obj[key] = new Mario.Sprite( prop["img"], prop["pos"], prop["size"], prop["speed"] );
                    } else {
                        this.replaceSpriteObjects( obj[key]);
                    }
                }
            }
        }
    }



    LevelJsonReader.prototype.addFloor = function( item ){
        for( var i=0; i< item.locations.length; i++){
            var loc = item.locations[i];
            level.putFloor(loc[0],loc[1]);
        };
    }

    LevelJsonReader.prototype.addCloud = function( item ){
        for( var i=0; i< item.locations.length; i++){
            var loc = item.locations[i];
            level.putCloud(loc[0],loc[1]);
        };
    }

    LevelJsonReader.prototype.addBrick = function( item ){
        for( var i=0; i< item.locations.length; i++){
            var loc = item.locations[i];
            level.putBrick(loc[0],loc[1], null);
        };
    }

})();