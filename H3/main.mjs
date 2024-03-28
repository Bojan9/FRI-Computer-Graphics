import { Quadtree } from './quadtree.js';
(function(w) {
			
    w.requestAnimFrame = (function () {
        return  w.requestAnimationFrame 
    })();

    var ctx = document.getElementById('canvas').getContext('2d');
    var cnt_total = document.querySelector('#cnt_total');
        
    var x = 0,
        y = 0, 
        width = 600,
        height = 600;

    var myTree = new Quadtree({x, y, width, height});
    var myObjects = [];
    
    for(var i=0;i<500;i++) {
        var x = randMinMax(0, 600-16),
            y = randMinMax(0, 600-16),
            width = randMinMax(5, 15),
            height = width,
            vx = randMinMax(-0.5,0.5),
            vy = randMinMax(-0.5,0.5),
            check = false;
        myObjects.push({x, y, width, height, vx, vy, check});
        cnt_total.innerHTML = myObjects.length;
    }

    onmousedown = (event) => {
        var x = event.clientX - 10;
        var y = event.clientY - 10;
        var width = randMinMax(5, 15),
            height = width,
            vx = randMinMax(-0.5,0.5),
            vy = randMinMax(-0.5,0.5),
            check = false;
        myObjects.push({x, y, width, height, vx, vy, check});
        cnt_total.innerHTML = myObjects.length;
    }

    function drawQuadtree(node){
        var bounds = node.bounds;
    
        if(node.nodes.length === 0) {
            ctx.strokeStyle = 'orange';
            ctx.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
            
        } else {
            for(var i=0;i<node.nodes.length;i++) {
                drawQuadtree(node.nodes[i]);
            }
        }
    }
    
    function drawObjects() {
        var obj;
        
        for(var i=0;i<myObjects.length;i++) {
            obj = myObjects[i];
            
            if(obj.check) {
                ctx.fillStyle = 'red';
            } else {
                ctx.fillStyle = 'white';
            }
            ctx.beginPath();
            ctx.arc(obj.x, obj.y, obj.width / 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    var loop = function() {
        
        myTree.clear();
        ctx.clearRect(0, 0, 600, 600);
        
        for(var i=0;i<myObjects.length;i++) {
            
            myObjects[i].x += myObjects[i].vx;
            myObjects[i].y += myObjects[i].vy;
            myObjects[i].check = false;
            
            if(myObjects[i].x > 600 - myObjects[i].width || myObjects[i].x < 0) myObjects[i].vx *= -1;
            if(myObjects[i].y > 600 - myObjects[i].height || myObjects[i].y < 0) myObjects[i].vy *= -1;
            
            myTree.insert(myObjects[i]);
        }

        for(var i=0;i<myObjects.length;i++) {
            var myObject = myObjects[i];
            var candidates = myTree.retrieve(myObject);

            for(var k=0;k<candidates.length;k++) {

                var myCandidate = candidates[k];
                if(myObject === myCandidate) continue;

                var intersect = getIntersection(myObject, myCandidate);
                if(intersect === false) continue;

                myObject.check = true;
                myCandidate.check = true;

                if(intersect.pushX < intersect.pushY) {
                    if(intersect.dirX < 0) {
                        myObject.x = myCandidate.x - myObject.width;
                    } else if(intersect.dirX > 0) {
                        myObject.x = myCandidate.x + myCandidate.width;
                    }
                    
                    myObject.vx *= -1;
                
                } else {
                    if(intersect.dirY < 0) {
                        myObject.y = myCandidate.y - myObject.height;
                    } else if(intersect.dirY > 0) {
                        myObject.y = myCandidate.y + myCandidate.height;
                    }
                    
                    myObject.vy *= -1;
                }
            }
        }
        drawQuadtree(myTree);
        drawObjects();
        requestAnimFrame(loop);
    }

    function getIntersection(r1, r2) {
        var r1w = r1.width/2,
            r1h = r1.height/2,
            r2w = r2.width/2,
            r2h = r2.height/2;

        var distX = (r1.x + r1w) - (r2.x + r2w);
        var distY = (r1.y + r1h) - (r2.y + r2h);

        if(Math.abs(distX) < r1w + r2w && Math.abs(distY) < r1h + r2h) {
            return {
                pushX : (r1w  + r2w) - Math.abs(distX),
                pushY : (r1h  + r2h) - Math.abs(distY),
                dirX : distX === 0 ? 0 : distX < 0 ? -1 : 1,
                dirY : distY === 0 ? 0 : distY < 0 ? -1 : 1
            }
        } else {
            return false;
        }
    }

    loop();
    
    function randMinMax(min, max, round) {
        var val = min + (Math.random() * (max - min));
        if(round) val = Math.round(val);
        return val;
    }
    
})(window);