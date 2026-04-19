const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('producte', {
    idproducte: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    descripcio: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    tipus: {
      type: DataTypes.ENUM('carta', 'caixa'),
      allowNull: false,
      defaultValue: 'caixa'
    },
    ruta_imatge: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    preu: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    ofertaActiva: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 0
    },
    quantitat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
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
        fields: [{ name: "idproducte" }]
      }
    ]
  });
};
