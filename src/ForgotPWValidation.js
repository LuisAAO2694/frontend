function Validation(values) {
    let errors = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (values.email.trim() === "") {
      errors.email = "El email no debe de estar vacío";
    } else if (!email_pattern.test(values.email)) {
      errors.email = "El correo electrónico no es válido";
    } else {
      errors.email = "";
    }
  
    return errors;
  }
  
  export default Validation;
  