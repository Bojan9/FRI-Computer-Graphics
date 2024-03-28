export function factor(num) {
    var result = num;
    if (num === 0 || num === 1) 
        return 1; 
    while (num > 1) { 
        num--;
        result *= num;
    }
    return result;
  }

export function krug(ctx, centerX, centerY, radius, color) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
}

export function kvadrat(ctx, centerX, centerY, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(centerX, centerY, width, height);
}