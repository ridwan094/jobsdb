import { sequelize } from '../../config/config-db';

// findAll = select * from users
const findAll = async (req, res) => {
    const company = await req.context.models.Company.findAll();
    return res.send(company);
}
// findone = select * from users where user_id=:id
const findOne = async (req, res) => {
    const company = await req.context.models.Company.findOne({
        where: { comp_id: req.params.id }
    });
    return res.send(company);
}

// create new users
const create = async (req, res,next) => {
    // jika gunakan spread operator
    const {comp_id, comp_name, comp_size, comp_industry} = req.body;
    console.log(comp_name);
    const result = await req.context.models.Company.create({
        comp_id: comp_id,
        comp_name: comp_name,
        comp_size : comp_size,
        comp_industry : comp_industry
    }).catch(error=>{
        console.log(error);
    });
    return res.send(result);
    // using middleware
    next();


}

 const createImage = async (req, res,data) => {
    const{compName,compSize,compIndustry,fileName} = data;
    await req.context.models.Company.create({
        comp_name: compName,
        comp_size : compSize,
        comp_industry : compIndustry,
        company_image : fileName
    }).catch(error=>{
        console.log(error);
    });
    
} 


// update users set region_name=:2,region_desc=:4 where region_id=:3
const update = async (req, res) => {
    const { comp_name } = req.body;
    const company = await req.context.models.Company.update(
        { comp_name: req.body.comp_name,
            comp_size: req.body.comp_size,
            comp_industry: req.body.comp_industry },// nama attribute yg akan di update
        { returning: true, where: { comp_id: req.params.id } }
    );
    return res.send(company);
}

// delete 
const remove = async (req, res) => {
    await req.context.models.Company.destroy({
          where: { comp_id: req.params.id }
    }).then(result =>{
        console.log(result);
        return res.send("delete "+result+" rows.");
    });
    
}

const rawSQL = async (req, res) => {
    await sequelize.query('SELECT * FROM company where comp_id = :compId',
        { replacements: { compId: parseInt(req.params.id) }, type: sequelize.QueryTypes.SELECT } 
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
