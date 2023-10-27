const { Sequelize, DataTypes } = require("sequelize");

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


db.customer.belongsToMany(db.profile, { through: Grant,uniqueKey: 'my_custom_unique' });
db.profile.belongsToMany(db.customer, { through: Grant ,uniqueKey: 'my_custom_unique'});


//One to One
// db.user.hasOne(db.contact,{foreignKey: 'user_id',as:'contactDetails'});
// db.contact.belongsTo(db.user,{foreignKey: 'user_id',as:'userDetails'});


//One to Many Relationship
// db.user.hasMany(db.contact,{foreignKey: 'user_id',as:'contactDetails'});
// db.contact.belongsTo(db.user,{foreignKey: 'user_id',as:'userDetails'});

//default userId
    db.user.hasMany(db.contact,{foreignKey: 'UserId'});
 db.contactUser = db.contact.belongsTo(db.user,{foreignKey: 'UserId',as:'users'});

// db.user.hasMany(db.education);
// db.education.belongsTo(db.user,)



db.contact.hasMany(db.education,{foreignKey: 'ContactId' });
db.education.belongsTo(db.contact,{foreignKey: 'ContactId' })


//many to many 
// db.user.belongsToMany(db.contact, { through: db.userContacts  });
// db.contact.belongsToMany(db.user, { through: db.userContacts });

db.sequelize.sync({ force: true });

module.exports = db;
