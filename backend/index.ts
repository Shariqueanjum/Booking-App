import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./db/connect";
import userRoutes from "./routes/users"
import authRoutes from "./routes/auth"

const app=express();
const port=3000;

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes)


app.get("/",(req,res)=>{
    res.send("hello");
})














const startServer = async () => {
    try {
      if(process.env.MONGODB_URL===undefined)throw new Error();
      connect(process.env.MONGODB_URL);
      app.listen(port, () => console.log(`Server started on port ${port}`));
    } catch (error) {
      console.log(error,"welcome");
    }
  };

  startServer();