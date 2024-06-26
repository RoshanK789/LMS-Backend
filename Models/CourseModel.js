import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    Coursename: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: String,
      required: true,
    },
    courseimage:{
      type: String,
    
    },
    isbuy:{
      type: String,
      default: false,
    }
  },

);


const Course = mongoose.model("course", courseSchema);


export default Course;