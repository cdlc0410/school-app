// backend/scripts/seedDb.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Importa tus modelos
import Student from '../src/models/Student.js';
import School from '../src/models/School.js'; // Nuevo
import Room from '../src/models/Room.js';     // Nuevo

// Importa tus datos iniciales
import STUDENTS_DATA from '../src/db/students/studentsData.js';
import SCHOOL_DATA from '../src/db/school.js';   // Nuevo: Asegúrate de que SCHOOL sea un objeto plano para la siembra
import ROOMS_DATA from '../src/db/rooms/roomsData.js'; // Nuevo

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI; // Obtén la URI de la BD desde .env

async function seedDatabase() {
    if (!MONGODB_URI) {
        console.error('Error: MONGODB_URI no está definido en el archivo .env');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Conectado a MongoDB Atlas para la siembra de datos.');

        // --- Siembra de la colección Students ---
        console.log('Eliminando estudiantes existentes...');
        await Student.deleteMany({});
        console.log('Estudiantes existentes eliminados.');
        console.log('Insertando nuevos estudiantes...');
        const insertedStudents = await Student.insertMany(STUDENTS_DATA);
        console.log(`Se insertaron ${insertedStudents.length} estudiantes.`);

        // --- Siembra de la colección Schools ---
        // Como SCHOOL_DATA es un objeto singular y no un array, lo envolvemos en un array para insertMany
        // O podemos usar create. Primero eliminamos si ya existe, y luego creamos el documento único.
        console.log('Eliminando información de escuela existente...');
        await School.deleteMany({}); // Solo debería haber uno, pero deleteMany es seguro
        console.log('Información de escuela existente eliminada.');
        console.log('Insertando información de la escuela...');
        // Asegúrate de que SCHOOL_DATA.name y SCHOOL_DATA.since existan y sean del tipo correcto
        // Aquí creamos una nueva instancia del modelo para guardar
        const schoolDoc = new School({
            name: SCHOOL_DATA.name,
            since: SCHOOL_DATA.since
        });
        const insertedSchool = await schoolDoc.save(); // save() para un solo documento
        console.log(`Se insertó la información de la escuela: ${insertedSchool.name}.`);

        // --- Siembra de la colección Rooms ---
        console.log('Eliminando aulas existentes...');
        await Room.deleteMany({});
        console.log('Aulas existentes eliminadas.');
        console.log('Insertando nuevas aulas...');
        const insertedRooms = await Room.insertMany(ROOMS_DATA);
        console.log(`Se insertaron ${insertedRooms.length} aulas.`);

        console.log('Siembra de la base de datos completada exitosamente.');

    } catch (error) {
        console.error('Error durante la siembra de la base de datos:', error);
        // Captura errores específicos de validación o duplicados si ocurren
        if (error.code === 11000) { // Código de error para duplicados en índices únicos
            console.error('Error de duplicado: Un documento con un campo único ya existe.');
        }
    } finally {
        await mongoose.disconnect();
        console.log('Desconectado de MongoDB Atlas.');
        process.exit(0);
    }
}

seedDatabase();