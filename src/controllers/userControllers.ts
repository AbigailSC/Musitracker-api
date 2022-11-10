import { RequestHandler } from 'express';
import UserSchema from '../models/User';
import FavoriteSchema from '../models/Favorites';

export const getUsers: RequestHandler = async (_req, res) => {
  try {
    const allUsers = await UserSchema.find();
    res.json(allUsers);
  } catch (error) {
    console.error(error);
  }
};

export const getUserById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const userFound = await UserSchema.findById(id);
    res.json(userFound);
  } catch (error) {
    console.log(error);
  }
};

export const updateUser: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const userUpdated = await UserSchema.findByIdAndUpdate(id, req.body);
    res.json(userUpdated);
  } catch (error) {
    console.log(error);
  }
};

export const removeUser: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const userDeleted = await UserSchema.findByIdAndDelete(id);
    res.send(userDeleted);
  } catch (error) {
    console.log(error);
  }
};

export const addFavorite: RequestHandler = async (req, res) => {
  const { idTitle } = req.body; // id del tema que va a agregar
  const { idUser } = req.params; // usuario que actualizo
  try {
    const favoriteDuplicate = await UserSchema.find({
      'favorites.idTitle': idTitle
    });
    if (favoriteDuplicate.length > 0) {
      res.status(400).json('The song already exists in your favorites!');
    } else {
      const newFavorite = await FavoriteSchema.create({
        idTitle,
        idUser,
        active: true
      });
      await UserSchema.findByIdAndUpdate(idUser, {
        $push: {
          favorites: {
            _id: newFavorite._id,
            idTitle,
            date: new Date(),
            active: true
          }
        }
      });

      res.json(newFavorite);
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeFavorite: RequestHandler = async (req, res) => {
  const { idFavorite } = req.params;
  try {
    const userFavorite = await FavoriteSchema.findByIdAndUpdate(idFavorite, {
      active: false
    });
    res.send(userFavorite);
  } catch (error) {
    console.log(error);
  }
};

export const getFavorites: RequestHandler = async (req, res) => {
  const { idUser } = req.params;
  try {
    const allFavorites = await UserSchema.findById(idUser);
    res.json(allFavorites?.favorites);
  } catch (error) {
    console.log(error);
  }
};
