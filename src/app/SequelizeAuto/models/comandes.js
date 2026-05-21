import Sequelize from "sequelize";

export default function (sequelize, DataTypes) {
  return sequelize.define('comandes', {
    idcomandes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'comandes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idcomandes" },
        ]
      },
    ]
  });
}
