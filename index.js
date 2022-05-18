const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
require("dotenv").config();

const port = 5000;
// middleware
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://db-todo:Yyn8zly1YahLmf49@cluster0.yozt9.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const taskCollection = client.db("todo-task").collection("tasks");

    // add task in database
    app.post("/tasks", async (req, res) => {
      const task = req.body;
      const result = await taskCollection.insertOne(task);
      res.send(result);
    });

    // find all task
    app.get("/tasks", async (req, res) => {
      const query = {};
      const cursor = await taskCollection.find(query).toArray();
      res.send(cursor);
    });

    // update task
    app.put("/tasks/:id", async (req, res) => {
      const task = req.body;
      const { id } = req.params;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: task,
      };
      const result = await taskCollection.updateOne(filter, updateDoc, options);
      console.log(result);
      res.send(`done`);
    });

    app.delete("/tasks/:id", async (req, res) => {
      const { id } = req.params;
      const query = { _id: ObjectId(id) };
      const result = await taskCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
