const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('linea_carritos', {
    idlinea: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idcarrito: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'carritos',
        key: 'idcarrito'
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
      allowNull: false
    },
    preu: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    data_creacio: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    data_limit: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'linea_carritos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idlinea" },
        ]
      },
      {
        name: "FK_liena_carrito",
        using: "BTREE",
        fields: [
          { name: "idcarrito" },
        ]
      },
      {
        name: "FK_liena_carrito_producrte",
        using: "BTREE",
        fields: [
          { name: "idproducte" },
        ]
      },
    ]
  });
};
