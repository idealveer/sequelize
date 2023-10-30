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
          // isLowercase: true,        // checks for lowercase

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
          this.setDataValue('lastName', value );
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
      },
      status:DataTypes.INTEGER,
    },
    
    {
      // hooks: {
      //   beforeValidate: (user, options) => {
      //     user.lastName = 'happy';
      //   },
      //   afterValidate: (user, options) => {
      //     user.status = 1;
      //   }
      // },
      // Other model options go here
      underscored: true,   //naming change Naming Strategies


      tableName: "users",
      paranoid: true,
      deletedAt: 'soft_delete'
    }
  );

  // `sequelize.define` also returns the model
  // console.log(User === sequelize.models.User); // true
/// hook use 2nd method
  // User.addHook('beforeValidate', (user, options) => {
  //   user.lastName = 'happy';
  // });
  
  // User.addHook('afterValidate', 'someCustomName', (user, options) => {
  //   user.status = 1;

  // });

  // Method 3 via the direct method
User.beforeValidate(async (user, options) => {
  user.lastName = 'rocky';
});

User.afterValidate('myHookAfter', (user, options) => {
  user.status = 0;
});
// hook remove

User.removeHook('afterValidate', 'myHookAfter');

//  all remove hook 
//  User.removeHook();
  return User;
};
