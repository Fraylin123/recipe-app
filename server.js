import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express()
app.use(cors())
app.use(express.json())

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


app.post("/api/recipe", async(req, res) =>{
    const {newType, region, time} = req.body;
    if (!region || !time){
        return res.status(400).json({error: "Invalid input"})
    } 

    try{
        const model = genAI.getGenerativeModel({model: "gemini-2.5-flash"});

        const prompt = 
        `You are a professional chef that knows every recipe in the world
        
        Generate one recipe that is ${newType} that is from ${region} and that takes ${time} or less

        Format:
        Title:
        Ingredients:
        Steps: 

        Do not include any extra commentary.
        
        `;

        const result = await model.generateContent(prompt)
        const recipe = result.response.text();
        res.json({recipe});
    } catch(error){
        console.error("Gemini error:", error);
        res.status(500).json({ error: "Failed to generate recipe" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"))