import { Schema, model, Document } from 'mongoose';

export interface IFavorite extends Document {
  idTitle: number;
  idUser: string;
  active: boolean;
}

const userSchema = new Schema(
  {
    idTitle: {
      type: Number,
      required: true
    },
    idUser: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model<IFavorite>('favorite', userSchema);
