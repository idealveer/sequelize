module.exports = (DataTypes, sequelize,Model) => {


    class Tag extends Model {

    }
       Tag.init({
         name: DataTypes.STRING
       }, { sequelize, modelName: 'tag' });


return Tag

}