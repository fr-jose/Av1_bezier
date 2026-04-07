const transformations1 = document.querySelector('#transformations1');
const transformations2 = document.querySelector('#transformations2');
transformations1.addEventListener('load', () => {
    const svgDoc = transformations1.contentDocument
    const translation_bar = transformations1.contentDocument.querySelector('#Translation_bar_slider');
    const scale_bar = transformations1.contentDocument.querySelector('#Scale_bar_slider');
    const rotation_bar = transformations1.contentDocument.querySelector('#Rotation_bar_slider');
    const skew_bar = transformations1.contentDocument.querySelector('#Skew_bar_slider');
    const rotation_button = transformations1.contentDocument.querySelector('#Rotation_button_press');
    const skew_button = transformations1.contentDocument.querySelector('#Skew_button_press');
    const figure = transformations1.contentDocument.querySelector('#figure');

    let pressed = false;
    let dx = 0;
    let dy = 0;
    let y_pos = 0;
    let lastY = 0;
    let x_pos = 0;
    let lastX = 0;
    let bar = 0;
    let rot_bool = 0;
    let skew_bool = 0;
    let center_x = 0;
    let center_y = 0;

    // Posição de figure
    let x1 = 300;
    let x2 = x1+40;
    let x3 = x1-40;
    let y1 = 180;
    let y2 = y1+150;
    let y3 = y1+50;
    let scale = 1;

    translation_bar.setAttribute("x",x1);
    scale_bar.setAttribute("x",x1);
    
    // Controle da barra de Transladar
    translation_bar.addEventListener('mousedown',(e)=>{
        pressed = true;
        bar = 0;
        lastX = e.offsetX;
    });

    function checkboundary_translation(){
        if(parseFloat(translation_bar.getAttribute("x") || 0) > 700){
            translation_bar.setAttribute("x",700);
        }
        if(parseFloat(translation_bar.getAttribute("x") || 0) < -120){
            translation_bar.setAttribute("x",-120);
        }
    }

    // Controle da barra de Escalar
    scale_bar.addEventListener('mousedown',(e)=>{
        pressed = true;
        bar = 1;
        lastX = e.offsetX;
    });
 
    function checkboundary_scale(){
        if(parseFloat(scale_bar.getAttribute("x") || 0) > 700){
            scale_bar.setAttribute("x",700);
        }
        if(parseFloat(scale_bar.getAttribute("x") || 0) < -120){
            scale_bar.setAttribute("x",-120);
        }
    }
    
    // Controle da barra de Rotação
    rotation_bar.addEventListener('mousedown',(e)=>{
        pressed = true;
        bar = 2;
        lastY = e.offsetY;
    });

    function checkboundary_rotation(){
        if(parseFloat(rotation_bar.getAttribute("y") || 0) < 75){
            rotation_bar.setAttribute("y",75);
        }
        if(parseFloat(rotation_bar.getAttribute("y") || 0) > 480){
            rotation_bar.setAttribute("y",480);
        }
    }


    // Controle da barra de Skew
    skew_bar.addEventListener('mousedown',(e)=>{
        pressed = true;
        bar = 3;
        lastY = e.offsetY;
    });

    function checkboundary_skew(){
        if(parseFloat(skew_bar.getAttribute("y") || 0) < 75){
            skew_bar.setAttribute("y",75);
        }
        if(parseFloat(skew_bar.getAttribute("y") || 0) > 480){
            skew_bar.setAttribute("y",480);
        }
    }


    // Mudança para todos os conotrles
    svgDoc.addEventListener('mousemove',(e)=>{
        if (!pressed) return;
        e.preventDefault();
        
        dx = e.offsetX - lastX;
        lastX = e.offsetX;
        
        dy = e.offsetY - lastY;
        lastY = e.offsetY;
        
        if(bar==0){
        x_pos = parseFloat(translation_bar.getAttribute("x") || 0);
        translation_bar.setAttribute("x",x_pos+dx);
        x1 = parseFloat(translation_bar.getAttribute("x"));
        checkboundary_translation();
        figure_render(x1,y1,scale);
        }
        else if(bar==1){
        x_pos = parseFloat(scale_bar.getAttribute("x") || 0);    
        scale_bar.setAttribute("x",x_pos+dx);
        scale = parseFloat(scale_bar.getAttribute("x"))/600+1/2;
        checkboundary_scale();   
        figure_render(x1,y1,scale);         
        }
        else if(bar==2){
        y_pos = parseFloat(rotation_bar.getAttribute("y") || 0);    
        rotation_bar.setAttribute("y",y_pos+dy);
        checkboundary_rotation(); 
        // 1. Pega o valor Y da barra
        let y_barra = parseFloat(rotation_bar.getAttribute("y"));

        // 2. Converte para graus (75 -> 0°, 480 -> 360°)
        let graus = (y_barra - 75) * (360 / (480 - 75));

        // 3. Aplica a rotação usando o center_x/y que o clique salvou
        figure.setAttribute("transform", `rotate(${graus}, ${center_x}, ${center_y})`);           
        }
        else if(bar==3){
        y_pos = parseFloat(skew_bar.getAttribute("y") || 0);    
        skew_bar.setAttribute("y",y_pos+dy);
        checkboundary_skew();            
        }
    });

    svgDoc.addEventListener('mouseup',()=>{
        pressed = false;
    });

    // Selecionar botão de rotação
    rotation_button.addEventListener('mousedown',(e)=>{
        if(rot_bool==0){
            rot_bool=1;
            rotation_button.setAttribute('fill', '#0d5aa6');
        }
        else{
            rot_bool=0;
            rotation_button.setAttribute('fill', '#3b3c3d');
        }
    });

    // Selecionar botão de skew
    skew_button.addEventListener('mousedown',(e)=>{
        if(skew_bool==0){
            skew_bool=1;
            skew_button.setAttribute('fill', '#0d5aa6');
        }
        else{
            skew_bool=0;
            skew_button.setAttribute('fill', '#3b3c3d');
        }
    });

    // Atualizar figure
    function figure_render(x1,y1,scale){
        x2 = x1+40*scale;
        x3 = x1-40*scale;
        y2 = y1+150*scale;
        y3 = y1+50*scale;        
        figure.setAttribute('points', `${x1},${y1} ${x2},${y1} ${x2},${y2} ${x1},${y2} ${x1},${y3} ${x3},${y3}`)
    }
    }); 

    const canvas1 = svgDoc.querySelector('svg');
    // Rotacionar em relação a um centro.
    canvas_figura.addEventListener('click', (e) => {
    if(rot_bool==1){
        let pt = canvas1.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        let coords = pt.matrixTransform(canvas1.getScreenCTM().inverse());
        
        center_x = coords.x;
        center_y = coords.y;
    }
    });


transformations2.addEventListener('load', () => {
    const svgDoc2 = transformations2.contentDocument;
    const canvas = svgDoc2.querySelector('svg');

    canvas.addEventListener('click', (e) => {
        const new_circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

        ponto = canvas.createSVGPoint();
        ponto.x = e.clientX;
        ponto.y = e.clientY;
        const coordenadasSVG = ponto.matrixTransform(canvas.getScreenCTM().inverse());

        // 2. Define os atributos (posição baseada no clique do mouse)
        new_circle.setAttribute("cx", coordenadasSVG.x);
        new_circle.setAttribute("cy", coordenadasSVG.y);
        new_circle.setAttribute("r", 8); // Raio do círculo
        new_circle.setAttribute("fill", "white");
        new_circle.setAttribute("stroke", "black");

        // 3. Adiciona o círculo ao SVG
        canvas.appendChild(new_circle);
    });
});