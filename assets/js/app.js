const listaProductos = document.querySelector('#lista-productos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const carrote = document.querySelector('#lista-carrito');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
let arregloProductos = [];

agregarListeners();

function agregarListeners(){
    carroVacio();
    listaProductos.addEventListener('click', agregarProducto) 
    carrote.addEventListener('click', eliminarProducto)
    vaciarCarrito.addEventListener('click', () => {
        arregloProductos = [];
        limpiarHtml();
        carroVacio();
    })
    
}

function carroVacio() {
    if(arregloProductos.length===0){
        contenedorCarrito.innerHTML = 
        `
            <td colspan=5 class="text-center">Su carro esta vacio</td>
        `
    }
}


function eliminarProducto(e){
    e.preventDefault();
    if(e.target.classList.contains('eliminar')){
        const productoId = e.target.getAttribute('data-id');
        arregloProductos = arregloProductos.filter(producto => producto.id !== productoId);
        carritoHtml();
        carroVacio();
    }
}
function agregarProducto(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-producto')) {
        const productoSeleccionado = e.target.parentElement.parentElement.parentElement;
        leerProducto(productoSeleccionado);
        // console.log(productoSeleccionado);
    }
}


function leerProducto(producto) {
    const infoProducto = {
        imagen:  producto.querySelector('.card-img').src,
        nombre : producto.querySelector('.card-body a').textContent,
        precio : producto.querySelector('.card-body .text-center').textContent,
        id : producto.querySelector('.card-body .text-white').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = arregloProductos.some(producto => producto.id === infoProducto.id)

    if(existe) {
        const productos = arregloProductos.map(producto => {
            if(producto.id === infoProducto.id){
                producto.cantidad++;
                return producto;
            }
            else{
                return producto;
            }
        }) 
        arregloProductos = [...productos]
    }


    else {
        arregloProductos = [...arregloProductos, infoProducto]
    }
    // console.log(infoProducto);
    
    carritoHtml();
}


function carritoHtml(){
    // console.log("contenedorCarrito");
    limpiarHtml();

    arregloProductos.forEach((producto)=> {
        const {imagen, nombre, precio, id, cantidad} = producto;
        // console.log(imagen,nombre,precio,id,cantidad);
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>
                <img src="${imagen}" width="80">
            </td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td class="text-center">${cantidad}</td>
            <td class="eliminar" style="font-weight: bold;
            color: white;
            background-color: orange;
            text-align: center;
            padding: .25rem 1.5rem;
            margin: 0;
            cursor: pointer;" data-id="${id}">x</td>
        `

        contenedorCarrito.appendChild(fila)
        // console.log(fila);
    })


}

function limpiarHtml() {
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}