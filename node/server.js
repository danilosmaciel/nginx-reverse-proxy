
const dataBaseConfig = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const express = require('express')
const mysql = require('mysql')
const connection = mysql.createConnection(dataBaseConfig);
const app = express()
const port = 3000

createTableAndInsert()

app.get('/', (req, res) => {
    
    getPeople(result =>{
        let returnMessage = `<h1>Full Cycle Rocks!</h1><br> - Lista de nomes cadastrada no banco de dados.<br>${result}`
        res.send(returnMessage)
    })
    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function createTableAndInsert(){
    let sqlCreate = "CREATE TABLE IF NOT EXISTS PEOPLE(ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, NAME VARCHAR(255))"
    try{
        connection.query(sqlCreate)
    }catch(erro){
        console.error(erro)
    }

    let name = "PEDRO"
    let sqlInsert = `INSERT INTO PEOPLE(NAME) VALUES('${name}')`
    let sqlQuerySearch = `SELECT NAME FROM PEOPLE WHERE NAME = '${name}'`
    try{
        connection.query(sqlQuerySearch, (erro, result) =>{
            if(erro) throw erro

            if(result[0]){
               return
            }
            connection.query(sqlInsert);
        })
        //connection.query(sqlInsert)
        
    }catch(erro){
        console.error(erro)
    }

}

async function getPeople(callback){
   
    let sqlQuery = "SELECT NAME AS NOME FROM PEOPLE"
    try{
        let result = await connection.query(sqlQuery, function (erro, results){
             if(erro) throw erro
            let result = ""
            for(nome of results){
                result += `<div>${nome.NOME}<\div><br>`
            }
            
            return callback(result);
        })
        
    }catch(erro){
        console.error(erro)
    }
    
   return ""
}

