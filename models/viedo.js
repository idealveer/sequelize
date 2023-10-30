module.exports = (DataTypes, sequelize,Model) => {
    class Video extends Model {
        
    }


        Video.init({
            title: DataTypes.STRING,
            text: DataTypes.STRING
        }, 
        { sequelize, modelName: 'video' });

return Video;
}