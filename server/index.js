const express = require("express");
const app = express();
const cors = require("cors");
const DbContext = require("./database");


app.use(express.json())
app.use(cors());

app.get("/api/contact/:id", async (req, res) =>
{
    var id = req.params.id;
    var contact = await DbContext.getContact(id);
    res.send(contact);
})

app.post("/api/contact", async (req, res) =>
{
    const {contact_id, name, profile_photo} = req.body;
    await DbContext.addContact(contact_id, name, profile_photo);
    res.send("Contact created");
})

app.get("/api/contact", async (req, res) =>
{
    var contacts = await DbContext.getAllContacts();
    res.send(contacts);
})

app.post("/api/message", async (req, res) =>
{
    const {from_id, to_id, message_text} = req.body;
    await DbContext.sendMessage(from_id, to_id, message_text);
    console.log("Done");
    res.send("Message send");
})

app.get("/api/message/:user1/:user2", async (req, res) =>
{ 
    const {user1, user2} = req.params;
    var response = await DbContext.getMessages(user1, user2);
    console.log(response);
    res.send(response);
})

app.get("/api/photo/:id", async(req, res) =>
{
    const {id} = req.params;
    var response = await DbContext.getPhoto(id);
    console.log(response);
    res.send(response);
})

app.get("/api/agenda/:id", async(req, res) =>
{
    const {id} = req.params;
    var response = await DbContext.getAgenda(id);
    console.log(response);
    res.send(response);
})

app.listen(3001, () =>
{
    console.log("App running on port 3001")
})