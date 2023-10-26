module.exports = (DataTypes, sequelize) => {
  const Contact = sequelize.define(
    "contacts",
    {
      // Model attributes are defined here
      permanent_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      current_address: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
      tableName: "contact",
    }
  );

  return Contact;
};

// const {  DataTypes } = require('sequelize');
// const sequelize=     require('./connection')

// const Contact = sequelize.define('contacts', {
//   // Model attributes are defined here
//   permanent_address: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   current_address: {
//     type: DataTypes.STRING
//     // allowNull defaults to true
//   }
// }, {
//   // Other model options go here
// });

// module.exports = Contact
