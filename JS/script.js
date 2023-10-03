// Variables
const nombreForm = document.querySelector('.nombre-form');
const paginaPrincipal = document.querySelector('#pagina-principal');
const nombreInput = document.querySelector('#nombre-input');
const nombreBoton = document.querySelector('#nombre-boton');
const lista = document.querySelector('#lista');
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';
let id = 0;
let listTareas;

//Fecha del navegador
const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString('es-CL', {weekday:"long", month:"long", day:"numeric"})

//Agregar tarea
function agregarTarea (tarea,id,realizado,eliminar){

    if(eliminar){return}

    const REALIZADO = realizado ? check : uncheck;
    const LINE = realizado ? lineThrough : '';

    const elemento = `
                        <li id="elemento">
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminar" id="${id}"></i>
                        </li>
                    `
    
    lista.insertAdjacentHTML("beforeend",elemento)
}


//Funcion tarea realizada
function tareaRealizada(element){
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(lineThrough);
    listTareas[element.id].realizado = listTareas[element.id].realizado ? false : true;
}

/*Funcion de tarea eliminada
function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    listTareas[element.id].eliminar = true;
}*/

function tareaEliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    listTareas[element.id].eliminar = true;
    // Limpia la tarea eliminada del almacenamiento local
    listTareas = listTareas.filter((tarea) => !tarea.eliminar);
    localStorage.setItem('tareas', JSON.stringify(listTareas));
}

//Agregar tarea desde el input
botonEnter.addEventListener('click', ()=>{
    const tarea = input.value 
    if(tarea) {
        agregarTarea(tarea,id,false,false)
        listTareas.push({
                        nombre: tarea,
                        id:id,
                        realizado:false,
                        eliminar: false
        })
    }
    localStorage.setItem('tareas',JSON.stringify(listTareas));
    id++;
    input.value='';
})

//Agregar tarea con la tecla enter
document.addEventListener('keyup', function(event){
    if(event.key=='Enter'){
        const tarea = input.value 
        if(tarea) {
            agregarTarea(tarea,id,false,false)
            listTareas.push({
                nombre: tarea,
                id:id,
                realizado:false,
                eliminar: false
            })
        }
        localStorage.setItem('tareas',JSON.stringify(listTareas));
        id++;
        input.value='';
    }
})

//check o uncheck de tarea realizada y elimar tarea desde los input
lista.addEventListener('click', function(event){
    const element = event.target;
    const elementData = element.attributes.data.value;

    if(elementData === 'realizado'){
        tareaRealizada(element);
    } else if(elementData === 'eliminar'){
        tareaEliminada(element);
    }
    localStorage.setItem('tareas',JSON.stringify(listTareas));
})

//Local storage Get item
let data = localStorage.getItem('tareas');
if(data){
    listTareas = JSON.parse(data);
    id = listTareas.length;
    cargarLista(listTareas);
} else{
    listTareas = [];
    id = 0;
}

/* Cargar lista guardada
function cargarLista(DATA) {
    DATA.forEach(function (i) {
        agregarTarea(i.nombre, i.id, i.realizado, i.eliminar);
        }
    );
}*/

function cargarLista(DATA) {
    DATA.forEach(function (i) {
        if (!i.eliminar) {
            agregarTarea(i.nombre, i.id, i.realizado, i.eliminar);
        }
    });
}
