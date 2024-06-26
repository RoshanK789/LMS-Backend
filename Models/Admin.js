import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    mail: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);



const Admin = mongoose.model("Admin", AdminSchema);


export default Admin;
