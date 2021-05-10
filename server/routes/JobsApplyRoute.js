import { Router } from 'express';
import IndexCtrl from '../controllers/IndexController'

const router = Router();
router.post('/', IndexCtrl.jobsApplyCtrl.create);
router.get('/', IndexCtrl.jobsApplyCtrl.findAll);
router.get('/:id', IndexCtrl.jobsApplyCtrl.findOne);
router.put('/:id', IndexCtrl.jobsApplyCtrl.update);
router.delete('/:id', IndexCtrl.jobsApplyCtrl.remove);
router.get('/rawsql/:id', IndexCtrl.jobsApplyCtrl.rawSQL);

export default router;