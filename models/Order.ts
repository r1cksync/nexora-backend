import mongoose, { Schema, model, models } from 'mongoose';

export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface IOrder {
  _id?: string;
  orderId: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  items: IOrderItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  timestamp: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
});

const OrderSchema = new Schema<IOrder>(
  {
    orderId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    items: [OrderItemSchema],
    total: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    timestamp: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default models.Order || model<IOrder>('Order', OrderSchema);
