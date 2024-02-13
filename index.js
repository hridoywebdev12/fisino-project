const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = 3000


    



const uri = "mongodb+srv://fisino-website:97RTu4d3ray9TdxT@cluster0.qegqtqb.mongodb.net/?retryWrites=true&w=majority";

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
    const database = client.db('Fisino-project');
    const serviceCollection =database .collection('Services');

    app.get('/services',async(req,res) =>{
        const query  = {};
        
    })

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello Fisino!')
})

app.listen(port, () => {
  console.log(`Fisino app listening on port ${port}`)
})