import express from "express";
import configs from "./configs";
import { router } from "./routes";
import { deserializerUser, errorHandler, notFound } from "./middlewares";
import bodyParser from "cookie-parser";
import expressFileUpload from "express-fileupload";
import { connectDb, logger } from "./helpers";
import path from "path";

import cors from "cors";
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser());
app.use(cors());
app.use(deserializerUser);
app.use(
  expressFileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("FIVERR API!");
});

app.use(router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(process.cwd(), "./public/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(process.cwd(), "./public/dist/index.html"));
  });
}

// Error handlers
app.use(notFound);
app.use(errorHandler);

// Configs
const PORT = configs.PORT;

app.listen(PORT, async () => {
  await connectDb();
  logger.info(`🚀 Server ready at http://localhost:${PORT}`);
});
