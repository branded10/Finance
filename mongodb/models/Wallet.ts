import { Document, Model, model, models, Schema } from "mongoose";

interface TransactionDocument extends Document {
  type: "credit" | "debit";
  amount: number;
  date: Date;
}

const transactionSchema = new Schema<TransactionDocument>({
  type: { type: String, enum: ["credit", "debit"], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

interface WalletDocument extends Document {
  balance: number;
  transactions: TransactionDocument[];
}

const walletSchema = new Schema<WalletDocument>({
  balance: { type: Number, default: 0 },
  transactions: [transactionSchema],
});

const WalletModel =
  models.Wallet || model<WalletDocument>("Wallet", walletSchema);

export default WalletModel as Model<WalletDocument>;

// import mongoose from "mongoose";

// const transactionSchema = new mongoose.Schema({
//   type: { type: String, enum: ["credit", "debit"], required: true },
//   amount: { type: Number, required: true },
//   date: { type: Date, default: Date.now },
// });

// const walletSchema = new mongoose.Schema({
//   balance: { type: Number, default: 0 },
//   transactions: [transactionSchema],
// });

// export default mongoose.models.Wallet || mongoose.model("Wallet", walletSchema);