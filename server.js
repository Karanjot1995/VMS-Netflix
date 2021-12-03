const oracledb = require('oracledb');
const https = require('https')

oracledb.initOracleClient({libDir: process.env.HOME + '/Downloads/instantclient_19_8'});

async function run() {
  let result;
  let connection;
  try {

    connection = await oracledb.getConnection(  {
        user          : 'kxs9016',
        password      : 'Karannanda95',
        connectString : 'acaddbprod-2.uta.edu:1523/pcse1p.data.uta.edu',
    });      

    console.log("Successfully connected to Oracle Database");
    // console.log('Connection established')


    // Create a table


  } catch (err) {
    console.error('why this error: ', err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
return result
}

run();