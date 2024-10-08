import 'express-async-errors'
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import ApiRouter from "./apis/route"
import errorHandler from "./middleware/handle-error";
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from "./swagger_output.json";
import cors from "cors"

dotenv.config();
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT;

app.get("/", (_request: Request, response: Response) => { 
  response.status(200).send("Hello World");
}); 

app.use('/api',ApiRouter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.use(errorHandler)


app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  throw new Error(error.message);
});
