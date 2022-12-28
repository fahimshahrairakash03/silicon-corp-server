const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//user: siliCorp
//pass: WoG0eNDAu1amV7ZH

const uri =
  "mongodb+srv://siliCorp:WoG0eNDAu1amV7ZH@cluster0.4r8e4ne.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const serviceCollection = client.db("siliconCorp").collection("services");

    app.get("/services", async (req, res) => {
      const query = {};
      const result = await serviceCollection.find(query).toArray();
      res.send(result);

      app.post("/services", async (req, res) => {
        const product = req.body;
        const result = await serviceCollection.insertOne(product);
        res.send(result);
        console.log("hello");
      });
    });
  } finally {
  }
}

run().catch(console.log);

app.get("/", (req, res) => {
  res.send("sili-corp api is running");
});

app.listen(port, () => {
  console.log("Api is running");
});
