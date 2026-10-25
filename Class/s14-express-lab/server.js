import express from 'express';
import mongoose from 'mongoose';
import { loadEnvFile } from "node:process";
import { getWeatherFrom } from './services/meteo-service.js';
import weatherRoutes from './routes/weatherRoutes.js';
import { createUser, findUser } from './services/user-service.js';

loadEnvFile();
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbName = "bdays";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const scientists = [
    { id: 1, name: "Dr. Elena Rostova", department: "Climate", projects: 4 },
    { id: 2, name: "Prof. Marcus Vance", department: "Oceanography", projects: 2 },
    { id: 3, name: "Dr. Aisha Khan", department: "Climate", projects: 7 }
];

const initiatives = [];

function connectDB(url) {
    mongoose.connect(url)
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.log(err.message));
}

const mongoUrl = `mongodb+srv://${dbUser}:${dbPass}@cluster0.2mlfg6k.mongodb.net/${dbName}`;
connectDB(mongoUrl);

app.get('/', function (req, res) {
    res.send('<h1>SustainHub API is running</h1>');
});

app.post("/user", async (req, res) => {
    const { username, name, email, password } = req.body;
    if (!username || !name || !email || !password) {
        return res.status(400).json({ error: 'Username, name, email, and password are required.' });
    }
    const user = await createUser({ username, name, email, password });
    if (!user) {
        return res.status(500).json({ error: 'Error creating user.' });
    }
    return res.status(201).json(user);
});

app.get('/api/scientists', function (req, res) {
    const { dept } = req.query;
    if (!dept) {
        return res.status(200).json(scientists);
    }
    const result = [];
    for (const scientist of scientists) {
        if (scientist.department.toLowerCase() === dept.toLowerCase()) {
            result.push(scientist);
        }
    }
    return res.status(200).json(result);
});

app.get('/api/scientists/:id', function (req, res) {
    const scientistId = parseInt(req.params.id, 10);
    const found = scientists.find((scientist) => scientist.id === scientistId);
    if (!found) {
        return res.status(404).json({ error: 'No scientist found.' });
    }
    return res.status(200).json(found);
});

app.get('/api/initiatives', function (req, res) {
    return res.status(200).json({ initiatives, status: 'Ok' });
});

app.post('/api/initiatives', function (req, res) {
    if (!req.body) {
        return res.status(400).json({ error: 'Title, budget, and department are required.' });
    }
    const { title, budget, department } = req.body;
    if (!title || budget === undefined || budget === null || budget === '' || !department) {
        return res.status(400).json({ error: 'Title, budget, and department are required.' });
    }
    const item = { id: initiatives.length + 1, title: title, budget: budget, department: department };
    initiatives.push(item);
    return res.status(201).json(item);
});

app.get('/greet', function (req, res) {
    const { name, city } = req.query;
    res.send(`hello ${name}, how is the weather in ${city}`);
});

const cities = {
    GDL: { lat: 20.6597, long: -103.349 },
    LSN: { lat: 46.52, long: 6.63 },
};

app.get('/weatherGDL', async function (req, res) {
    const respString = await getWeatherFrom(20.6766, -103.3475, 'Guadalajara');
    res.send(respString);
});

app.get('/weatherLSN', async function (req, res) {
    const respString = await getWeatherFrom(46.52, 6.63, 'Lausanne');
    res.send(respString);
});

app.get('/weather/:city', async function (req, res) {
    const { city } = req.params;
    if (!city) {
        return res.status(400).json({ error: 'City code required. Use GDL or LSN.' });
    }
    if (!cities[city]) {
        return res.status(400).json({ error: 'City code invalid. Use GDL or LSN.' });
    }
    const { lat, long } = cities[city];
    const respString = await getWeatherFrom(lat, long, city);
    res.send(respString);
});

app.use('/api/weather', weatherRoutes);

app.listen(PORT, () => {
    console.log(`SustainHub API Server running at http://localhost:${PORT}`);
});
