import users from './users';
import company from './company';
import jobs from './jobs';
import jobsApply from './jobs_apply'
import Sequelize from 'sequelize';
import { sequelize } from '../../config/config-db';

const models = {
    Users: users(sequelize, Sequelize),
    Company: company(sequelize, Sequelize),
    Jobs: jobs(sequelize, Sequelize),
    jobsApply: jobsApply(sequelize, Sequelize)
}

//4. create relation OneToMany | ManyToMany
Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

// 5. export sequalize agar bisa di-call di module lain
export default models;