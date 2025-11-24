// models/Item.js
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique:true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    image: { type: String },
    description: { type: String }
  },
  { timestamps: true }
);
const Item = mongoose.model("Item", itemSchema);

export default Item;
