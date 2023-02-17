const nombre = document.querySelector('.nombre')
const apellido = document.querySelector('.apellido')
const telefono = document.querySelector('.telefono')
const btnAgregarContacto = document.querySelector('.BTN-agregar')
const ListaContactos = document.querySelector('.listado-contactos')
const table = document.querySelector('#cuerpo')


/// AGREGAR CONTACTO AL SERVIDOR
btnAgregarContacto.addEventListener ('click', (event)=> {
    event.preventDefault();

    async function postData (url = '',data = {}) {
        const response = await fetch (url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify (data)
        });
        return response.json();
    }
    postData ('http://www.raydelto.org/agenda.php', {
        nombre: nombre.value,
        apellido: apellido.value,
        telefono: telefono.value,
    })
    .then (data => {
        console.log (data);
        location.reload()
    })
})

//GUARDAR INFORMACION DE LOS INPUT EN UN LOCALSTORAGE PARA ASI ACTUALIZAR LA PAGINA SIN PROBLEMA Y NO SE BORRE NADA
window.addEventListener('load', () => {
    cargarTablaContactos();
  });
  
  btnAgregarContacto.addEventListener('click', (event) => {
    event.preventDefault();
  
    const nombreValue = nombre.value;
    const apellidoValue = apellido.value;
    const telefonoValue = telefono.value;

    const contactos = JSON.parse(localStorage.getItem('contactos')) || [];
    contactos.push({ nombre: nombreValue, apellido: apellidoValue, telefono: telefonoValue });
    localStorage.setItem('contactos', JSON.stringify(contactos));
  
    nombre.value = '';
    apellido.value = '';
    telefono.value = '';
  
    cargarTablaContactos();
  });
  
  function cargarTablaContactos() {
    const tbody = document.querySelector('#cuerpo');
    const contactos = JSON.parse(localStorage.getItem('contactos')) || [];

    tbody.innerHTML = '';
  
    contactos.forEach((contacto) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${contacto.nombre}</td>
        <td>${contacto.apellido}</td>
        <td>${contacto.telefono}</td>
      `;
      tbody.appendChild(tr);
    });
  }
  