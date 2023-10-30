var db = require("../models/connection");
var User = db.user;
var Contact = db.contact;
var Education = db.education

const { Sequelize, Op, QueryTypes } = require("sequelize");




var addUser = async (req, res) => {
  const veer = await User.create({ firstName: "mohan", lastName: "sharma" ,status:0});

  // const veer = User.build({ firstName: "Veerendra" ,lastName:"Raghuwanshi"});
  // console.log(veer instanceof User); // true
  // console.log(veer.firstName); // "veer"
  // veer.set({
  //     firstName: "Ada",
  //     lastName: "blue"
  //   });

  // await veer.update({ firstName: "Veerendra", lastName: "Raghuwanshi" });

  await veer.save();
  console.log("veer was saved to the database!");

  // await veer.destroy();
  // await veer.reload();

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
  var data = await User.create({firstName:"rohan",lastName:"patel",status:0})

  if(data && data.id){
    await Contact.create({permanent_address:"indore",current_address:"MadhyaPradesh",user_id:data.id})

  }

  // var data = await User.findAll({
  //   attributes:['firstName','lastName'],
  //   include:[{
  //     model:Contact,
  //     as:'contactDetails',
  //     attributes:['permanent_address','current_address']
  //   }

  //   ]
  // })

  // var data = await Contact.findAll({
  //   attributes: ["permanent_address", "current_address"],
  //   include: [
  //     {
  //       model: User,
  //       as: "userDetails",
  //       attributes: ["firstName", "lastName"],
  //     },
  //   ],
  // });

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

        
        // const amidala = await db.customer.create({
        //   username: 'p4dm3',
        //   points: 1000,
        //   profiles: [{
        //     name: 'Queen',
        //     User_Profile: {
        //       selfGranted: true
        //     }
        //   }]
        // }, {
        //   include: db.profile
        // });
        
        // const result = await db.customer.findOne({
        //   where: { username: 'p4dm3' },
        //   include: db.profile
        // });
        
        // console.log(result);



    // var result = await  db.customer.findAll({
    //       include: {
    //         model: db.grant,
    //         include: db.profile
    //       }
    //     });



      var result = await  db.customer.findOne({ 
        
        include: {
          model: db.profile,
          through: {
            attributes: ['selfGranted']
          }
        }      
      
      })


  res.status(200).json({data:result})
}


const m2m2mUser = async(req,res)=>{

  await db.player.bulkCreate([
    { username: 's0me0ne' },
    { username: 'empty' },
    { username: 'greenhead' },
    { username: 'not_spock' },
    { username: 'bowl_of_petunias' }
  ]);
  await db.game.bulkCreate([
    { name: 'The Big Clash' },
    { name: 'Winter Showdown' },
    { name: 'Summer Beatdown' }
  ]);
  await db.team.bulkCreate([
    { name: 'The Martians' },
    { name: 'The Earthlings' },
    { name: 'The Plutonians' }
  ]);


  await db.gameTeam.bulkCreate([
    { GameId: 1, TeamId: 1 },   // this GameTeam will get id 1
    { GameId: 1, TeamId: 2 },   // this GameTeam will get id 2
    { GameId: 2, TeamId: 1 },   // this GameTeam will get id 3
    { GameId: 2, TeamId: 3 },   // this GameTeam will get id 4
    { GameId: 3, TeamId: 2 },   // this GameTeam will get id 5
    { GameId: 3, TeamId: 3 }    // this GameTeam will get id 6
  ]);


  await db.playerGameTeam.bulkCreate([
    // In 'Winter Showdown' (i.e. GameTeamIds 3 and 4):
    { PlayerId: 1, GameTeamId: 3 },   // s0me0ne played for The Martians
    { PlayerId: 3, GameTeamId: 3 },   // greenhead played for The Martians
    { PlayerId: 4, GameTeamId: 4 },   // not_spock played for The Plutonians
    { PlayerId: 5, GameTeamId: 4 }    // bowl_of_petunias played for The Plutonians
  ]);

  const data = await db.game.findOne({
    where: {
      name: "Winter Showdown"
    },
    include: {
      model: db.gameTeam,
      include: [
        {
          model: db.player,
          through: { attributes: [] } // Hide unwanted `PlayerGameTeam` nested object from results
        },
        db.team
      ]
    }
  });

  res.status(200).json({data:data})
}


const scopeSUser = async(req,res)=>{
  User.addScope('checkStatus',{
    where:{
      status:1
    }

    
  })

  User.addScope('lastNameCheck',{
    where:{
      lastName:'patel'
    }

    
  })
// var data = await User.scope(['checkStatus','lastNameCheck']).findAll({})

User.addScope('includeContact',{
  include:{
    model:Contact,
    attributes:['current_address']
  }
})

User.addScope('userAddributes',{
  
    attributes:['firstName']
  
})
User.addScope('limitapply',{
  
 limit:2

})


let data = await User.scope(['includeContact','userAddributes','limitapply']).findAll({})

res.status(200).json({data:data})
}

// const transactionsUser = async(req,res)=>{
//   var t = await db.sequelize.transaction();

//   var data = await User.create({firstName:"sonu",lastName:"patel",status:0})

//   if(data && data.id){
//     try{

  
//     await Contact.create({permanent_address:"indore",
//     current_address:"MadhyaPradesh",
//     'UserId':null}) 
    
//     await t.commit();
//     data['transactions_status']= 'commit'
//     console.log('commit')


//   }
//   catch(error){
//     await t.rollback();
//     data['transactions_status']= 'rollback'
//     console.log('rollback')
//     await User.destroy({
//       where:{
//         id:data.id
//       },force:true 
//     })

//   }
//   }

//   res.status(200).json({data:data})
// }

var transactionsUser = async(req,res)=>{
  // var data = await User.create({firstName:"mp",lastName:"patel",status:0})
  try {
    const result = await db.sequelize.transaction(async (t) => {
     var contact = await Contact.create(
       {
       permanent_address:null,
       current_address:"mp",
       users:{
         firstName:"navneet",
         lastName:"sharma"
 
       }
 
 
     },{
       include:[db.contactUser]
       
     })
     
  //    await Contact.bulkCreate([{permanent_address:"indore",current_address:"MadhyaPradesh",
  //   'UserId':data.id},
  
  //   {permanent_address:"bhopal",current_address:"MadhyaPradesh",
  //   'UserId':null}],{ transaction: t },
  
  // ) 
      return contact;
  
    });
    console.log("Result" ,result)

  } catch (error) {
    console.log("error" ,error.message)
    // await User.destroy({
    //         where:{
    //           id:data.id
    //         },force:true 
    //       })

  }
  res.status(200).json({data:{}})
}

const hooksUser = async(req,res)=>{
var data = await User.create({firstName:"manojjj",lastName:"kumar",status:0})




  res.status(200).json({data:data})
}
var Image = db.image;
var Viedo = db.viedo;
var Comment = db.comment;
var Tag = db.tag;
var Tag_Taggable = db.tag_tagable;





const polyOneToMany = async (req,res)=>{
// var imagedata = await Image.create({title:'first Image',url:"first_url"})
// var imagedata = {}
// var viedodata = await Viedo.create({title:'third viedo',text:"Awesome viedo"})

// if(imagedata && imagedata.id){
//   await Comment.create({title:'This is comment for image' ,commentableId : imagedata.id
//   ,commentableType : "image"})

 
// }
// if(viedodata &&  viedodata.id){
//   await Comment.create({title:'This is comment for viedo' ,commentableId : viedodata.id
//   ,commentableType : "viedo"})
// }



     // Image to Comment 
//  var ImageCommentData=  await Image.findAll({
//         include:[{
//           model:Comment
//         }]
//        })
// var ImageCommentData=  await Viedo.findAll({
//   include:[{
//     model:Comment
//   }]
//  })
// var ImageCommentData=  await Comment.findAll({
//   include:[{
//     model:Viedo
//   }]
//  })


var ImageCommentData=  await Comment.findAll({
  include:[{
    model:Image
  }]
 })

  res.status(200).json({data:ImageCommentData})


}


const polymanyToMany = async (req,res)=>{
 var imagedata = await Image.create({title:'first Image',url:"first_url"})
var data = {}
var viedodata = await Viedo.create({title:'first viedo',text:"Awesome viedo"})
var Tagdata = await Tag.create({name:'Node js'})


if(Tagdata && Tagdata.id  &&  imagedata && imagedata.id){
  await Tag_Taggable.create({tagId:Tagdata.id, 
    taggableId : imagedata.id ,taggableType:'image'})

 
}
if(Tagdata && Tagdata.id  && viedodata &&  viedodata.id){
  await Tag_Taggable.create({tagId:Tagdata.id ,taggableId : viedodata.id
  ,taggableType : "viedo"})
}
  res.status(200).json({data:data})
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
  m2m2mUser,
  scopeSUser,
  transactionsUser,
  hooksUser,
  polyOneToMany,
  polymanyToMany,

};
