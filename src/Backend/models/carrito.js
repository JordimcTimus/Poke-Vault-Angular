const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('carrito', {
    idcarrito: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idusuari: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idproducte: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantitat: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'carrito',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "idcarrito" }]
      }
    ]
  });
};
