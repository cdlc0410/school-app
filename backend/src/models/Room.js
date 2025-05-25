// backend/src/models/Room.js
import mongoose from 'mongoose';

// Definición del esquema para la Habitación/Aula
const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    capacity: { // Capacidad de la habitación
        type: Number,
        min: 0,
        default: 0
    }
    // Puedes añadir más campos si tus objetos ROOMS tienen más propiedades
}, {
    timestamps: true
});

const Room = mongoose.model('Room', RoomSchema);

export default Room;