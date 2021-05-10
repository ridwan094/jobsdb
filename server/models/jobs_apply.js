const jobsApply = (sequelize, DataTypes) => {
  const jobsApply = sequelize.define('jobs_apply', {
    joap_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    joap_apply: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    joap_desctiption: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    joap_attachment: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    joap_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'jobs_apply',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "jobs_apply_pkey",
        unique: true,
        fields: [
          { name: "joap_id" },
        ]
      },
    ]
  });
  return jobsApply;
};

export default jobsApply