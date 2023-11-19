const express = require('express');
const router = express.Router();
const connection = require('../connection/connection');

// GET /equipamento/emissao-total
router.get('/emissao-total', (req, res) => {
    connection.query(
        'SELECT e.id AS EQUIPAMENTO_ID, e.COD_EQUIP, e.MODELO, c.NOME AS CATEGORIA, SUM(h.EMISSAO_CO2) AS EMISSAO_TOTAL ' +
        'FROM EQUIPAMENTO e ' +
        'LEFT JOIN EMISSAO_HISTORICO h ON e.ID = h.EQUIPAMENTO_ID ' +
        'LEFT JOIN CATEGORIA c ON e.CATEGORIA_ID = c.ID ' +
        'GROUP BY e.id, e.COD_EQUIP, e.MODELO, c.NOME;',
        (error, results) => {
            if (error) {
                console.error("Error fetching total de emissao de co2 por equipamento:", error);
                return res.status(500).json({ message: "Internal Server Error" });
            }
            res.json(results);
        }
    );
});


// GET /equipamento
router.get('/', (req, res) => {
    connection.query('SELECT * FROM EQUIPAMENTO;', (error, results) => {
        if (error) {
            console.error("Error fetching equipamentos:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        res.json(results);
    });
});

// POST /equipamento
router.post('/', (req, res) => {
    if (!req.body || req.body.length === 0) {
        return res.status(400).json({ message: "Invalid request body" });
    }

    const { COD_EQUIP, MODELO, ANO_FABRICACAO, CONSUMO_COMBUSTIVEL, EMISSAO_CO2_HORA, HORAS_TRABALHADAS, CATEGORIA_ID } = req.body[0];

    connection.query(
        'INSERT INTO equipamento (cod_equip, modelo, ano_fabricacao, consumo_combustivel, emissao_co2_hora, horas_trabalhadas, categoria_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [COD_EQUIP, MODELO, ANO_FABRICACAO, CONSUMO_COMBUSTIVEL, EMISSAO_CO2_HORA, HORAS_TRABALHADAS, CATEGORIA_ID],
        (error, results) => {
            if (error) {
                console.error("Error creating equipamento:", error);
                return res.status(500).json({ message: "Internal Server Error" });
            }

            res.status(201).json({ id: results.insertId, COD_EQUIP, MODELO, ANO_FABRICACAO, CONSUMO_COMBUSTIVEL, EMISSAO_CO2_HORA, HORAS_TRABALHADAS, CATEGORIA_ID });
        }
    );
});

module.exports = router;
