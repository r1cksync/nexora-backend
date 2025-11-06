import mongoose, { Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IWishlistItem {
  productId: string;
  addedAt: Date;
}

export interface IUser {
  _id?: string;
  userId: string;
  name: string;
  email: string;
  password: string;
  wishlist: IWishlistItem[];
  preferences: {
    favoriteCategories: string[];
    priceRange: { min: number; max: number };
  };
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const WishlistItemSchema = new Schema<IWishlistItem>({
  productId: { type: String, required: true },
  addedAt: { type: Date, default: Date.now },
});

const UserSchema = new Schema<IUser>(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    wishlist: [WishlistItemSchema],
    preferences: {
      favoriteCategories: [{ type: String }],
      priceRange: {
        min: { type: Number, default: 0 },
        max: { type: Number, default: 10000 },
      },
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default models.User || model<IUser>('User', UserSchema);
