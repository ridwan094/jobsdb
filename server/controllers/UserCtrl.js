import AuthHelper from '../helpers/AuthHelper'
import config from '../../config/config'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'

// findAll = select * from users
const findAll = async (req, res) => {
  const users = await req.context.models.Users.findAll({
    attributes: { exclude: ['user_password','user_salt'] },
  });
  return res.send(users);
}

// create user with hash & salt
const signup = async (req, res) => {
  //const { user_name, user_email, user_password } = req.body;

  const { dataValues } = new req.context.models.Users(req.body);

  const salt = AuthHelper.makeSalt();
  const hashPassword = AuthHelper.hashPassword(dataValues.user_password, salt);

  const users = await req.context.models.Users.create({
    user_name: dataValues.user_name,
    user_email: dataValues.user_email,
    user_type: dataValues.user_type,
    user_password: hashPassword,
    user_salt: salt
  });

  return res.send(users);
}

// filter find by user_email
const signin = async (req, res) => {
  //1. extract values from request body
  const { user_email, user_password } = req.body
  
  //2. gunakan try catch, agar jika terjadi error misal table ga bisa diakses bisa munculkan error message
  try {

    // idem : select * from users where user_email = :user_email
    const users = await req.context.models.Users.findOne({
      where: { user_email: user_email }
    });

    //3. jika user tidak ketemu munculkan error
    if (!users) {
      return res.status('400').json({
        error: "User not found"
      });
    }

    //3. check apakah user_password di table === user_passowrd yg di entry dari body,
    // tambahkan salt
    if (!AuthHelper.authenticate(user_password, users.dataValues.user_password, users.dataValues.user_salt)) {
      return res.status('401').send({
        error: "Email and password doesn't match."
      })
    }

    //4. generate token jwt, jangan lupa tambahkan jwtSecret value di file config.js
    const token = jwt.sign({ _id: users.user_id}, config.jwtSecret)

    //5. set expire cookie
    res.cookie("t", token, {
      expire: new Date() + 9999
    })

    //6. exclude value user_password & user_salt, agar tidak tampil di front-end
    // lalu send dengan include token, it's done
    return res.json({token,users: {
      user_id : users.dataValues.user_id,
      user_name : users.dataValues.user_name,
      user_email : users.dataValues.user_email,
      user_type: users.dataValues.user_type
    }});


  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve user"
    });
  }

}

const signout = (req, res) => {
  res.clearCookie("t")
  return res.status('200').json({
    message: "signed out"
  })
}

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth',
  algorithms: ['sha1', 'RS256', 'HS256']
})



// Gunakan export default agar semua function bisa dipakai di file lain.
export default {
  findAll,
  signup,
  signin,
  requireSignin,
  signout
}