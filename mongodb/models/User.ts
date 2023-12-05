import mongoose from "mongoose";
import { Document, Model, model, models, Schema } from "mongoose";
import bcrypt from "bcrypt";

// Also create unique invite code for the user to share it with others for referrals, use v4 uuid4

// /**
//  * @typedef User
//  * @property {string} name
//  * @property {string} email
//  * @property {string} password
//  * @property {string} image
//  * @property {string} [phoneNumber]
//  * @property {Date} [createdAt]
//  * @property {Date} [updatedAt]
//  * @property {number} [walletBalance]
//  */

interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  image: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
  wallet: Schema.Types.ObjectId;
}

interface Methods {
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument, {}, Methods>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  image: { type: String, required: false },
  phoneNumber: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  wallet: { type: Schema.Types.ObjectId, ref: "Wallet" },
});

// Hashing password before saving only if after modifying password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    throw error;
  }
});

// Comparing password method
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

// /**
//  * @type {import('mongoose').Model<User>}
//  */

// export default mongoose.models.User || mongoose.model("User", userSchema);

const UserModel = models.User || model<UserDocument>("User", userSchema);

export default UserModel as Model<UserDocument>;