import {Router} from 'express';
const router = Router();

import { getHouse, createHouse, updateHouse, deleteHouse } from '../controllers/index.controller';
import { getPostCode, getPostCodeById } from '../controllers/post-code.controller';

//house
router.get('/home', getHouse);
router.post('/home', createHouse);
router.patch('/home/:id', updateHouse)
router.delete('/home/:id', deleteHouse);

//post_code
router.get('/postCode', getPostCode);
router.get('/postCode/:id', getPostCodeById);

export default router;