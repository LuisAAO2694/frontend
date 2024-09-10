// validation.js
const validateForm = ({ titulo, informacion }) => {
    let validationErrors = {};

    // Validación del campo 'titulo'
    if (!titulo.trim()) {
        validationErrors.titulo = 'El título no puede estar vacío';
    } else if (titulo.length > 100) {
        validationErrors.titulo = 'El título no puede tener más de 100 caracteres';
    }

    // Validación del campo 'informacion'
    if (!informacion.trim()) {
        validationErrors.informacion = 'El contenido de la nota no puede estar vacío';
    } else if (informacion.length > 500) {
        validationErrors.informacion = 'El contenido de la nota no puede tener más de 500 caracteres';
    }

    return validationErrors;
};

export default validateForm;
