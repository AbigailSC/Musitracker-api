import { Router } from 'express';
import {
  getUsers,
  // getUserById,
  // updateUser,
  // removeUser,
  addFavorite,
  removeFavorite,
  getFavorites
} from '../controllers/userControllers';
import { TokenValidation } from '../middlewares/verifyToken';

const router = Router();

router.get('/', getUsers);
// router.get("/:id", getUserById);
// router.put("/:id", updateUser);
// router.delete("/:id", removeUser);

router.post('/favorites', TokenValidation, addFavorite);

router.put('/favorites/:idFavorite', TokenValidation, removeFavorite);

router.get('/favorites/:idUser', TokenValidation, getFavorites);

export default router;
