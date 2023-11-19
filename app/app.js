const express = require('express');
const bodyParser = require('body-parser');
const equipamentoRoutes = require('../routes/equipamentoRoutes');
const categoriaRoutes = require('../routes/categoriaRoutes');

const app = express();
app.use(bodyParser.json());


// Routes
app.use('/equipamento', equipamentoRoutes);
app.use('/categoria', categoriaRoutes);

app.listen(4000, () => {
    console.log('Server is running on port: 4000');
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});
