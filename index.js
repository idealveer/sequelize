const express = require("express");
const bodyParser = require("body-parser");
require("./models/connection");
var userCtrl = require("./controllers/userController");
const app = express();

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("<h1> Welcome to the Api Server </h1>");
});

app.get("/add", userCtrl.addUser);
app.get("/users", userCtrl.getUsers);
app.get("/users/:id", userCtrl.getUser);
app.post("/users", userCtrl.postUser);
app.delete("/users/:id", userCtrl.deleteUser);
app.patch("/users/:id", userCtrl.updateUser);
app.get('/query',userCtrl.queryUsers)
app.get('/finders',userCtrl.findersUsers)
app.get('/get-set-virtual',userCtrl.getSetVirtual)
app.get('/validate',userCtrl.validateUser)




// User.sync({ force: true })
// Contact.sync({ force: true })

app.listen(3000, () => {
  console.log("+++++ server is running on http://localhost:3000 +++++++");
});
