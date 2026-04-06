const transformations = document.querySelector('#transformations');
transformations.addEventListener('load', () => {
    const object1 = transformations.contentDocument.querySelector('#object1');

    let pos = 0;
    velocity = 20;
    
    id = setInterval(frame, 5);
    function frame() {
        if (pos >= 1000) {
            pos = 0;
        } else {
            x_pos = 300+150*Math.cos(2*Math.PI*pos/10000*velocity);
            y_pos = 300-150*Math.sin(2*Math.PI*pos/10000*velocity);
            object1.setAttribute("cx",x_pos);
            object1.setAttribute("cy",y_pos);            
            pos++;
        }
    }
});