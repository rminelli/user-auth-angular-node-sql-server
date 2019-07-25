exports.getLoginData = function (req, res) {

    let _userName = req.body.userName
    let _userPassword = req.body.userPassword

    const sql = require('mssql'); // Update data for connection to your database instance
    let sqlConfig = {
        user: 'sa',
        password: 'password',
        server: 'localhost',
        database: 'MyLabDatabase',
        options: {
            encrypt: false,
            instanceName: 'myinstance'
        }
    }

    sql.connect(sqlConfig).then(function (pool) {
        console.log("==== DATABASE CONNECTED =====");


        let query = "EXEC UserAuthentication '" + _userName + "'";
        console.log(`Query  ---> ${query}`);
        return pool.request().query(query).then(function (result) {
        console.log("*** Data successfully returned *** ");

            let _returnSql = result.recordset[0].RETURN;

            if (_returnSql === 1) {
                console.log("User does not exist");
                sql.close();
                return res.json(
                    {
                        "status": false,
                        "msg": "User does not exist",
                        "cod": 1
                    }
                )
            } else {
                // Verifying Password
                console.log(`Passwords ->  browser: ${_userPassword} and SQL: ${_returnSql}`)

                if (_userPassword == _returnSql) {
                    console.log("Authenticated");
                    sql.close();
                    delete result.recordset[0].RETURN;
                    res.json(
                        {
                            "status": true,
                            "msg": "Valid User"                            
                        }
                    )
                }
                else {
                    console.log("Unauthenticated");
                    sql.close();
                    res.json(
                        {
                            "status": false,
                            "msg": "Incorrect Password"
                        }
                    )

                }
            }
        }).catch(function (err) {
            console.log("SQL Error", err);
            sql.close();
            res.json(
                {
                    "status": false,
                    "msg": "SQL Error"
                }
            )
        });
    }).catch(function (errsql) {
        console.log("SQL Error", errsql);
        sql.close();
        res.json(
            {
                "status": false,
                "msg": "SQL Error"
            }
        )
    })
}