import mongoose, { Schema, model, models } from 'mongoose';

export interface ICartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ICart {
  _id?: string;
  userId: string;
  items: ICartItem[];
  total: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const CartItemSchema = new Schema<ICartItem>({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  image: { type: String, required: true },
});

const CartSchema = new Schema<ICart>(
  {
    userId: { type: String, required: true, unique: true },
    items: [CartItemSchema],
    total: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Calculate total before saving
CartSchema.pre('save', function (next) {
  this.total = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  next();
});

export default models.Cart || model<ICart>('Cart', CartSchema);
