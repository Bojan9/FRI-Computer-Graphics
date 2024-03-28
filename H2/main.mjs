import { Bezier } from './Bezier.mjs';
import { Spline } from './Spline.mjs';
import { risaj } from './Risanje.mjs';
let b1 = new Bezier([[50,30],[50,100],[120,150],[200,210]]);
let b2 = new Bezier([[222,222],[230,240],[250,260],[250,300]]);
let b3 = new Bezier([[321,331],[340,340],[350,380],[400,400]]);
let b4 = new Bezier([[420,430],[450,470],[500,510],[525,550]]);
let sp = new Spline([b1, b2, b3, b4]);
let spline = [sp];

risaj(spline, 0.01);