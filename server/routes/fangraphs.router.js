const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const axios = require('axios');
const cheerio = require('cheerio');

// GET (test)
router.get('/', (req, res) => {
    
    const host = `https://www.fangraphs.com/`;

    // paramaters
    const sortCol = `6`;
    const type = `6`;
    const season = `2023`;
    const pageItems = `2000000000`;
    const team = `0%2Cts`;
    const stats = `bat`;
    const qual = `1`;
    const hand = `R`;

    const url = `https://www.fangraphs.com/leaders/major-league?sortcol=6&type=6&season=2023&pageitems=2000000000&team=0%2Cts&qual=1`;


    axios.get(url)
    .then( response => {
        const tableData = {
            headers: [],
            rows: []
        }
        console.log(response.data)
        const $ = cheerio.load(response.data);

        // header data
        const header = $('.table-fixed').find('thead th');
        console.log(header);
        header.each((i, el) => {
            const name = el.attribs["data-col-id"];
            if(name !== 'divider' && name)
                tableData.headers.push(name);
        })
        tableData.headers = [...new Set(tableData.headers)];

        const rowObj = {};
        tableData.headers.forEach(header => {
            rowObj[header] = '';
        })

        // row data
        const rows = $('.table-fixed').find('tbody tr');
        // console.log(rows);
        
        rows.each((i, el) => {
            const row = $(el).find('td');
            row.each((i, cell) => {
                const name = cell.attribs["data-stat"];
                if(name !== 'divider' && name)
                    rowObj[name] = $(cell).text();
            })
            tableData.rows.push(rowObj);
        });

        res.send(tableData);
    })
    .catch( error => {
        console.log('error in fangraphs.router GET:', error)
        res.sendStatus(500)
    })
})



module.exports = router;