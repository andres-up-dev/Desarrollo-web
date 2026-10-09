import express from 'express';

const app = express();
const PORT = 3000;

// ==========================================
// 1. MIDDLEWARE CONFIGURATION
// ==========================================
// TODO: Mount built-in JSON body parser middleware (app.use(express.json()))
app.use(express.json());

// Mock In-Memory Database
const scientists = [
    { id: 1, name: "Dr. Elena Rostova", department: "Climate", projects: 4 },
    { id: 2, name: "Prof. Marcus Vance", department: "Oceanography", projects: 2 },
    { id: 3, name: "Dr. Aisha Khan", department: "Climate", projects: 7 }
];

const initiatives = [];

// ==========================================
// 2. ROUTES & ENDPOINTS
// ==========================================

// 2a. HTML Root Landing Route
// TODO: Create GET '/' endpoint returning a basic HTML status heading string using res.send()
app.get('/', function (req, res) {
    res.send('<h1>Sustainhub api is running</h1>');
});

// 2b. GET All Scientists with Query Filtering (req.query)
// TODO: Create GET '/api/scientists' endpoint
// - If req.query.dept is provided, filter scientists by department
// - Return JSON response with status 200: res.json(...)
app.get('/api/scientists', function (req, res) {
    const dept = req.query.dept;

    if (!dept) {
        return res.status(200).json(scientists);
    }

    let result = [];
    for (let i = 0; i < scientists.length; i++) {
        if (scientists[i].department.toLowerCase() === dept.toLowerCase()) {
            result.push(scientists[i]);
        }
    }
    res.status(200).json(result);
});

// 2c. GET Single Scientist by ID (req.params)
// TODO: Create GET '/api/scientists/:id' endpoint
// - Parse req.params.id as an integer
// - Find scientist matching ID
// - Return 404 JSON error if not found, or 200 JSON object if found
app.get('/api/scientists/:id', function (req, res) {
    const id = parseInt(req.params.id);
    let found = null;

    for (let i = 0; i < scientists.length; i++) {
        if (scientists[i].id === id) {
            found = scientists[i];
        }
    }

    if (!found) {
        return res.status(404).json({ error: 'no scientist found with that id' });
    }
    res.status(200).json(found);
});

// 2d. POST Create New Initiative (req.body)
// TODO: Create POST '/api/initiatives' endpoint
// - Extract title, budget, and department from req.body
// - Validate fields (return 400 JSON error if missing)
// - Create new initiative object, push to array
// - Return 201 Created JSON response
app.post('/api/initiatives', function (req, res) {
    const title = req.body.title;
    const budget = req.body.budget;
    const department = req.body.department;

    if (!title || !budget || !department) {
        return res.status(400).json({ error: 'you need to send title, budget and department' });
    }

    const item = { id: initiatives.length + 1, title: title, budget: budget, department: department };
    initiatives.push(item);
    res.status(201).json(item);
});

// ==========================================
// 3. SERVER INITIALIZATION
// ==========================================
app.listen(PORT, () => {
    console.log(`🚀 SustainHub API Server running at http://localhost:${PORT}`);
});
