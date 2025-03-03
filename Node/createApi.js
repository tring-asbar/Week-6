


// Import Express
const express = require('express');
const app = express();
const db = require('./db');
app.use(express.json());

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

app.get('/students',async(req,res)=>{
    const result = await db.query('select * from students')
    res.json(result.rows);
})


app.get('/students/:id',async(req,res)=>{
    const { params } =(req);
    const student_rollno = parseInt(params.id);
    const student  = await db.query(`select * from students where ${student_rollno} = student_rollNo `)
    if(student){
        res.json(student.rows)
    }
    else{
     res.status(404,json({message:'student not found'}))
    }
});

app.post('/post',async(req,res)=>{
    const{student_name} = req.body;
    const result = await db.query(`Insert into students(student_name) values($1)`,[student_name]);
    res.json(result.rows);
})

app.put('/update/:id',async(req,res)=>{
    const {params} = req;
    const rollno = params.id;
    const{student_name} = req.body;
    const result = await db.query(`update students set student_name = $1 where student_rollNo =$2 RETURNING *`,[student_name,rollno])
    res.json(result.rows);
})

app.delete('/deleteStudent/:rollno',async(req,res)=>{
    // const {params} = req;

    const rollno =parseInt(req.params.rollno);
     const result = await db.query(`delete from marks where student_rollNo = $1 `,[rollno]);
    // console.log(rollno);
    res.send("Deleted");
})


//to create collection
app.post('/createCollection',async(req,res)=>{
    const result = await db.query(`create table users(userId Serial primary key,username varchar(30) not null)`);
    res.json(result);
})
app.get('/users',async(req,res)=>{
    const result = await db.query(`select * from users`);
    res.json(result);
})
app.post('/insert',async(req,res)=>{
    const{username} = req.body;
    const result = await db.query(`Insert into users(username) values($1) RETURNING *`,[username]);
    res.json(result.rows);
})
app.put('/updateUser/:id',async(req,res)=>{
    const {params} = req;
    const userId = params.id;
    const{username} = req.body;
    const result = await db.query(`update users set username = $1 where userId =$2 RETURNING *`,[username,userId])
    res.json(result.rows);
})
app.delete('/deleteUser/:id',async(req,res)=>{
        const {params} = req;
        const id = params.id;
        await db.query(`delete from users where userId = ${id}`);
        res.send("Deleted");
})



