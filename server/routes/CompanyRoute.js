import { Router } from 'express';
import IndexCtrl from '../controllers/IndexController'

const router = Router();
router.post('/', IndexCtrl.CompanyCtrl.create);
router.get('/', IndexCtrl.CompanyCtrl.findAll);
router.get('/:id', IndexCtrl.CompanyCtrl.findOne);
router.put('/:id', IndexCtrl.CompanyCtrl.update);
router.delete('/:id', IndexCtrl.CompanyCtrl.remove);
router.get('/rawsql/:id', IndexCtrl.CompanyCtrl.rawSQL);

export default router;