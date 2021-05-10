import { sequelize } from '../../config/config-db';

// findAll = select * from users
const findAll = async (req, res) => {
    const jobs = await req.context.models.Jobs.findAll();
    return res.send(jobs);
}
// findone = select * from users where user_id=:id
const findOne = async (req, res) => {
    const jobs = await req.context.models.Jobs.findOne({
        where: { job_id: req.params.id }
    });
    return res.send(jobs);
}

// create new users
const create = async (req, res, next) => {
    const {job_id, job_title, job_email, job_publish_on, job_expire_on,
        job_phone_number, job_city, job_salary_rate, job_level, job_experience,
        job_kualifikasi, job_type, job_description, job_comp_id} = req.body;
        console.log(job_title);
        const result = await req.context.models.Jobs.create({
            job_id: job_id,
            job_title: job_title,
            job_email: job_email,
            job_publish_on: job_publish_on,
            job_expire_on: job_expire_on,
            job_phone_number: job_phone_number,
            job_city: job_city,
            job_salary_rate: job_salary_rate,
            job_level: job_level,
            job_experience: job_experience,
            job_kualifikasi: job_kualifikasi,
            job_type: job_type,
            job_description: job_description,
            job_comp_id: job_comp_id
        }).catch(error=>{
            console.log(error);
        });
        return res.send(result);

        next();
}

// update users set region_name=:2,region_desc=:4 where region_id=:3
const update = async (req, res) => {
    const { job_title } = req.body;
    const jobs = await req.context.models.Jobs.update(
        { job_email: req.body.job_email,
            job_publish_on: req.body.job_publish_on,
            job_expire_on: req.body.job_expire_on,
            job_phone_number: req.body.job_phone_number,
            job_city: req.body.job_city,
            job_salary_rate: req.body.job_salary_rate,
            job_level: req.body.job_level,
            job_experience: req.body.job_experience,
            job_kualifikasi: req.body.job_kualifikasi,
            job_type: req.body.job_type,
            job_description: req.body.job_description,
            job_comp_id: req.body.job_comp_id },// nama attribute yg akan di update
        { returning: true, where: { job_id: req.params.id } }
    );
    return res.send(jobs);
}

// delete 
const remove = async (req, res) => {
    await req.context.models.Jobs.destroy({
          where: { job_id: req.params.id }
    }).then(result =>{
        console.log(result);
        return res.send("delete "+result+" rows.");
    });
    
}

const rawSQL = async (req, res) => {
    await sequelize.query('SELECT * FROM jobs where job_id = :jobId',
        { replacements: { jobId: parseInt(req.params.id) }, type: sequelize.QueryTypes.SELECT } 
    ).then(result => {
        return res.send(result);
    })
}


export default {
    findAll,
    findOne,
    create,
    update,
    remove,
    rawSQL
}
