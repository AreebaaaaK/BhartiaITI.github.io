const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3500;
app.use(bodyParser.urlencoded({ extended: false }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'areeba018',
    database: 'webtech'
});

const c=connection.connect();
console.log(c);

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/application.html");
});
app.post('/submit', (req, res) => {
    const { Name, fatherName, motherName, dob, gender, caste, number, email, mobile, course, year, RollNo,Marks,} = req.body;
    const sql = 'INSERT INTO application(Name, fatherName, motherName, dob, gender, caste, number, email, mobile, course, year, RollNo,Marks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [Name, fatherName, motherName, dob, gender, caste, number, email, mobile, course, year, RollNo,Marks,], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log('Data inserted successfully');
        res.redirect('/'); 
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
