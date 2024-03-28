import { krug } from './Helper.mjs';
import { kvadrat } from './Helper.mjs';

export function risaj(sp, accuracy) {
    var ctx = document.getElementById("cvs").getContext('2d');
    ctx.width = ctx.width*2;
    ctx.height = ctx.height*2;
    for(let z = 0; z < sp.length; z++){
        sp[z].makeContinuous();
        sp[z].makeSmooth();
        let n = sp[z].curves.length;
        let x = 0;
    
        for (let i = 0; i < n; i++) {
            ctx.moveTo(sp[z].curves[i].points[0][0], sp[z].curves[i].points[0][1]);
            for (let j = 0 + x; j < 1 + x; j += accuracy){
                ctx.lineTo(sp[z].value(j)[0], sp[z].value(j)[1]);
            }
            x++;
        }
    
        ctx.stroke();
    
        krug(ctx, sp[z].curves[0].points[0][0], sp[z].curves[0].points[0][1], 3, "blue");
        for (let a = 0; a < n; a++) {
            kvadrat(ctx, sp[z].curves[a].points[1][0], sp[z].curves[a].points[1][1], 5, 5, "green");
            kvadrat(ctx, sp[z].curves[a].points[2][0], sp[z].curves[a].points[2][1], 5, 5, "green");
            krug(ctx, sp[z].curves[a].points[3][0], sp[z].curves[a].points[3][1], 3, "blue");
        }
    }
}