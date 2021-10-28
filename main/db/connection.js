const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "#73899thaveN",
    database: "employee_db"
});

connection.connect(err => {
    if (err) throw err;
    console.log('connection established!');
    start();
});


