import { RequestHandler } from 'express';
import UserScheme, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';
// import axios from 'axios';

export const singUp: RequestHandler = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await UserScheme.findOne({ email });
    if (user !== null) return res.status(400).json('Email already exists');
    const newUser: IUser = new UserScheme({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      imageProfile: `https://ui-avatars.com/api/?name=${
        username as string
      }&color=fff&background=random&size=400&font-size=0.5&rounded=true`,
      password
    });

    newUser.password = await newUser.encryptPassword(newUser.password);
    const savedUser = await newUser.save();

    const token: string = jwt.sign(
      { _id: savedUser._id },
      process.env.TOKEN_SECRET ?? 'tokenSecret'
    );

    console.log(savedUser);
    res.header('authToken', token).json({ token });
  } catch (error) {
    console.log(error);
  }
};

export const singIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserScheme.findOne({ email: email.toLowerCase() });
    if (user === null) return res.status(400).json('Email is wrong');
    const passwordValidate: boolean = await user.validatePassword(password);
    if (!passwordValidate) return res.status(401).json('Invalid password');
    const token: string = jwt.sign(
      { _id: user._id },
      process.env.TOKEN_SECRET ?? 'tokenSecret',
      {
        expiresIn: 60 * 60
      }
    );
    res.header('authToken', token).json({
      user,
      token
    });
  } catch (error) {
    console.log(error);
  }
};

export const profile: RequestHandler = async (req, res) => {
  try {
    const userProfile = await UserScheme.findById(req.userId, { password: 0 });
    if (userProfile === null) return res.status(400).json('No user found');
    res.json(userProfile);
  } catch (error) {
    console.log(error);
  }
};
