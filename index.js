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
app.get('/raw-queries',userCtrl.rawQueriesUser)
app.get('/one-to-one',userCtrl.oneToOneUser)
app.get('/one-to-many',userCtrl.oneToManyUser)
app.get('/many-to-many',userCtrl.manyToManyUser)
app.get('/paranoid',userCtrl.paranoidUser)
app.get('/loading',userCtrl.loadingUser)
app.get('/eager',userCtrl.eagerUser)
app.get('/creator',userCtrl.creatorUser)
app.get('/m-n-associations',userCtrl.mnAssociations)










// User.sync({ force: true })
// Contact.sync({ force: true })

app.listen(3000, () => {
  console.log("+++++ server is running on http://localhost:3000 +++++++");
});
