import mysql from 'mysql2'
// const mysql = require('mysql2');

export var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mimigins2005**",
  database: "myProject"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE if not exists myProject", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});



