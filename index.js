const express = require('express');
const app = express();
const {Client} = require("pg");
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "sahil",
    database: "signup"
})
client.connect();
// client.query(`INSERT INTO studentdata(studentid,firstname,lastname,email,password) value()`, (err,result) => {
//      if(!err)
//      {
//         console.log(result.rows);
//      }
//      else{
//         console.log(err)
//      }
// })
const PORT = 3000;
const  bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname+"/public/index.html");
}); 
app.post('/signup',(req,res) => {
    var firstnm = req.body.firstnm;
    var lastnm = req.body.lastnm;
    var email = req.body.email;
    var password = req.body.pass; 
    client.query("INSERT INTO studentdata(firstname, lastname, email, password) value($1,$2,$3,$4)", [firstnm,lastnm,email,password]).then(data => {
        res.send(data);});
        res.send(firstnm);
})

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));