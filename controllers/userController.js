

var db = require("../models/connection");
var User = db.user;
const { Sequelize  ,Op}= require("sequelize");
var addUser = async (req, res) => {
  const veer = await User.create({ firstName: "rahul", lastName: "sharma" });

  // const veer = User.build({ firstName: "Veerendra" ,lastName:"Raghuwanshi"});
  console.log(veer instanceof User); // true
  console.log(veer.firstName); // "veer"
  // veer.set({
  //     firstName: "Ada",
  //     lastName: "blue"
  //   });

  await veer.update({ firstName: "Veerendra", lastName: "Raghuwanshi" });

  await veer.save();
  console.log("veer was saved to the database!");

  // await veer.destroy();
  await veer.reload();

  console.log(veer.toJSON()); // This is good!
  res.status(200).json(veer.toJSON());
};

var getUsers = async (req, res) => {
  const data = await User.findAll({});

  res.status(200).json({ data: data });
};
var getUser = async (req, res) => {
  const data = await User.findOne({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ data: data });
};






var postUser = async (req, res) => {
  let postData = req.body;
  if (postData.length > 1) {
    var data = await User.bulkCreate(postData);
  } else {
    var data = await User.create(postData);
  }
  res.status(200).json({ data: data });
};



var deleteUser = async (req, res) => {
  const data = await User.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ data: data, message: "User delete Successfully" });
};

var updateUser = async (req, res) => {
  var updateData = req.body;
  const data = await User.update(updateData, {
    where: {
      id: req.params.id,
    },
  });

  res
    .status(200)
    .json({ data: updateData, message: "User  details update Successfully" });
};


// var queryUsers = async (req, res) => {
  
//     const data = await User.create({
//         firstName: 'veer',
//         lastName: 'raghuwanshi'
//       }, { fields: ['firstName'] });
//     res.status(200).json({ data:data});
//   };
  ////////////////////  Specfic row data /////////////////////////
// var queryUsers = async (req, res) => {
  
//     const data = await User.findAll({
//         attributes:['id','firstName'],
    
//     });
//     res.status(200).json({ data:data});
//   };
///////////////// coluumn name change ////////////////////
var queryUsers = async (req, res) => {
    const data = await User.count({
     where:{
        id:{
            [Op.gt]:3
        }
     }
    
    });
    res.status(200).json({ data: data });
  };
  
  var   findersUsers = async (req, res) => {
    const data = await User.findAll({
    });
    res.status(200).json({ data: data });
  };

const getSetVirtual =  async(req,res)=>{
    const data = await User.findAll({
where:{
    lastName:'Raghuwanshi'

}
//     const data = await User.create({
// firstName:'raghuwanshi',
// lastName:'Veer',

    });
    res.status(200).json({ data: data});
}




const validateUser = async (req, res) => {
    var data = {};
    var messages = {}; // Use an object to store validation messages
  
    try {
      data = await User.create({
        firstName: "veer",
        lastName: "raghuwanshi",
      });
    } catch (e) {
      // Use an object to store validation messages for each field
      e.errors.forEach((error) => {
        switch (error.validatorKey) {
          case 'isAlpha':
            messages[error.path] = 'Only alphabets are allowed';
            break;
            case 'isLowercase':
                {
                    messages[error.path] = 'Only Lowercase is allowed';


                }
          // Add more cases for other validators if needed
        }
      });
    }
  
    res.status(200).json({ data: data, message: messages });
  };
  









module.exports = {

  addUser,
  getUsers,
  getUser,
  postUser,
  deleteUser,
  updateUser,
  queryUsers,
  findersUsers,
  getSetVirtual,
  validateUser
};
