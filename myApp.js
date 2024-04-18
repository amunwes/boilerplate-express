require('dotenv').config();
let express = require('express');
let app = express();
const bodyParser = require('body-parser');
console.log("Hello World")

// app.get('/', function(req, res) {
//     res.send("Hello Express");
// })
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.use("/public", express.static(__dirname + "/public"));
app.use(function(req, res, next) {
    var log = req.method + " " + req.path + " - " + req.ip;
    console.log(log);
    next();
})

const middleware = (req, res, next) => {
    req.time = new Date().toString();
    next();
  };
  
app.get("/now", middleware, (req, res) => {
    res.send({
      time: req.time
    });
  });


app.get('/', function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
})

app.get("/:word/echo", (req, res) => {
    const { word } = req.params;
    res.json({
      echo: word
    });
  });

app.get("/name", function(req, res) {
    var firstName = req.query.first;
    var lastName = req.query.last;
    // OR you can destructure and rename the keys
    var { first: firstName, last: lastName } = req.query;
    // Use template literals to form a formatted string
    res.json({
        name: `${firstName} ${lastName}`
    });
});

app.get('/json', function(req, res) {
if (process.env.MESSAGE_STYLE === 'uppercase'){
    res.json({"message": "HELLO JSON"});
}else {
    res.json({"message": "Hello json"});

}
})

app.post('/name', function(req, res) {
    var string = req.body.first + " " + req.body.last;
    res.json({ name: string });
});


































 module.exports = app;
