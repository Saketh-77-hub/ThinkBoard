import express from "express";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
    origin: "http://localhost:5173",
}));
   
app.use(express.json());
app.use(rateLimiter);


app.use("/api/notes", notesRoutes);

connectDB().then( () => {
    app.listen(PORT, () => {
    console.log("server started on port :5001");
});

});


// mongodb+srv://sakethgoud1993:pCZfWrjWRzJXJfZ5@cluster0.f9legee.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0