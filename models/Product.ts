import mongoose, { Schema, model, models } from 'mongoose';

export interface IProduct {
  _id?: string;
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  reviews: IReview[];
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IReview {
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ProductSchema = new Schema<IProduct>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true, default: 100 },
    rating: { type: Number, default: 0 },
    reviews: [ReviewSchema],
    tags: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export default models.Product || model<IProduct>('Product', ProductSchema);
