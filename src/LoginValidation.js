function Validation(values)
{
    let error = {}
    //const email_pattern = /^[^\s@]+@[^\s@]+\.[^s@]+$/;
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^[a-zA-Z0-9._]{8,14}$/;

    if(values.email === "")
    {
        error.email = "El email no debe de estar vacío"
    }
    else if(!email_pattern.test(values.email))
    {
        error.email = "El correo electronico no coincide"
    }
    else
    {
        error.email = ""
    }

    if(values.password === "")
    {
        error.password = "La contraseña no debe de estar vacía"
    }
    else if(!password_pattern.test(values.password))
    {
        error.password = "La contraseña no coincide"
    }
    else
    {
        error.password = ""
    }
    return error;
}

export default Validation;