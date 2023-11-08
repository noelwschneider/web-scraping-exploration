const pg = require('pg');
let pool;

// Database connection when running app on internet
if (process.env.DATABASE_URL) {
    pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
}
// Database connection when running app locally
else {
    pool = new pg.Pool({
        host: 'localhost',
        port: 5432,

        // UPDATE THIS WITH YOUR PROJECT DATABASE!
        database: 'example_database', 
    });
}

module.exports = pool;