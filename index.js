const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
var cors = require('cors');
const app = express();
const port = 3000


// middleware 
app.use(cors())
app.use(express.json());


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
    const serviceCollection = database.collection('Services');
    const ordersCollection = database.collection('Orders');

    app.get('/services', async (req, res) => {
      const query = {};
      const Services = await serviceCollection.find(query).toArray();
      res.send(Services)

    })

    app.get('/services/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const product = await serviceCollection.findOne(query);
      res.send(product);
    })

    // Orders
    app.post('/orders', async (req, res) => {
      const order = req.body;
      const result = await ordersCollection.insertOne(order);
      res.send(result)
    })

    app.get('/orders', async (req, res) => {
      const email = req.query.email;
      const query = {email: email};
      const orders = await ordersCollection.find(query).toArray();
      res.send(orders)

    })

    app.delete('/orders/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await ordersCollection.deleteOne(query);
      res.send(result)
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