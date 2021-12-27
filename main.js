let mysql = require('mysql')
let http = require('http')
let url = require('url')
let fs = require('fs')
let express = require('express')
let app = express()
let path = require('path')
let con = mysql.createConnection({
    user: 'durgesh',
    password: 'Binkle123@',
    hostname: '0.0.0.0',
    database: 'durgesh_schema'
})
con.connect((err, acc) => {
    if (err)
        throw err;
    else
        app.listen(1232)
})

app.all("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'), (err) => {
        if (err)
            console.log("something went wrong")
    })
})

app.all('/submit', (req, res) => {
    con.query("select * from worker", (err, data, attrib) => {
        let fields = []
        for (let obj of attrib) {
            fields.push(obj.name)
        }
        console.log(fields)
    })
})

app.all("/data",(req,res)=>{
    try{
    let query= url.parse(req.url).query
    let nw ={}
    let qu=`select * from worker where `
    for(let i of query.split('&')){
    qu=qu+" "+ i;
    }
    qu=decodeURIComponent(qu)
    con.query(qu,(err,data)=>{
        if(err)
        console.log("something is wrong!")
        else
        res.json(data)
    })
    }
    catch{
     res.status=404;
     res.send('')
    }
});

