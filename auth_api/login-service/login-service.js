exports.getLoginData = function (req, res) {

    let _userName = req.body.userName
    let _userPassword = req.body.userName

    console.log(_userName, _userPassword)

    const sql = require('mssql');
    let sqlConfig = {
        user: 'sa',
        password: 'password',
        server: "localhost",
        database: 'MyLabDatabase',
        options: {
            encrypt: false,
            instanceName: 'MyIntance'
        }
    }

    sql.connect(sqlConfig).then(function (pool) {
        console.log("==== DATABASE CONNECTED =====");


        let query = "EXEC UserAuthentication '" + _userName + "'";
        console.log("query  --->", query);
        return pool.request().query(query).then(function (result) {
            console.log("*** Data successfully returned *** ");

            let _returnSql = result.recordset[0].RETURN;

            if (_returnSql === 1) {
                sql.close();
                return res.json(
                    {
                        "status": false,
                        "msg": "Invalid user",
                        "cod": 1
                    }
                )
            } else {
                // User Authentication
                let _userPasswordReturn = _returnSql.toString()
                if (_userPassword == _userPasswordReturn) {
                    console.log("Authenticated");
                    sql.close();
                    delete result.recordset[0].RETURN;
                    res.json(
                        {
                            "status": true,
                            "msg": "Valid User",
                            "userData": result.recordset[0]
                        }
                    )

                }
                else {
                    console.log("Não Unauthenticated");
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