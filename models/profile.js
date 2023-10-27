module.exports = (DataTypes, sequelize) => {

const Profile = sequelize.define('profile', {
    name: DataTypes.STRING
  }, { timestamps: false });

return Profile;
}