const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('producte', {
    idproducte: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    descripcio: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    ruta_imatge: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    nom: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    ofertaActiva: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    quantitat: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    preu: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'producte',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idproducte" },
        ]
      },
    ]
  });
};
