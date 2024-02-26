const exp = require("constants")
const express = require("express")
const bodyparser = require("body-parser")
// ############################################### DB MYSQL CONNECTION
const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database :"dsu",
});

const connection  = con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
// ########################################

const app = express()
app.use(express.static(__dirname))
app.get("", (req,resp)=> {
   
   resp.redirect(__dirname + "login.html")

})
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json())
;
app.post("/login", (req, resp) => { 
                      console.log(req.body)
                      const name = req.body.name;
                      const password = req.body.password
                      try {
                      console.log(req.body)
                        connection.query(
                      "INSERT into cst2(name,password) values(?,?)",
                      [name,password],
                      (err,rows)=> { 
                        if(err) { 
                           console.log(err);
                      }
                        else {
                            resp.send(rows)
                        }
                      }
                      );
                      } catch (error) {
                       console.log(error)                     
                      }
})
app.listen(3004)

