import mongoose from "mongoose";

export const connectDB = () =>{
    mongoose   // Mongo DB Database connected to Node js
      .connect(process.env.MONGO_URI,{
         dbName:"backendapi",
      })
      .then( () => console.log("Database Connected"))
      .catch((e) => console.log(e));
};