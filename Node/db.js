const { Pool } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json());
const pool = new Pool({
    user :'postgres',
    password : 'root',
    host :'localhost',
    port : '5432',
    database : 'Tasks'
})
module.exports ={
    query:(text,params)=>pool.query(text,params)
}