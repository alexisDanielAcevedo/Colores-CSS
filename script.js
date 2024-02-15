const colorPalette = document.getElementById('colorPalette');
const PALLETE_SIZE = 5;
const colorValues = ['1','2','3','4','6','7','8','9','A','B','C','D','E','F'];

const createPallete = () => {
    colorPalette.innerHTML = '';
    for(let i = 0; i < PALLETE_SIZE; i++) {
        const palleteElement = document.createElement('div');
        palleteElement.classList.add('palleteItem');
        palleteElement.onclick = function() {
            copiarColor(this.querySelector('.colorHex').innerText);
        };
        colorPalette.appendChild(palleteElement);
    }
    updatePallete();
}

const colorize = (element) => {
    let color = '#';
    for(let i = 0; i < 6; i++) {
        const randomElement = colorValues[Math.floor(Math.random() * colorValues.length)];
        color += randomElement;
    };
    element.style.backgroundColor = color; 
    element.innerHTML = `<span class='colorHex'>${color}</span>`;   
}

const updatePallete = () => {
    for (let i = 0; i < colorPalette.children.length; i++) {
        colorize(colorPalette.children[i])
    }
};


const mostrarMensaje = () => {
    const contenedorMensajes = document.getElementById('contenedorMensajes');
    const mensajeCopiado = document.getElementById('mensajeCopiado');

    contenedorMensajes.classList.add('mostrar');

    setTimeout(() => {
        contenedorMensajes.classList.remove('mostrar');
    }, 1000);
};

const copiarColor = (color) => {
    const tempElement = document.createElement('textarea');
    tempElement.value = color;
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand('copy');
    document.body.removeChild(tempElement);

    mostrarMensaje();
};

document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        updatePallete();
    }
});

colorPalette.addEventListener('click', function (event) {
    const target = event.target;

    if (target.classList.contains('palleteItem')) {
        const colorHex = target.querySelector('.colorHex').innerText;
        copiarColor(colorHex);
    }
});

createPallete();
