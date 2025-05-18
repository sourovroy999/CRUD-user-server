const express=require('express')
const cors =require('cors')

const { MongoClient, ServerApiVersion } = require('mongodb');


const port=process.env.PORT || 4000;
const app=express()

app.use(cors())
app.use(express.json())



const uri = "mongodb+srv://UserMaster:master22@cluster0.iy6spfv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const userCollection=client.db('registerDB').collection('users')

    //users relaed apis
    //create user to the mongodb server
    app.post('/users', async(req,res)=>{
        const newUser=req.body;
        console.log('creating new user', newUser);
        const result=await userCollection.insertOne(newUser);
        res.send(result)
    })

    //show users in 'http://localhost:4000/users'
    app.get('/users', async(req,res)=>{
        const cursor=userCollection.find()
        const result=await cursor.toArray();
        res.send(result)
    })


    


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req,res)=>{
    res.send('CRUD user server is running')
})

app.listen(port, ()=>{
    console.log(`CRUD user is running on port: ${port}`);
    
})