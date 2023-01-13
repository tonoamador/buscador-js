//Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
const resultado = document.querySelector('#resultado');
const max = new Date().getFullYear();
const min = max-13;


//Generar un objeto con la busqueda
const datosBusqueda = {
    marca : '',
    year : '',
    minimo : '',
    maximo : '',
    puertas : '',
    transmision : '',
    color : '',

}




document.addEventListener('DOMContentLoaded',()=>{

    // mostrarAutos(autos); //Muestra los automoviles al cargar

    //Llena las opciones de años
    llenarSelect();


    mostrarAutos(autos);
})

function noResultado(){
    limpiarHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta','error');
    noResultado.textContent = 'No hay resultados';
    resultado.appendChild(noResultado)

}

//Event listener para los select de busqueda

marca.addEventListener('change',e=>{
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
})

year.addEventListener('change',e=>{
    datosBusqueda.year = e.target.value;
    filtrarAuto();

})

minimo.addEventListener('change',e=>{
    datosBusqueda.minimo = e.target.value;

    filtrarAuto();
})

maximo.addEventListener('change',e=>{
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
})

puertas.addEventListener('change',e=>{
    datosBusqueda.puertas = e.target.value;
    filtrarAuto();
})

transmision.addEventListener('change',e=>{
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
})

color.addEventListener('change',e=>{
    datosBusqueda.color = e.target.value;
    filtrarAuto();
})

function mostrarAutos(autos){

    limpiarHTML(); //Eliminar el HTML previo
    autos.forEach(auto =>{
        
        const {marca,modelo,year,puertas,transmision,precio,color} = auto
        const autoHTML = document.createElement('P');

        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision ${transmision} - Precio: ${precio} - Color: ${color}
        
        `

        //Insertar en el HTML
        resultado.appendChild(autoHTML);
    })
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}


function llenarSelect(){

    for(let i = max; i >= min;i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion)//Agregamos las opciones al select
    }
    

}

//Función que filtra con base en la busqueda
function filtrarAuto(){
    const resultado = autos.filter( filtrarMarca ).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    // console.log(resultado);

    if(resultado.length){
        mostrarAutos(resultado)
    }else{
        noResultado();
    }
}

function filtrarMarca(auto){
    if( datosBusqueda.marca){
        return auto.marca === datosBusqueda.marca;
    }

    return auto;

}

function filtrarYear(auto){
    if(datosBusqueda.year){
        return auto.year === parseInt(datosBusqueda.year);
    }
    return auto;
}

function filtrarMinimo(auto){
    const {minimo} = datosBusqueda
    if(minimo){
        return auto.precio >= minimo;
    }
    return auto;

}

function filtrarMaximo(auto){
    const {maximo} = datosBusqueda
    if(maximo){
        return auto.precio <= maximo;
    }
    return auto;

}

function filtrarPuertas(auto){
    if(datosBusqueda.puertas){
        return auto.puertas === parseInt(datosBusqueda.puertas);
    }
    return auto;
}

function filtrarTransmision(auto){
    if( datosBusqueda.transmision){
        return auto.transmision === datosBusqueda.transmision;
    }

    return auto;

}

function filtrarColor(auto){
    if( datosBusqueda.color){
        return auto.color === datosBusqueda.color;
    }

    return auto;

}