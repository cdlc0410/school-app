/**
 * @file Datos de la escuela.
 * @description Este archivo contiene información estática y dinámica sobre la escuela,
 * como su nombre, año de fundación y el año actual.
 * @author Lav
 */

/**
 * @typedef {object} School
 * @property {string} name - Nombre oficial de la escuela.
 * @property {number} since - Año de fundación de la escuela.
 * @property {function(): number} currentYear - Función que devuelve el año actual.
 */

/**
 * Objeto que contiene la información de la escuela.
 * @type {School}
 */
const SCHOOL = {
    name:"Academia CodeMasters",
    since: 2000,
    /**
     * Devuelve el año actual.
     * @returns {number} El año actual basado en la fecha del sistema.
     */
    currentYear: function () {
        let currentDate = new Date;
        return currentDate.getFullYear()
    }
}

export default SCHOOL;