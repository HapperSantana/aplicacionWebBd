const url="https://vyewpopdrrlhmgoipptd.supabase.co";
const key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5ZXdwb3BkcnJsaG1nb2lwcHRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMjE3MzYsImV4cCI6MjA2MDU5NzczNn0.bU7DgNt0MoWI4QAp30CeaGpc85OtmuXyAl6r0FUnYBE";

const database = supabase.createClient(url,key);
var idEmpleado = "";
let crearBtn = document.getElementById("crear");

crearBtn.addEventListener("click", async(e)=>{
    e.preventDefault();

    let nombresInput = document.getElementById("nombres");
    let apellidosInput = document.getElementById("apellidos");
    let emailInput = document.getElementById("email");
    let telefonoInput = document.getElementById("telefono");
    let direccionInput = document.getElementById("direccion");
    let puestoInput = document.getElementById("puesto");
    let sueldoInput = document.getElementById("sueldo");

    if (nombresInput.value != "" && apellidosInput.value != "" && emailInput.value != "" && telefonoInput.value != "" && direccionInput.value != "" && sueldoInput.value != "") {
      let respuesta = await database.from("empleados").insert({
        nombres:nombresInput.value,
        apellidos:apellidosInput.value,
        email:emailInput.value,
        telefono:telefonoInput.value,
        direccion:direccionInput.value,
        puesto:puestoInput.value,
        sueldo:sueldoInput.value
    })

    if (respuesta) {
        Toastify({
            text: "El empleado se agrego con exito..",
            duration: 3000,
            destination: "#",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: false, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function(){} // Callback after click
          }).showToast();
        //alert("empleado se agrego");
        nombresInput.value = "";
        apellidosInput.value = "";
        emailInput.value = "";
        telefonoInput.value = "",
        direccionInput.value = "",
        puestoInput.value = "Recepcionista";
        sueldoInput.value = "";
        getEmpleados();
        
    } else {
        Toastify({
            text: "ALgo salio mal, no se pudo agregar empleado",
            className: "info",
            style: {
              background: "linear-gradient(to right,rgb(250, 41, 4),rgb(252, 13, 5))",
            }
          }).showToast();
    }
    } else {
      Toastify({
        text: "Todos los campos son necesarios.",
        className: "info",
        style: {
          background: "linear-gradient(to right,rgb(250, 41, 4),rgb(252, 13, 5))",
        }
      }).showToast();


    }

        
})
const getEmpleados =  async() => {
    let tbody = document.getElementById("tbody");
    let tr="";

    const respuesta = await database.from("empleados").select("*");

    if (respuesta) {
        //console.log(respuesta.data);
        for (var i in respuesta.data) {
            tr +=`<tr>
                <td>${respuesta.data[i].id}</td>
                <td>${respuesta.data[i].nombres}</td>
                <td>${respuesta.data[i].apellidos}</td>
                <td>${respuesta.data[i].email}</td>
                <td>${respuesta.data[i].telefono}</td>
                <td>${respuesta.data[i].direccion}</td>
                <td>${respuesta.data[i].puesto}</td>
                <td>${respuesta.data[i].sueldo}</td>
                <td>
                <button class="btn btn-warning btn-sm me-2" onclick="editarEmpleado(${respuesta.data[i].id})">
                    Editar
                </button>
                <button class="btn btn-danger btn-sm me-2" onclick="borrarEmpleado(${respuesta.data[i].id})">
                    Borrar
                </button>
                </td>

            </tr>`;

            
        }
        
        tbody.innerHTML = tr;
        let table = new DataTable('#myTable');
    } 

}
getEmpleados();

const editarEmpleado = async(id) => {
    const respuesta = await database.from("empleados").select("*").eq("id",id);
    idEmpleado = id;
    let actualizarBtn = document.getElementById("actualizar");
    actualizarBtn.hidden = false;
    let crearBtn = document.getElementById("crear");
    crearBtn.hidden = true;
    let nombresInput = document.getElementById("nombres");
    let apellidosInput = document.getElementById("apellidos");
    let emailInput = document.getElementById("email");
    let telefonoInput = document.getElementById("telefono");
    let direccionInput = document.getElementById("direccion");
    let puestoInput = document.getElementById("puesto");
    let sueldoInput = document.getElementById("sueldo");
    
    if (respuesta) {
        
        nombresInput.value = respuesta.data[0].nombres;
        apellidosInput.value = respuesta.data[0].apellidos;
        emailInput.value = respuesta.data[0].email;
        telefonoInput.value = respuesta.data[0].telefono,
        direccionInput.value = respuesta.data[0].direccion,
        puestoInput.value = respuesta.data[0].puesto;
        sueldoInput.value = respuesta.data[0].sueldo;
    } else {
        Toastify({
            text: "ALgo salio mal, no se puede editar empleado",
            className: "info",
            style: {
              background: "linear-gradient(to right,rgb(250, 41, 4),rgb(252, 13, 5))",
            }
          }).showToast();
    }
}

const actualizarEmpleado = async() => {
    
    let nombresInput = document.getElementById("nombres");
    let apellidosInput = document.getElementById("apellidos");
    let emailInput = document.getElementById("email");
    let telefonoInput = document.getElementById("telefono");
    let direccionInput = document.getElementById("direccion");
    let puestoInput = document.getElementById("puesto");
    let sueldoInput = document.getElementById("sueldo");
    
    const respuesta = await database.from("empleados")
    .update({
        nombres:nombresInput.value,
        apellidos:apellidosInput.value,
        email:emailInput.value,
        telefono:telefonoInput.value,
        direccion:direccionInput.value,
        puesto:puestoInput.value,
        sueldo:sueldoInput.value
    }).eq("id",idEmpleado)
    
    
    if (respuesta) {
        Toastify({
            text: "El empleado se actualizo correctamente..",
            duration: 3000,
            destination: "#",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: false, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function(){} // Callback after click
          }).showToast();
        let actualizarBtn = document.getElementById("actualizar");
        actualizarBtn.hidden = true;
        let crearBtn = document.getElementById("crear");
        crearBtn.hidden = false; 
        nombresInput.value = "";
        apellidosInput.value = "";
        emailInput.value = "";
        telefonoInput.value = "",
        direccionInput.value = "",
        puestoInput.value = "Recepcionista";
        sueldoInput.value = "";
        getEmpleados();
        
    } else {
        Toastify({
            text: "ALgo salio mal, no se puede editar empleado",
            className: "info",
            style: {
              background: "linear-gradient(to right,rgb(250, 41, 4),rgb(252, 13, 5))",
            }
          }).showToast();
        
    }
}

const borrarEmpleado = async(id) => {
   /*  alert("borrar ");
    alert(id); */
    const respuesta = await database.from("empleados").delete().eq("id",id);
    
    if (respuesta) {
        Toastify({
            text: "El empleado se ha eliminado..",
            duration: 3000,
            destination: "#",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: false, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function(){} // Callback after click
          }).showToast();
        getEmpleados();
    } else {
        Toastify({
            text: "No se pudo eliminar el empleado.",
            className: "info",
            style: {
              background: "linear-gradient(to right,rgb(250, 41, 4),rgb(252, 13, 5))",
            }
          }).showToast();
    }

}