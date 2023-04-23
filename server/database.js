const mysql = require("mysql2");

const db = mysql.createPool({
    user: "root",
    host: "localhost",
    password: "",
    database: "FullChatAppDB"
}).promise();

async function addContact(id, name, profilePhoto)
{
    await db.query("Insert into contact values (?,?,?)", [id, name, profilePhoto]);
}

async function getContact(id)
{
    var [data] = await db.query("SELECT * from contact where contact_id = ?", [id]);
    return data[0];
}

async function getAllContacts()
{
    var [data] = await db.query("SELECT * from contact");
    return data;
}

async function getMessages(user1, user2)
{
    console.log(user1 + "  " + user2);
    var [data] = await db.query("SELECT * from messages where (from_id = ? AND to_id = ?) OR ( from_id = ? AND to_id = ? )", [user1, user2, user2, user1]);
    return data;
}

async function sendMessage(from_id, to_id, message_text)
{
    var response = await db.query("INSERT into Messages ( from_id, to_id, message_text, sent_datetime) values (?,?,?,?)", [from_id, to_id, message_text, new Date()]);
    return response;
}

async function getPhoto(id)
{
    var [response] = await db.query("SELECT profile_photo from Contact where contact_id = ?", [id]);
    return response[0];
}

async function getAgenda(id)
{
    var response = await db.query("SELECT * from agenda where contact_id_1 = ? OR contact_id_2 = ?", [id, id]);
    return response;
}

module.exports.addContact = addContact;
module.exports.getContact = getContact;
module.exports.getAllContacts = getAllContacts;
module.exports.getMessages = getMessages;
module.exports.sendMessage = sendMessage;
module.exports.getPhoto = getPhoto;
module.exports.getAgenda = getAgenda;