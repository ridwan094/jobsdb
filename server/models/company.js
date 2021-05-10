const company = (sequelize, DataTypes) => {
  const Company = sequelize.define('company', {
    comp_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    comp_name: {
      type: DataTypes.STRING(155),
      allowNull: true
    },
    comp_size: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    comp_industry: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    company_image: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'company',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "company_pkey",
        unique: true,
        fields: [
          { name: "comp_id" },
        ]
      },
    ]
  });
  return Company;
};

export default company