// backend/src/models/School.js
import mongoose from 'mongoose';

// Definición del esquema para la Escuela
const SchoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    since: { // Año de fundación o inicio de la escuela
        type: Number,
        required: true,
        min: 1900, // Un año de inicio razonable
        max: new Date().getFullYear() // No puede ser un año futuro
    }
    // Puedes añadir más campos si tu objeto SCHOOL tiene más propiedades
}, {
    timestamps: true // Añade createdAt y updatedAt
});

// Añadir un método al esquema para calcular el año actual (como en tu objeto SCHOOL)
SchoolSchema.methods.currentYear = function() {
    return new Date().getFullYear();
};

const School = mongoose.model('School', SchoolSchema);

export default School;