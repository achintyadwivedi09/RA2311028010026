const express = require('express');
const Log = require('../logging_middleware');

const app = express();
app.use(express.json());

app.get('/test', async (req, res) => {
    await Log("backend", "info", "handler", "Test endpoint hit");

    res.json({
        message: "Backend working + logging working"
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});