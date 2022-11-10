import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  imageProfile: string;
  favorites: [];
  encryptPassword: (password: string) => Promise<string>;
  validatePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    imageProfile: {
      type: String,
      required: false
    },
    favorites: []
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.methods.encryptPassword = async (
  password: string
): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await Promise.resolve(bcrypt.hash(password, salt));
};

userSchema.methods.validatePassword = async function (
  password: string
): Promise<boolean> {
  const validate = await bcrypt.compare(password, this.password);
  return validate;
};

export default model<IUser>('user', userSchema);
