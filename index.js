const express = require('express')
const{ pool} = require('./db')


const app = express()
app.use(express.json())

app.get('/get', async(req,res)=>{
    try {
        const data = await pool.query('select * from instagram')
        res.send(data.rows);
    } catch (error) {
        console.log(error.message);
        res.send(error.message)
    }
})


app.get('/get/:id', async (req,res)=>{
    try {
        const id = await req.params.id
        console.log(id);
        const data = await pool.query(`select * from instagram where id=${id}`)
        res.send(data.rows);
    } catch (error) {
        console.log(error.message);
        res.send(error.message)
    }
})

app.post('/send',async(req,res)=>{
    try {
        const { username, name, age} = await req.body
        console.log(name);
        await pool.query(`insert into instagram (username,name,age) values('${username}','${name}',${age})`)
        res.send("data inserted succeessfully")
    } catch (error) {
        console.log(error.message);
        res.send(error.message)
    }
})

app.patch('/update/:id', async (req,res)=>{
   
    
    try {
        const id=req.params.id
        const updateInfo=await req.body
        const ListData = []
        for (let i in updateInfo){
            ListData.push(`${i}='${updateInfo[i]}'`)
        }
        const dataStr = ListData.join(',')
        const data= await pool.query(`update instagram set ${dataStr} where id=${id}`)
        
        res.send("your data is updated sucsessfuly")
    } catch (error) {
        console.log(error.message);
    }
    
})



app.delete('/delete/:id', async (req,res)=>{
    try {
        const id = await req.params.id
        await pool.query(`delete from instagram where id= ${id}`)
        res.send("data deleted successfully");

    } catch (error) {
        console.log(error.message);
    }
} )




app.listen(2001,()=>{
    console.log("server is listening to the port number 2001");
})