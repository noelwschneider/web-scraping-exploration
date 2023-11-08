const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {

    console.log('in example.router GET')
    
    const queryText = `
        SELECT * FROM example
    `

    pool.query(queryText)
    .then( result => {
        res.send(result.rows)
    })
    .catch (error => {
        console.log('error in example.router GET:', error)
        res.sendStatus(500)
    })
})

router.post('/', (req, res) => {
    const int = 1
    const str = 'one'

    const queryText = `
        INSERT INTO example (integer, string)
        VALUES
            ($1, $2)
        ;
    `

    pool.query(queryText, [int, str])
    .then( result => {
        console.log('Success in example.router POST')
    })
    .catch( error => {
        console.log('error in example.router POST:', error)
        res.sendStatus(500)
    })
})


module.exports = router;