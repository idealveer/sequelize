module.exports = (DataTypes, sequelize) => {
  const User = sequelize.define(
    "User",
    {
      // Model attributes are defined here
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
          isAlpha: true, 
          isLowercase: true,        // checks for lowercase

        },

        get() {
          const rawValue = this.getDataValue('firstName');
          return rawValue ? rawValue.toUpperCase() : null;
        }
      },
      lastName: {
        type: DataTypes.STRING,
        defaultValue:"ideal",

        set(value) {
          // Storing passwords in plaintext in the database is terrible.
          // Hashing the value with an appropriate cryptographic hash function is better.
          this.setDataValue('lastName', value + ',Indian');
        }


      },
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstName} ${this.lastName}`;
        },
        set(value) {
          throw new Error('Do not try to set the `fullName` value!');
        }
      }
    },
    {
      // Other model options go here
      tableName: "users",
    }
  );

  // `sequelize.define` also returns the model
  console.log(User === sequelize.models.User); // true
  return User;
};
