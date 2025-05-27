// backend/routes/indexRoutes.js
import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';

// Express
const app = express()
// Router
const indexRoutes = express.Router()

// Definicion de path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirPublic = '../../public';

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, dirPublic)));

// Rutas
indexRoutes.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, dirPublic, 'index.html'));
    res.status(200)
});

export default indexRoutes;

