import express, { Express, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import "@utils/config";
import authRouter from "@routes/auth";
import userRouter from "@routes/user";
import urlRouter from "@routes/url";

const port = process.env.PORT || 5000;

const app: Express = express();

const notProduction = process.env.NODE_ENV !== "production";

if (notProduction) {
  const whitelist = [
    "http://localhost:8000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
  ];
  let corsOptions: CorsOptions = {
    credentials: true,
  };

  app.use(cors(corsOptions));
}

// built in express middleware <middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
//middlewares>

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/url", urlRouter);

app.listen(port, () => {
  console.log(`app listening at port ${port}`);
});
