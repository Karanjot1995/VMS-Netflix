// const oracledb = require('oracledb');
// const https = require('https')

// oracledb.initOracleClient({libDir: process.env.HOME + '/Downloads/instantclient_19_8'});

// async function run() {
//   let result;
//   let connection;
//   try {

//     connection = await oracledb.getConnection(  {
//         user          : 'kxs9016',
//         password      : 'Karannanda95',
//         connectString : 'acaddbprod-2.uta.edu:1523/pcse1p.data.uta.edu',
//     });      
//     // result = https.get('https://jsonplaceholder.typicode.com/todos/1', res => {
//     //   console.log(`statusCode: ${res.statusCode}`)   
//     //   return res 
//     // })
//     // console.log(result) 
//     // let res = await Promise.all((resolve,reject)=>)

    
//     // fetch('https://jsonplaceholder.typicode.com/todos/1')
//     // .then(response => response.json())
//     // .then(json => console.log(json))
//     console.log("Successfully connected to Oracle Database");
//     // console.log('Connection established')


//     // Create a table


//   } catch (err) {
//     console.error('why this error: ', err);
//   } finally {
//     if (connection) {
//       try {
//         await connection.close();
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   }
// return result
// }

// run();

var app = require('express')();
const oracledb = require('oracledb');

oracledb.initOracleClient({libDir: process.env.HOME + '/Downloads/instantclient_19_8'});

app.get('/', async (req, res) => {
    let data = {}
    let connection;

    // async function run() {
    try {
    
        connection = await oracledb.getConnection(  {
            user          : 'kxs9016',
            password      : 'Karannanda95',
            connectString : 'acaddbprod-2.uta.edu:1523/pcse1p.data.uta.edu',
            // connectString: '(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = acaddbprod-2.uta.edu)(PORT = 1523))(CONNECT_DATA = (SID= ORCL)))'
        });      
    
        console.log("Successfully connected to Oracle Database");
    
        let d = new Date();
        let dt = d.getFullYear()+'/'+(d.getMonth()+1)
        // Create a table
        // const sql = "INSERT INTO F21_S001_16_Content (ContentID, ContentName, ContentLength, AverageRating, Date_of_Release) values(:1,:2,:3,:4,:5)"
        // let rows = [[21020, 'TEST', '300', 9.0, new Date(2021-12-03)]]
        // let res = await connection.executeMany(sql,rows)
        // console.log(res)
        // connection.commit();
        connection.execute(
            `SELECT * FROM F21_S001_16_Content`,  
        function(err, result) {
            if (err) {
                console.error(err.message);
                return result;
            }
            else
            data = result
            return result;
        });
    
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
    res.send(data)

})
  

var listener = app.listen(8000, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 8000
});


