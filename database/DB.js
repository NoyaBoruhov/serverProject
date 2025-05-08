var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Nb171204*",
  database: "myProject"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});
con.query("SELECT * FROM users",(err,result,fields)=>{
    if(err) throw err;
    console.log(result);
})


