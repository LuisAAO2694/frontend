// SignupValidation.js
function Validation(values) {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^s@]+$/;
    const password_pattern = /^[a-zA-Z0-9._]{8,14}$/; 
    const teamName_pattern = /^[a-zA-Z0-9._ ]{1,30}$/; 
  
    if (values.teamName === "") {
      error.teamName = "El nombre no debe de estar vacío";
    } else if (!teamName_pattern.test(values.teamName)) {
      error.teamName = "El nombre de la escudería no puede ser de mas de 30 caracteres";
    } else {
      error.teamName = "";
    }
  
    if (values.email === "") {
      error.email = "El email no debe de estar vacío";
    } else if (!email_pattern.test(values.email)) {
      error.email = "El correo electronico no coincide";
    } else {
      error.email = "";
    }
  
    if (values.password === "") {
      error.password = "La contraseña no debe de estar vacía";
    } else if (!password_pattern.test(values.password)) {
      error.password = "La contraseña debe de tener entre 8 y 14 caracteres";
    } else {
      error.password = "";
    }
  
    return error;
  }
  
  export default Validation;
  