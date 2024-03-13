import express from "express";
import { createServer } from "http";
import bp from "body-parser";
import router from "./src/routes/index.js";
import dotenv from 'dotenv';
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerDefinition from "./src/utils/swaggerDefinition.js";
// import { Server } from "socket.io";

dotenv.config();
const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;
// const io = new Server(server);


const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(options);

app.use(bp.urlencoded({ extended: false }));


server.listen(PORT, () => {
  console.log("Server is running on port 3000");
});

router(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));