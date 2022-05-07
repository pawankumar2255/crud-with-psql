const Pool = require('pg').Pool
const pool = new Pool({
    user:"postgres",
    hpost:"localhost",
    password:"Pawan@123",
    port:5432,
    database: "connect_pg_db"
})

// estabalishing connection

pool.connect((err,res)=>{
    if(err){
        console.log(err);
    }else{
        console.log("database connected");
    }
})


// creating table
pool.query('create table instagram (id serial primary key,username text unique,name text,age int',(res,err)=>{
    if(err){
        return console.log(err.message)
    }
    console.log('table created successfully');
})


module.exports = {pool}