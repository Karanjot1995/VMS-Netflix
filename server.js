
var express = require('express')
var app = express()
const oracledb = require('oracledb');
// const bodyParser  = require('body-parser');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

oracledb.outFormat = oracledb.OBJECT;


oracledb.initOracleClient({libDir: process.env.HOME + '/Downloads/instantclient_19_8'});

// async function getDataConnection(){
//     connection = await oracledb.getConnection(  {
//         user          : 'kxs9016',
//         password      : 'Karannanda95',
//         connectString : 'acaddbprod-2.uta.edu:1523/pcse1p.data.uta.edu',
//         // connectString: '(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = acaddbprod-2.uta.edu)(PORT = 1523))(CONNECT_DATA = (SID= ORCL)))'
//     }); 
// };


app.get('/all-movies', async (req, res) => {
    let connection;

    let data = {}
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

        connection.execute(
            `SELECT * FROM F21_S001_16_Content`,  
        function(err, result) {
            if (err) {
                console.error(err.message);
                return result;
            }
            else
            data.content = result
            return result;
        });

        connection.execute(
            `select ContentID, ContentName , 
                (select ContentType
                from F21_S001_16_ContentLocation CL
                where C.ContentID = CL.ContentID) as contentType
            from F21_S001_16_Content C
            where ContentID in (
                select ContentID
                from F21_S001_16_Watches
                group by ContentID
                order by count(ContentID) desc
                fetch first 5 rows only
            )`,
            function(err, result) {
                if (err) {
                    console.error(err.message);
                    return result;
                }
                else
                data.topRated = result
                return result;
            }
        )
    
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



app.post('/best-rated', async (req, res) => {
    let data = {}
    data.rating = Number(req.body.rating)
    let connection;
    try {
    
        connection = await oracledb.getConnection(  {
            user          : 'kxs9016',
            password      : 'Karannanda95',
            connectString : 'acaddbprod-2.uta.edu:1523/pcse1p.data.uta.edu',
        });      
    
        console.log("Successfully connected to Oracle Database");
    
        let d = new Date();
        let dt = d.getFullYear()+'/'+(d.getMonth()+1)


        connection.execute(
            `select C.ContentID, C.ContentName,
                (select avg(Rating)
                from F21_S001_16_RatingReview RR
                group by RR.ContentID
                having C.contentID = RR.ContentID
                )as avgRating,
                (select count(Rating)
                from F21_S001_16_RatingReview RR
                group by RR.ContentID
                having C.contentID = RR.ContentID
                )as ratingCount
            from F21_S001_16_Content C
            where contentID in (
                select contentID
                from F21_S001_16_RatingReview R2
                where C.contentID = R2.contentID
                group by R2.contentID
                having avg(Rating) >= ${req.body.rating}
            )
            order by avgRating asc`,
            function(err, result) {
                if (err) {
                    console.error(err.message);
                    return result;
                }
                else
                data.bestRated = result
                return result;
            }
        )
        // having avg(Rating) between (${req.body.maxRating},${req.body.minRating})
    
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




app.get('/all-customers', async (req, res) => {
    let data = {}
    let connection;
    try {
    
        connection = await oracledb.getConnection(  {
            user          : 'kxs9016',
            password      : 'Karannanda95',
            connectString : 'acaddbprod-2.uta.edu:1523/pcse1p.data.uta.edu',
        });      
    
        console.log("Successfully connected to Oracle Database");


        connection.execute(
            `SELECT * from F21_S001_16_Customer`,
            function(err, result) {
                if (err) {
                    console.error(err.message);
                    return result;
                }
                else
                data.customers = result
                return result;
            }
        )    
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




app.post('/add-customer', async (req, res) => {
    let d = req.body
    let data = [
        Number(d.customerid),d.fname,d.lname,new Date(d.dob), 
        d.userpassword, Number(d.phoneno), d.email, Number(d.cardno),
        Number(d.cvv),Number(d.expirydate)
    ]
    let connection;
    try {
    
        connection = await oracledb.getConnection(  {
            user          : 'kxs9016',
            password      : 'Karannanda95',
            connectString : 'acaddbprod-2.uta.edu:1523/pcse1p.data.uta.edu',
        });      

    
        console.log("Successfully connected to Oracle Database");

        const sql = `INSERT INTO F21_S001_16_Customer 
        (CustomerID,Fname,Lname,DOB,UserPassword,PhoneNo,Email,CardNo,CVV,ExpiryDate) 
        values(:1,:2,:3,:4,:5,:6,:7,:8,:9,:10)`
        
        let res = await connection.executeMany(sql,[data])
        connection.commit();
  
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
    res.send(req.body)
})




app.post('/country-content', async (req, res) => {
    let location = req.body.country
    let data = {}
    let connection;
    try {
    
        connection = await oracledb.getConnection(  {
            user          : 'kxs9016',
            password      : 'Karannanda95',
            connectString : 'acaddbprod-2.uta.edu:1523/pcse1p.data.uta.edu',
        });      
        console.log("Successfully connected to Oracle Database");

        connection.execute(
            `select C.ContentID, C.ContentName 
            from F21_S001_16_Content C 
            where C.ContentID NOT IN( 
                ( Select C.ContentID 
                from F21_S001_16_Content C ) 
                MINUS 
                ( Select CL.ContentID 
                from F21_S001_16_ContentLocation CL,F21_S001_16_Content C 
                where CL.ContentID = C.ContentID and CL.CONTENTLOCATION = '${location}') ) 
            order by C.ContentID asc`,
            function(err, result) {
                if (err) {
                    console.error(err.message);
                    return result;
                }
                else
                data.list = result
                return result;
            }
        )  
  
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





app.post('/search', async (req, res) => {
    let query = req.body.query
    console.log(query)
    let data = {}
    let connection;
    try {
    
        connection = await oracledb.getConnection(  {
            user          : 'kxs9016',
            password      : 'Karannanda95',
            connectString : 'acaddbprod-2.uta.edu:1523/pcse1p.data.uta.edu',
        });      
        console.log("Successfully connected to Oracle Database");
        if(query.length){
            connection.execute(
                `select ContentName, AverageRating
                from F21_S001_16_Content
                where lower(ContentName) like '${query}%'`,
                function(err, result) {
                    if (err) {
                        console.error(err.message);
                        return result;
                    }
                    else
                    data = result
                    return result;
                }
            )
        }

        // connection.execute(
        //     `select C.ContentID, C.ContentName 
        //     from F21_S001_16_Content C 
        //     where C.ContentID NOT IN( 
        //         ( Select C.ContentID 
        //         from F21_S001_16_Content C ) 
        //         MINUS 
        //         ( Select CL.ContentID 
        //         from F21_S001_16_ContentLocation CL,F21_S001_16_Content C 
        //         where CL.ContentID = C.ContentID and CL.CONTENTLOCATION = '${location}') ) 
        //     order by C.ContentID asc`,
        //     function(err, result) {
        //         if (err) {
        //             console.error(err.message);
        //             return result;
        //         }
        //         else
        //         data.list = result
        //         return result;
        //     }
        // )  
  
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




        // Create a table
        // const sql = "INSERT INTO F21_S001_16_Content (ContentID, ContentName, ContentLength, AverageRating, Date_of_Release) values(:1,:2,:3,:4,:5)"
        // let rows = [[21020, 'TEST', '300', 9.0, new Date(2021-12-03)]]
        // let res = await connection.executeMany(sql,rows)
        // console.log(res)
        // connection.commit();