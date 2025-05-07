import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './src/config/db.js';
import { swaggerUi, swaggerSpec } from './src/config/swagger.js';
import { bootstrap } from "./src/Modules/bootstrap.js";;
import cors from 'cors';
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = ['https://api.ipek-eg.com', 'http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
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