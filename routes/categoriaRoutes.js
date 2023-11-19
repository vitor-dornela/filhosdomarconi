const express = require('express');
const router = express.Router();
const connection = require('../connection/connection');

// GET /categoria
router.get('/', (req, res) => {
    connection.query('SELECT * FROM CATEGORIA', (error, results) => {
        if (error) {
            console.error("Error fetching categorias:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        res.json(results);
    });
});

// GET /categoria/emissao-total
router.get('/emissao-total', (req, res) => {
    connection.query(
        'SELECT c.ID AS CATEGORIA_ID, c.NOME AS CATEGORIA, SUM(h.EMISSAO_CO2) AS EMISSAO_TOTAL ' +
        'FROM CATEGORIA c ' +
        'LEFT JOIN EQUIPAMENTO e ON c.ID = e.CATEGORIA_ID ' +
        'LEFT JOIN EMISSAO_HISTORICO h ON e.ID = h.EQUIPAMENTO_ID ' +
        'GROUP BY c.ID, c.NOME;',
        (error, results) => {
            if (error) {
                console.error("Error fetching emissao total por categoria:", error);
                return res.status(500).json({ message: "Internal Server Error" });
            }
            res.json(results);
        }
    );
});


module.exports = router;
