const { Client } = require('pg');

const client = new Client({
  user: 'postgres',     
  host: 'localhost',
  database: 'company_management',  
  password: 'postgres',  
  port: 5432,
});

client.connect();

module.exports = client;
