import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required:true
    },
    price: {
      type: String,
      required:true
    },
    category: {
      type: String,
      required:true
    },
    image: {
      type: String,
      required:true
    },
    description:{
      type: String
    },
    isCompleted:{
      type: Boolean,
      default:false
    },
    
    createdAt: {
      type: Date,
      dafault:Date.now() + 7*24*60*60*1000
    }
  },
  {
    timestamps: true,  // This will add createdAt and updatedAt fields
  }
);

export const Product = mongoose.model("Product", ProductSchema);