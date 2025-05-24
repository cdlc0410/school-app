/**
 * @file Archivo principal de la lógica de la escuela.
 * @description Orquesta la evaluación de estudiantes, la generación del estado general de la escuela
 * y la creación de mensajes de bienvenida a las aulas utilizando closures.
 * @author Lav
 */

// Importaciones de módulos y datos
import STUDENTS from "./src/db/students/studentsData.js";
import SCHOOL from "./src/db/school.js";
import { generalStatus } from "./src/utils/generalStatus.js";
import { evaluateStudent } from "./src/utils/evaluateGrades.js";
// Nota: Has cambiado studentsUtils.js, lo cual es una excelente refactorización.
// Asegúrate de que showStudents y updateAgeStudents estén exportadas desde allí.
import { updateAgeStudents, showStudents } from "./src/utils/studentsUtils.js";
import { createRoomMessage } from "./src/utils/msgRooms.js";

/**
 * Función principal que orquesta todas las operaciones de la lógica de la escuela.
 * Realiza la evaluación de los estudiantes, calcula y muestra el estado general
 * de la escuela, y genera mensajes de bienvenida personalizados para los estudiantes.
 */
function main() {
    console.clear(); // Limpia la consola al inicio de la ejecución.

    // Opcional: Actualizar edades y recalcular notas antes de evaluar.
    // Estas líneas están comentadas, pero son un buen ejemplo de cómo se usarían.
    // updateAgeStudents(STUDENTS); // Actualiza la edad de cada estudiante.
    // recalculateGrades(STUDENTS); // Recalcula las notas de los estudiantes con valores aleatorios.

    // Paso 1: Evaluar a cada estudiante.
    // La función `evaluateStudent` itera sobre el array de estudiantes y actualiza
    // sus propiedades 'approved' y 'gradeMsg' basándose en sus calificaciones.
    console.log("--- Evaluando Estudiantes ---");
    evaluateStudent(STUDENTS);

    // Paso 2: Obtener y mostrar el estado general de la escuela.
    // La función `generalStatus` calcula estadísticas clave sobre la escuela
    // y la población estudiantil, luego las imprime en la consola.
    console.log("\n--- Estado General de la Escuela ---");
    generalStatus(SCHOOL, STUDENTS);

    // Paso 3: Crear generadores de mensajes de aula utilizando el concepto de Closures.
    console.log("\n--- Mensajes de Aula Personalizados ---");

    // `createRoomMessage()` ahora devuelve una función (el closure) que "recuerda"
    // el nombre de una sala aleatoria. Esta función retornada puede ser usada
    // múltiples veces para generar mensajes para diferentes estudiantes en esa misma sala.
    const welcomeToRandomRoomForStudent = createRoomMessage();

    // Itera sobre cada estudiante para generar y mostrar su mensaje de bienvenida personalizado.
    STUDENTS.forEach(student => {
        // Combina el primer nombre y el apellido del estudiante para el mensaje.
        let studentFullName = `${student.first_name} ${student.last_name}`;
        // Llama a la función closure `welcomeToRandomRoomForStudent` con el nombre completo del estudiante.
        // Esta función retornada generará el mensaje específico para ese estudiante en la sala "recordada".
        console.log(welcomeToRandomRoomForStudent(studentFullName));
    });
}

// Ejecuta la función principal para iniciar la lógica de la escuela.
main();