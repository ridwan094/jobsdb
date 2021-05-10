import { sequelize } from '../../config/config-db';

// findAll = select * from users
const findAll = async (req, res) => {
    const jobsApply = await req.context.models.jobsApply.findAll();
    return res.send(jobsApply);
}
// findone = select * from users where user_id=:id
const findOne = async (req, res) => {
    const jobsApply = await req.context.models.jobsApply.findOne({
        where: { joap_id: req.params.id }
    });
    return res.send(jobsApply);
}

// create new users
const create = async (req, res) => {
    const jobsApply = await req.context.models.jobsApply.create({
        joap_apply: req.body.joap_apply,
        joap_description: req.body.joap_description,
        joap_attachment: req.body.joap_attachment,
        joap_user_id: req.body.joap_user_id
        
    });
    return res.send(jobsApply);
}

// update users set region_name=:2,region_desc=:4 where region_id=:3
const update = async (req, res) => {
    const { joap_apply } = req.body;
    const jobsApply = await req.context.models.jobsApply.update(
        { joap_description: req.body.joap_description,
            joap_attachment: req.body.joap_attachment,
            joap_user_id: req.body.joap_user_id },// nama attribute yg akan di update
        { returning: true, where: { joap_id: req.params.id } }
    );
    return res.send(jobsApply);
}

// delete 
const remove = async (req, res) => {
    await req.context.models.jobsApply.destroy({
          where: { joap_id: req.params.id }
    }).then(result =>{
        console.log(result);
        return res.send("delete "+result+" rows.");
    });
    
}

const rawSQL = async (req, res) => {
    await sequelize.query('SELECT * FROM jobs_apply where joap_id = :joapId',
        { replacements: { joapId: parseInt(req.params.id) }, type: sequelize.QueryTypes.SELECT } 
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
