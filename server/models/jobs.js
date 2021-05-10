const jobs = (sequelize, DataTypes) => {
  const Jobs = sequelize.define('jobs', {
    job_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    job_title: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    job_email: {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    job_publish_on: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    job_expire_on: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    job_phone_number: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    job_city: {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    job_salary_rate: {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    job_level: {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    job_experience: {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    job_kualifikasi: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    job_type: {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    job_description: {
      type: DataTypes.STRING(1500),
      allowNull: true
    },
    job_comp_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'company',
        key: 'comp_id'
      }
    }
  }, {
    sequelize,
    tableName: 'jobs',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "jobs_pkey",
        unique: true,
        fields: [
          { name: "job_id" },
        ]
      },
    ]
  });
  return Jobs;
};

export default jobs