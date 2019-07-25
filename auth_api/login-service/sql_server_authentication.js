exports._doLogin = function (req, res) {

    const CryptoJS = require("crypto-js");
    const secretKey = '0051006f0039003400760030004a0070';
    let _username = CryptoJS.AES.decrypt(req.body.dados.username.toString(), secretKey);
    let _usernameDecrypted = _username.toString(CryptoJS.enc.Utf8);
    let _sentPassword = req.body.dados.password;

    // Autenticação usuário - Descripitografando senha do formulário de login

    let _procedureControl = req.body.dados.procedureControl || 1;
    let _procedureNewPassword = req.body.dados.procedureNewPassword || " ";

    if (_procedureControl === 1) {
        console.log("_procedureControl ", _procedureControl)
        var _passwordformDescrypted = CryptoJS.AES.decrypt(_sentPassword.toString(), secretKey);
        var _userpasswordformString = _passwordformDescrypted.toString(CryptoJS.enc.Utf8);

    }

    const sql = require('mssql');
    let sqlConfig = {
        user: 'sa',
        password: '@Wk1VE!?GV%1=Mg#8',
        server: "189.76.208.164",
        database: 'MyLabDatabase',
        options: {
            encrypt: false,
            instanceName: 'WKVEDW'
        }
    }

    sql.connect(sqlConfig).then(function (pool) {
        console.log("==== DATABASE CONNECTED =====");


        let query = "EXEC WKVE_GED_AUTH '" + _usernameDecrypted + "','" + _procedureNewPassword + "','" + _procedureControl + "'";
        console.log("query  --->", query);
        return pool.request().query(query).then(function (result) {
            console.log("*** DETALHES RETORNADOS COM SUCESSO *** ");

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
        console.log("ERRO SQL PROTHEUS", errsql);
        sql.close();
        res.json(
            {
                "status": false,
                "msg": "ERRO SQL PROTHEUS"
            }
        )
    })

} 