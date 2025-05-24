/**
 * @file Funciones para la gestión de mensajes de bienvenida a las aulas.
 * @description Este archivo implementa el concepto de 'closure' para crear
 * generadores de mensajes personalizados para las aulas, permitiendo que un
 * mensaje de bienvenida a una sala específica se pueda reutilizar para varios estudiantes.
 * @author Lav
 */

/**
 * @typedef {import("../db/rooms/roomsData.js").Room} Room
 */

import ROOMS from "../db/rooms/roomsData.js"; // Importa el array de aulas (rooms)

/**
 * Selecciona aleatoriamente el nombre de un aula disponible.
 * @returns {string} El nombre de un aula seleccionada al azar del array `ROOMS`.
 */
function getRandomRoomName() {
    // Genera un índice aleatorio válido para el array ROOMS (entre 0 y ROOMS.length - 1).
    const randomIndex = Math.floor(Math.random() * ROOMS.length);
    return ROOMS[randomIndex].name;
}

/**
 * Crea y devuelve una función (un 'closure') que genera un mensaje de bienvenida
 * para una sala aleatoria específica.
 *
 * La función retornada "recuerda" el `roomName` (que se selecciona aleatoriamente
 * cuando `createRoomMessage` es llamada) y lo utiliza cada vez que se le pasa
 * el nombre de un estudiante.
 *
 * @returns {function(string): string} Una función que acepta `studentName` (string)
 * y devuelve un mensaje de bienvenida (string) para la sala aleatoria preseleccionada.
 * @example
 * // En main.js:
 * const welcomeToScienceClass = createRoomMessage(); // welcomeToScienceClass es ahora una función
 * console.log(welcomeToScienceClass("Maria")); // Salida: "Hola Maria, bienvenid@ a: Sciences."
 */
export function createRoomMessage() {
    // roomName es capturado por el closure de la función interna.
    // Se selecciona una sala aleatoria CADA VEZ que createRoomMessage() es llamada.
    const roomName = getRandomRoomName();

    /**
     * Función interna (closure) que genera el mensaje de bienvenida para un estudiante
     * en la sala cuyo nombre ha sido capturado del ámbito externo.
     * @param {string} studentName - El nombre completo del estudiante.
     * @returns {string} El mensaje de bienvenida personalizado para el estudiante en esa sala.
     */
    return function (studentName) {
        const message = `Hola ${studentName}, bienvenid@ a: ${roomName}.`;
        return message;
    };
}