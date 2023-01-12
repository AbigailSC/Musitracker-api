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
  const { idTitle, idUser } = req.body;
  // id del tema que va a agregar// usuario que actualizo
  try {
    const favoriteDuplicate = await UserSchema.find({
      'favorites.idTitle': idTitle
    });
    if (favoriteDuplicate.length > 0) {
      console.log('Ya esta agregado!');
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
  const { idUser } = req.body;
  const { idFavorite } = req.params;
  try {
    const removeFavOnFavoritesSchema = await FavoriteSchema.findByIdAndUpdate(
      idFavorite,
      {
        active: false
      }
    );

    // const removeFavOnUserSchema = await UserSchema.findByIdAndUpdate(idUser, {
    //   $pull: {
    //     favorites: {
    //       _id: idFavorite,
    //       active: false
    //     }
    //   }
    // });
    // update active to false in userFavorites
    // console.log(removeFavOnUserSchema);

    (await UserSchema.find(idUser)).forEach((element) => {
      element.favorites.forEach((element: IData) => {
        if (element._id === idFavorite) {
          element.active = false;
        }
      });
    });
    interface IData {
      _id: string;
      idTitle: number;
      date: Date;
      active: boolean;
    }

    res.send(removeFavOnFavoritesSchema);
  } catch (error) {
    console.log(error);
  }
};

export const getFavorites: RequestHandler = async (req, res) => {
  const { idUser } = req.params;
  try {
    const allFavorites = await FavoriteSchema.find({ idUser });
    res.json(allFavorites);
  } catch (error) {
    console.log(error);
  }
};
