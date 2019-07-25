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
            console.log("*** DETALHES RETORNADOS COM SUCESSO ** ");

            let _returnSql = result.recordset[0].RETURN;

            if (_returnSql === 1) {
                sql.close();
                return res.json(
                    {
                        "status": false,
                        "msg": "Usuário inválido",
                        "cod": 1
                    }
                )
            }
            else if (_returnSql === 2) {
                sql.close();
                return res.json(
                    {
                        "status": false,
                        "msg": "Senha não cadastrada",
                        "cod": 2
                    }
                )
            }
            else if (_returnSql === 22) {
                sql.close();
                return res.json(
                    {
                        "status": true,
                        "msg": "Senha cadastrada com sucesso",
                        "cod": 22
                    }
                )
            }
            else {
                // Autenticação usuário - Descripitografando senha do banco
                let _userpasswordDecrypted = CryptoJS.AES.decrypt(_returnSql.toString(), secretKey);
                let _userpasswordString = _userpasswordDecrypted.toString(CryptoJS.enc.Utf8);
                if (_userpasswordString == _userpasswordformString) {
                    console.log("Autenticado");
                    sql.close();
                    delete result.recordset[0].RETURN;
                    res.json(
                        {
                            "status": true,
                            "msg": "Usuário Válido",
                            "userData": result.recordset[0],
                            "cod": 3
                        }
                    )

                }
                else {
                    console.log("Não autenticado");
                    sql.close();
                    res.json(
                        {
                            "status": false,
                            "msg": "Senha incorreta",
                            "cod": 4
                        }
                    )

                }
            }


        }).catch(function (err) {
            console.log("ERROR SQL", err);
            sql.close();
            res.json(
                {
                    "status": false,
                    "msg": "ERROR SQL"
                }
            )
        });

    }).catch(function (errsql) {
        console.log("ERRO SQL ", errsql);
        sql.close();
        res.json(
            {
                "status": false,
                "msg": "ERRO SQL "
            }
        )
    })


    



   

}