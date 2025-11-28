 const express=require('express')
 const app=express()
 const port=8468

 //middleware
app.use(express.json())
let data=['Himanshu']

console.log("HI Client")
//website endpoints
app.get("/", (req, res) => {
    res.send(`<body>
        <h1>
        ${JSON.stringify(data)}
        </h1>
        <a href='/dashboard'>Dashboard</a>
        </body>`)
});
app.get("/dashboard",(req,res)=>{
    console.log("")
    res.send(`<body>
        <h1>
        Dashboard
        </h1>
        <a href='/'>Home</a>
        </body>`)
})

// C RUD -> C = POST , R= GET , U = POST , D = Delete

//Api endpoints
app.get('/api/data',(req,res)=>{
    console.log("This is for the data");
    res.send(data);
})

app.post('/api/data',(req,res)=>{
    const new_entry=req.body;
    console.log(new_entry);
    data.push(new_entry.name)
    res.sendStatus(201)
})

app.delete('/api/data',(req,res)=>{
    data.pop();
    console.log("Data deleted from array");
    res.sendStatus(203)
})

app.listen(port,()=>{console.log(`server listening on ${port}`)})