var db = require("../models/connection");
var User = db.user;
var Contact = db.contact;
var Education = db.education

const { Sequelize, Op, QueryTypes } = require("sequelize");



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
    where: {
      id: {
        [Op.gt]: 3,
      },
    },
  });
  res.status(200).json({ data: data });
};

var findersUsers = async (req, res) => {
  const data = await User.findAll({});
  res.status(200).json({ data: data });
};

const getSetVirtual = async (req, res) => {
  const data = await User.findAll({
    where: {
      lastName: "Raghuwanshi",
    },
    //     const data = await User.create({
    // firstName:'raghuwanshi',
    // lastName:'Veer',
  });
  res.status(200).json({ data: data });
};

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
        case "isAlpha":
          messages[error.path] = "Only alphabets are allowed";
          break;
        case "isLowercase": {
          messages[error.path] = "Only Lowercase is allowed";
        }
        // Add more cases for other validators if needed
      }
    });
  }

  res.status(200).json({ data: data, message: messages });
};

const rawQueriesUser = async (req, res) => {
  const users = await db.sequelize.query("SELECT * FROM users WHERE id = :id", {
    replacements: { id: "1" },
    type: QueryTypes.SELECT,
  });
  // { type: QueryTypes.SELECT ,
  //     model: User,
  //     mapToModel: true
  // });

  res.status(200).json({ data: users });
};

// Associations One-To-One |
const oneToOneUser = async (req, res) => {
  // var data = await User.create({firstName:"monu",lastName:"sharma"})

  // if(data && data.id){
  //   await Contact.create({permanent_address:"vijay",current_address:"MadhyaPradesh",user_id:data.id})

  // }

  // var data = await User.findAll({
  //   attributes:['firstName','lastName'],
  //   include:[{
  //     model:Contact,
  //     as:'contactDetails',
  //     attributes:['permanent_address','current_address']
  //   }

  //   ]
  // })

  var data = await Contact.findAll({
    attributes: ["permanent_address", "current_address"],
    include: [
      {
        model: User,
        as: "userDetails",
        attributes: ["firstName", "lastName"],
      },
    ],
  });

  res.status(200).json({ data: data });
};

const oneToManyUser = async (req, res) => {
  // const data = await Contact.create({permanent_address:"bhopal",current_address:"MadhyaPradesh"
  // ,'user_id':1})

  // var data = await User.findAll({
  //     attributes:['firstName','lastName'],
  //     include:[{
  //       model:Contact,
  //       as:'contactDetails',
  //       attributes:['permanent_address','current_address']
  //     }],
  //     where:{id:2}
  //   })

  var data = await Contact.findAll({
    attributes: ["permanent_address", "current_address"],
    include: [
      {
        model: User,
        as: "userDetails",
        attributes: ["firstName", "lastName"],
      },
    ],
  });

  res.status(200).json({ data: data });
};

const manyToManyUser = async (req, res) => {
  //   var data = await User.create({firstName:"shyam",lastName:"sharma"})

  //   if(data && data.id){
  //     await Contact.create({permanent_address:"indore",current_address:"mp"})

  //   }
  // var data = {}
  var data = await User.findAll({
    attributes: ["firstName", "lastName"],
    include: [
      {
        model: Contact,
        attributes: ["permanent_address", "current_address"],
      },
    ],
  });

  // var data = await Contact.findAll({
  //   attributes: ["permanent_address", "current_address"],
  //   include: [
  //     {
  //       model: User,
  //       attributes: ["firstName", "lastName"],
  //     },
  //   ],
  // });

  res.status(200).json({ data: data });
};


/////////////////////////////////////////////////////////////////////

const paranoidUser = async (req,res)=>{
    // var data = await User.create({firstName:"shayam",lastName:"sharma"})


  var data=   await User.destroy({
      where: {
        id: 4
      },
      //force:true              // table se delete kr deta he parmannet
    });
  // var data = await User.restore({where:{
  //   id:4
  // }});
  //  var data = await User.findAll({paranoid: false })
  var data =  await User.findByPk(4, { paranoid: false });

  res.status(200).json({ data: data });

}

const loadingUser = async(req,res)=>{

  //  var data = await User.create({firstName:"shyam",lastName:"sharma"})

  //   if(data && data.id){
  //     await Contact.create({permanent_address:"indore",current_address:"mp",UserId:data.id})

  //   }
///  Lazy Loading
// var data = await User.findOne({
//   where:{
//     id:2
//   },
// })
// var ContactData = await data.getContacts()


//eager loding
var data = await User.findAll({
    include: [
      {
        model: Contact,
      },
    ],
  });

  // res.status(200).json({data:data,ContactData:ContactData})
  res.status(200).json({data:data})


}

const eagerUser  = async(req,res)=>{
var data = await User.findAll({
  include:{all:true,nested:true}
  // {
  //   model:Contact,
  //   include:{
  //     model:Education   //nested eager loading  
  //   }
  // }



  // {all:true}  by default


  // set include condion
  // [{
  //   model:Contact,
  //   required:false,
  //   right:true
  // },{
  //   model:Education
  // }]
})
res.status(200).json({data:data})
}


const creatorUser = async (req,res)=>{


  //  var data = await User.create({firstName:"shyam",lastName:"sharma"})

  //   if(data && data.id){
  //     await Contact.create({permanent_address:"indore",current_address:"mp",UserId:data.id})

  //   }


  // single data crete 

    // await Contact.create(
    //   {
    //   permanent_address:"indore",
    //   current_address:"mp",
    //   users:{
    //     firstName:"shyam",
    //     lastName:"sharma"

    //   }


    // },{
    //   include:[db.contactUser]
      
    // })
// bulk create
    await Contact.bulkCreate(
     [    {
      permanent_address:"bhopal",
      current_address:"mp",
      users:{
        firstName:"mohan",
        lastName:"singh"

      }


    },
    {
      permanent_address:"ujjain",
      current_address:"mp",
      users:{
        firstName:"rohan",
        lastName:"patel"

      }


    }
  
  
  ],{
      include:[db.contactUser]
      
    })

var data = await User.findAll({
       include:{
        model:Contact
       }
})



  res.status(200).json({data:data})
}

const mnAssociations = async (req,res)=>{

        // const amidala = await db.customer.create({ username: 'p4dm3', points: 1000 });
        // const queen = await db.profile.create({ name: 'Queen' });
        // await amidala.addProfile(queen, { through: { selfGranted: false } });
        // const result = await db.customer.findOne({
        //   where: { username: 'p4dm3' },
        //   include: db.profile
        // });
        // console.log(result);

        
        const amidala = await db.customer.create({
          username: 'p4dm3',
          points: 1000,
          profiles: [{
            name: 'Queen',
            User_Profile: {
              selfGranted: true
            }
          }]
        }, {
          include: db.profile
        });
        
        const result = await db.customer.findOne({
          where: { username: 'p4dm3' },
          include: db.profile
        });
        
        console.log(result);


  res.status(200).json({data:result})
}



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
  validateUser,
  rawQueriesUser,
  oneToOneUser,
  oneToManyUser,
  manyToManyUser,
  paranoidUser,
  loadingUser,
  eagerUser,
  creatorUser,
  mnAssociations,

};
