const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = async (sequelize) => {
  // defino el modelo
 await sequelize.define('Pokemon', {
    id: {
      // type: DataTypes.UUID,
      // primaryKey: true,
      // defaultValue: DataTypes.UUIDV4,

      // type: DataTypes.INTEGER,
      // primaryKey: true,
      // allowNull: false,
      // autoIncrement: true,
      // startAt: 1011,

      // type: DataTypes.INTEGER,
      // primaryKey: true,
      // autoIncrement: true,
      // initialAutoIncrement: 1011,

      // type: DataTypes.INTEGER,
      // primaryKey: true,
      // autoIncrement: true,
      // allowNull: false,
      // field: 'id',
      // startAt: 1011,

      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      // defaultValue: 1010
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vida:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ataque:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    defensa:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    velocidad:{
      type: DataTypes.INTEGER,
    },
    altura:{
      type: DataTypes.INTEGER,
    },
    peso:{
      type: DataTypes.INTEGER,
    }

  }, {
    timestamps: false,
    freezeTableName: true,
  });
};
