const messages = [
    {
    id: 0,
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
    id:1,
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
  ];
let messageId = messages.length;
const express = require('express');
const app = express();
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index", { title: "Mini Messageboard", messages: messages });
});

app.get("/new", (req,res)=>{
    res.render("form", {title: "New Message"});
});

app.post("/new", (req,res) => {
    const {message,username} = req.body;
    messages.push({ id: messageId, text: message, user: username, added: new Date() });
    messageId++;
    res.redirect("/");
});

app.get("/message/:id",(req,res) => {
    console.log('hi')
    if(messages[req.params.id]) {
        
        res.render("message", messages[req.params.id])
    }
    else {
        res.render('404');
    }
    res.render();
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`My first Express app - listening on port ${PORT}!`)
);
