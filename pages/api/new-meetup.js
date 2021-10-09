import { MongoClient } from "mongodb";

// /api/new-meetup - url of this file

// req - contains data about incoming requests
// res - needed for sending back a response
async function handler(req, res) {
  if (req.method === "POST") {
    // req.body contains the data of the incoming request
    const data = req.body;

    // const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://admin:UJblnwupV3OPUYsJ@cluster0.nclkc.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
