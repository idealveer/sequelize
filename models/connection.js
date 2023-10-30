const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = new Sequelize("idealdatabase", "newuser", "password", {
  host: "localhost",
  logging: true,
  dialect: "mysql",
});
try {
  sequelize.authenticate();
  console.log("-----Connection has been established successfully.------");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user")(DataTypes, sequelize);
db.contact = require("./contact")(DataTypes, sequelize);
db.customer = require("./customers")(DataTypes, sequelize);
db.profile = require("./profile")(DataTypes, sequelize);



db.education = require("./education")(DataTypes, sequelize);

db.userContacts = require("./userContacts")(DataTypes, sequelize,db.user,db.contact );


// mn assiciation 

const Grant = sequelize.define('grant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  selfGranted: DataTypes.BOOLEAN
},{timestamps:false})



db.grant = Grant
db.customer.belongsToMany(db.profile, { through: Grant,uniqueKey: 'my_custom_unique' });
db.profile.belongsToMany(db.customer, { through: Grant ,uniqueKey: 'my_custom_unique'});


// Setup a One-to-Many relationship between User and Grant

// db.customer.hasMany(db.grant);
// db.grant.belongsTo(db.customer);

// // Also setup a One-to-Many relationship between Profile and Grant
// db.profile.hasMany(db.grant);
// db.grant.belongsTo(db.profile);

//One to One
// db.user.hasOne(db.contact,{foreignKey: 'user_id',as:'contactDetails'});
// db.contact.belongsTo(db.user,{foreignKey: 'user_id',as:'userDetails'});


//One to Many Relationship
// db.user.hasMany(db.contact,{foreignKey: 'user_id',as:'contactDetails'});
// db.contact.belongsTo(db.user,{foreignKey: 'user_id',as:'userDetails'});

//default userId
//     db.user.hasMany(db.contact,{foreignKey: 'UserId'});
//  db.contactUser = db.contact.belongsTo(db.user,{foreignKey: 'UserId',as:'users'});

// naming stargey change so basicaal id change
db.user.hasMany(db.contact,);
db.contactUser = db.contact.belongsTo(db.user,);


// db.user.hasMany(db.education);
// db.education.belongsTo(db.user,)



db.contact.hasMany(db.education,{foreignKey: 'ContactId' });
db.education.belongsTo(db.contact,{foreignKey: 'ContactId' })


//many to many 
// db.user.belongsToMany(db.contact, { through: db.userContacts  });
// db.contact.belongsToMany(db.user, { through: db.userContacts });


db.player = sequelize.define('Player', { username: DataTypes.STRING });
db.team = sequelize.define('Team', { name: DataTypes.STRING });
db.game = sequelize.define('Game', { name: DataTypes.STRING });

// Super Many-to-Many relationship between Game and Team
 db.gameTeam = sequelize.define('GameTeam', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  }
});
db.team.belongsToMany(db.game, { through:  db.gameTeam });
db.game.belongsToMany(db.team, { through:  db.gameTeam });
db.gameTeam.belongsTo(db.game);
db.gameTeam.belongsTo(db.team);
db.game.hasMany( db.gameTeam);
db.team.hasMany( db.gameTeam);


// Super Many-to-Many relationship between Player and GameTeam
db.playerGameTeam = sequelize.define('PlayerGameTeam', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  }
});
db.player.belongsToMany(db.gameTeam, { through: db.playerGameTeam });
db.gameTeam.belongsToMany(db.player , { through: db.playerGameTeam });
db.playerGameTeam.belongsTo(db.player );
db.playerGameTeam.belongsTo(db.gameTeam);
db.player.hasMany(db.playerGameTeam);
db.gameTeam.hasMany(db.playerGameTeam);


db.image = require("./image")(DataTypes, sequelize,Model);
db.viedo = require("./viedo")(DataTypes, sequelize ,Model);
db.comment = require("./comment")(DataTypes, sequelize ,Model);
db.tag = require("./tag")(DataTypes, sequelize ,Model);
db.tag_tagable = require("./tag_tagable")(DataTypes, sequelize ,Model);






db.image.hasMany(db.comment, {
  foreignKey: 'commentableId',
  constraints: false,
  scope: {
    commentableType: 'image'
  }
});
db.comment.belongsTo(db.image, { foreignKey: 'commentableId', constraints: false });






db.viedo.hasMany(db.comment, {
  foreignKey: 'commentableId',
  constraints: false,
  scope: {
    commentableType: 'video'
  }
});
db.comment.belongsTo(db.viedo, { foreignKey: 'commentableId', constraints: false });

db.image.belongsToMany(db.tag, {
  through: {
    model: db.tag_tagable,
    unique: false,
    scope: {
      taggableType: 'image'
    }
  },
  foreignKey: 'taggableId',
  constraints: false
});

db.tag.belongsToMany(db.image, {
  through: {
    model: db.tag_tagable,
    unique: false
  },
  foreignKey: 'tagId',
  constraints: false
});


db.viedo.belongsToMany(db.tag, {
  through: {
    model: db.tag_tagable,
    unique: false,
    scope: {
      taggableType: 'video'
    }
  },
  foreignKey: 'taggableId',
  constraints: false
});

db.tag.belongsToMany(db.viedo, {
  through: {
    model: db.tag_tagable,
    unique: false
  },
  foreignKey: 'tagId',
  constraints: false
});

db.post= sequelize.define('post', {
  content: DataTypes.STRING
}, { timestamps: false });

db.reaction = sequelize.define('reaction', {
  type: DataTypes.STRING
}, { timestamps: false });

db.post.hasMany(db.reaction);
db.reaction.belongsTo(db.post);


db.DataTypes = DataTypes;
db.sequelize.sync({ force: false});

module.exports = db;
