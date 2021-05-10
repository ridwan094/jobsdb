// 1. import module Router
import { Router } from 'express';
import indexCtrl from '../controllers/IndexController'


const router = Router();
router.get('/',indexCtrl.UserCtrl.requireSignin,indexCtrl.UserCtrl.findAll);
router.post('/signup/', indexCtrl.UserCtrl.signup);
router.post('/signin', indexCtrl.UserCtrl.signin);

export default router;