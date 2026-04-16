const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('linies_comanda', {
    idlinia: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idcomandes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'comandes',
        key: 'idcomandes'
      }
    },
    idproducte: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'producte',
        key: 'idproducte'
      }
    },
    quantitat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'linies_comanda',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idlinia" },
        ]
      },
      {
        name: "fk_linia_comanda",
        using: "BTREE",
        fields: [
          { name: "idcomandes" },
        ]
      },
      {
        name: "fk_linia_producte",
        using: "BTREE",
        fields: [
          { name: "idproducte" },
        ]
      },
    ]
  });
};
