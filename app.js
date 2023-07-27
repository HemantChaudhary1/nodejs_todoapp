import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors"
export const app = express();  // Server is created using express

config({
   path:"./data/config.env",
});

// const router = express.Router();

//Using Middlewares
app.use(express.json());
app.use(cookieParser()); // it is used to access myid from token
app.use(cors({
     origin: [process.env.FRONTEND_URL],
     methods:["GET","POST","PUT","DELETE"],
     credentials:true,
   })
);


//Using Routes
app.use("/api/v1/users",userRouter);  // here "/users" is a prefix (It is a custom URL), Ye to honi hi chahiye and /api/v1/ it means it an api url with version v1 , it for our readbility if we want to change we can in future make it to version 2
app.use("/api/v1/task",taskRouter);


// // An API which will give data of all users
// router.get("/all",async (req,res) => {
     
//    const users = await  User.find({});    // User.find() , find all users

//    //  console.log(req.query);  // We can access all params using req.query --> query is a object which has all params
//    //  const keyword = req.query.keyword; // Params are queries
//    //  console.log(keyword);

//        res.json({
//          success:true,
//          users,
//        });
// });


// router.post("/new",async (req,res) => {   
   
//      const {name,email,password} = req.body;
    
//     await  User.create({
//       name,
//       email,
//       password,
//    });

//        res.status(201).cookie("temp","lol").json({   // Status Code = 201 --> Created
//          success:true,
//          message:"Registerd Successfully",
//        });
// });


// // Dynamic Routing
// router.get("/userid/special", (req,res) => {
     
//    res.json({
//        success:true,
//        message:"Just joking",
//    });
// });

// router.get("/userid/:id", async (req,res) => {
   
    
//    // const id = req.query.id;   // we can get id from query also using request sent using params 
//    // const user =  await  User.findById(id);

//     const {id} = req.params;    // we are getting id from req.body
//     const user =  await  User.findById(id);

//     res.json({
//         success:true,
//         user,

//     });
// });

app.get("/", (req,res) => {
   res.send("Nice Working");
});


// Using Error Middleware
app.use(errorMiddleware);