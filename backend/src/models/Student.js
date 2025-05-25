// backend/src/models/Student.js
import mongoose from 'mongoose';

/**
 * @typedef {object} StudentSchemaDefinition
 * @property {number} id - ID único personalizado para el estudiante. Es requerido y debe ser único.
 * @property {string} first_name - El primer nombre del estudiante. Requerido y se le eliminarán los espacios en blanco.
 * @property {string} last_name - El apellido del estudiante. Requerido y se le eliminarán los espacios en blanco.
 * @property {Date} dob - La fecha de nacimiento del estudiante. Requerido.
 * @property {number} age - La edad del estudiante. Requerido y debe estar entre 0 y 150.
 * @property {number} grade - La calificación del estudiante. Requerido y debe estar entre 0 y 100.
 * @property {boolean} approved - Indica si el estudiante ha aprobado. Por defecto es falso.
 * @property {string} gradeMsg - Un mensaje relacionado con la calificación (ej. "Ha aprobado"). Por defecto es una cadena vacía.
 * @property {string} [room] - El nombre de la habitación del estudiante (opcional). Por defecto es una cadena vacía.
 */

// Definición del esquema para el estudiante
const StudentSchema = new mongoose.Schema({
    // El _id de MongoDB será generado automáticamente por la base de datos.
    // Usamos 'id' como una propiedad personalizada para compatibilidad con tus datos existentes.
    id: {
        type: Number,
        required: true,
        unique: true, // Esto asegura que no haya dos estudiantes con el mismo ID personalizado
        index: true   // Crea un índice para búsquedas rápidas por este ID
    },
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    dob: { // Date of Birth
        type: Date,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 150
    },
    grade: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    approved: {
        type: Boolean,
        default: false
    },
    gradeMsg: {
        type: String,
        default: ''
    },
    room: {
        type: String, // Podría ser una referencia a un modelo 'Room' más adelante
        default: ''
    }
}, {
    // Opciones del esquema
    timestamps: true // Añade `createdAt` y `updatedAt` automáticamente
});

/**
 * Método de instancia para obtener el nombre completo del estudiante.
 * @returns {string} El nombre completo del estudiante.
 */
StudentSchema.methods.getFullName = function() {
    return `${this.first_name} ${this.last_name}`;
};

// Compilar el esquema en un modelo.
// 'Student' es el nombre del modelo. Mongoose automáticamente pluralizará esto a 'students'
// para el nombre de la colección en MongoDB.
const Student = mongoose.model('Student', StudentSchema);

export default Student; // Exporta el modelo para que pueda ser importado y usado en otras partes.