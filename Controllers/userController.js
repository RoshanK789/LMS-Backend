import Course from "../Models/CourseModel.js";


import dotenv from "dotenv";

dotenv.config();

export const createcourse=async(req,res)=>
    {
        try{
            const newcourse=new Course(req.body);
            await newcourse.save();
            res.status(200).json({message:"Created",result:newcourse});
        }
        catch (error) {
            res.status(500).json({message:"internal serever error"})
          }
    }

    export const getcourse=async(req,res)=>
        {
            try{
                const getcourse=await Course.find()
                res.status(200).json(getcourse)

            }
            catch (error) {
                res.status(500).json({message:"internal serever error in get method"})
              }
        }

        export const getcourseid=async(req,res)=>
            {
                try{
                    const id=req.params.id;
                    console.log(id);
                    const getcourseid=await Course.find({_id:id})
                    if (!getcourseid) {
                        return res.status(404).send("Not Found");
                      }
                      res
                    .status(200)
                    .json({ message: "data fetched successfully", data: getcourseid });
                }
                catch (error) {
                    res.status(500).json({message:"internal serever error in get method"})
                  }
            }


export const editcourse=async(req,res)=>
    {
        try{
            const id=req.params.id;
            const {Coursename,price,courseimage,isbuy}=req.body
            const result=await Course.find({_id:id},{Coursename,price,courseimage,isbuy})
            if(result.matchedCount===0)
                {
                    return res.status(404).send("not found")
                }
                const updatecourse=await Course.findone({_id:id})
                res.status(200).json({message:"success",course:updatecourse})
        }

            catch (error) {
                res.status(500).json({message:"internal serever error in get method"})
              }
        
    }

    export const buycourse=async(req,res)=>
        {
            try{
                const id=req.params.id;
                const {Coursename,price,courseimage,isbuy}=req.body
                const result=await Course.updateOne({_id:id},{isbuy:"true"})
                if(result.matchedCount===0)
                    {
                        return res.status(404).send("not found")
                    }
                    const updatecourse=await Course.find({_id:id})
                    res.status(200).json({message:"success",course:updatecourse})
            }
    
                catch (error) {
                    res.status(500).json({message:"internal serever error in get method"})
                  }
            
        }

        export const deleteUser = async (req, res, next) => {
            try {
              await Course.findByIdAndDelete(req.params.id);
              res.status(200).json( 'deleted successfully' );
            } catch (error) {
              next(error);
            }
          };