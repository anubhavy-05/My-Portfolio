import mongoose, { Schema, Document } from "mongoose";

// Typescript interface banaya taaki code ko pata ho data kaisa aayega
export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

// MongoDB ka actual Schema
const ContactSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Agar model pehle se bana hai toh wahi use karo, warna naya banao (Next.js hot reload issue fix)
const Contact = mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;