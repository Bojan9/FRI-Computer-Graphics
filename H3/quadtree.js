    class rect {
        constructor(x, y, width, height){
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
    }

    export class Quadtree {
        constructor(bounds, max_objects, max_levels, level) {
            this.max_objects = max_objects || 10;
            this.max_levels = max_levels || 5;
            this.level  = level || 0;
            this.bounds = bounds;
            this.objects = [];
            this.nodes = [];
        }

        split() {
            var nextLevel   = this.level + 1,
                subWidth    = this.bounds.width/2,
                subHeight   = this.bounds.height/2,
                x           = this.bounds.x,
                y           = this.bounds.y;        
         
            var b = new rect(x + subWidth, y, subWidth, subHeight)
            this.nodes[0] = new Quadtree(b, this.max_objects, this.max_levels, nextLevel);
            
            var b = new rect(x, y, subWidth, subHeight)
            this.nodes[1] = new Quadtree(b, this.max_objects, this.max_levels, nextLevel);
            
            var b = new rect(x, y + subHeight, subWidth, subHeight)
            this.nodes[2] = new Quadtree(b, this.max_objects, this.max_levels, nextLevel);
            
            var b = new rect(x + subHeight, y + subHeight, subWidth, subHeight)
            this.nodes[3] = new Quadtree(b, this.max_objects, this.max_levels, nextLevel);
        }

        getIndex(pRect) {
            var indexes = [],
            verticalMidpoint    = this.bounds.x + (this.bounds.width/2),
            horizontalMidpoint  = this.bounds.y + (this.bounds.height/2);    

            var startIsNorth = pRect.y < horizontalMidpoint,
                startIsWest  = pRect.x < verticalMidpoint,
                endIsEast    = pRect.x + pRect.width > verticalMidpoint,
                endIsSouth   = pRect.y + pRect.height > horizontalMidpoint;    

            if(startIsNorth && endIsEast) {
                indexes.push(0);
            }
            
            if(startIsWest && startIsNorth) {
                indexes.push(1);
            }

            if(startIsWest && endIsSouth) {
                indexes.push(2);
            }

            if(endIsEast && endIsSouth) {
                indexes.push(3);
            }
        
            return indexes;
        }

        insert(pRect) {
            var i = 0,
            indexes;
         
            if(this.nodes.length) {
                indexes = this.getIndex(pRect);
        
                for(i=0; i<indexes.length; i++) {
                    this.nodes[indexes[i]].insert(pRect);     
                }
                return;
            }
        
            this.objects.push(pRect);

            if(this.objects.length > this.max_objects && this.level < this.max_levels) {
                if(!this.nodes.length) {
                    this.split();
                }
                
                for(i=0; i<this.objects.length; i++) {
                    indexes = this.getIndex(this.objects[i]);
                    for(var k=0; k<indexes.length; k++) {
                        this.nodes[indexes[k]].insert(this.objects[i]);
                    }
                }

                this.objects = [];
            }
        }

        retrieve(pRect) {
            var indexes = this.getIndex(pRect),
                returnObjects = this.objects;
                
            if(this.nodes.length) {
                for(var i=0; i<indexes.length; i++) {
                    returnObjects = returnObjects.concat(this.nodes[indexes[i]].retrieve(pRect));
                }
            }

            returnObjects = returnObjects.filter(function(item, index) {
                return returnObjects.indexOf(item) >= index;
            });
        
            return returnObjects;
        }

        clear() {
            this.objects = [];
     
            for(var i=0; i < this.nodes.length; i++) {
                if(this.nodes.length) {
                    this.nodes[i].clear();
                }
            }

            this.nodes = [];
        }
    }