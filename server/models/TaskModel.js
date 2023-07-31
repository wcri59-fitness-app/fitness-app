const {Pool} = require('pg');

const myURI = 'postgres://xrriwzxh:rnKutmCqLTfxlpIfjqlxNUWAGioa_ZoU@mahmud.db.elephantsql.com/xrriwzxh';

const pool = new Pool({
  connectionString: myURI,
});

// pool.on('connect', () => {
//   console.log('Connected to PostgreSQL database');
// });

module.exports = {
  query: (text, params, callback) => {
    console.log('Executed query', text);
    return pool.query(text, params, callback);
  },
};
