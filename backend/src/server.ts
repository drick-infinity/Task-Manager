import express,{ Request, Response } from "express"; 
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Backend!");
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
