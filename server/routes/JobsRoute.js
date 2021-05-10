import { Router } from 'express';
import IndexCtrl from '../controllers/IndexController'

const router = Router();
router.post('/', IndexCtrl.JobsCtrl.create,IndexCtrl.JobsCtrl.findAll);
router.get('/', IndexCtrl.JobsCtrl.findAll);
router.get('/:id', IndexCtrl.JobsCtrl.findOne);
router.put('/:id', IndexCtrl.JobsCtrl.update);
router.delete('/:id', IndexCtrl.JobsCtrl.remove);
router.get('/rawsql/:id', IndexCtrl.JobsCtrl.rawSQL);

export default router;