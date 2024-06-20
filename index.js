import express, { json } from "express";
import helmet from "helmet";

import { catchError } from "./errorHandle.js";
import swaggerSetup from './swagger.js';

import router from "./route.js";

const app = express();

app.use(json());
app.use(helmet());

app.use(router);
swaggerSetup(app);

const port = process.env.PORT || 3000;
                                              
app.listen(port);
process.addListener("uncaughtException", catchError);