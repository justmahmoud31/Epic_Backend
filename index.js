import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './src/config/db.js';
import { swaggerUi, swaggerSpec } from './src/config/swagger.js';
import { bootstrap } from "./src/Modules/bootstrap.js";;
import cors from 'cors';
dotenv.config();
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  origin: '*', // or 'https://api.ipek-eg.com' if you want to restrict
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(
  "/uploads",
  express.static("uploads", {
    setHeaders: (res, path) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);
const port = 3000
connectDB();
bootstrap(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`app listening on port ${port}! \n Swagger UI is available at http://localhost:${port}/api-docs`))