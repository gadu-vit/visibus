import express from "express";
import cors from "cors";

import stopsRoutes from "./routes/stops";
import linesRoutes from "./routes/lines";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/stops", stopsRoutes);
app.use("/stops", linesRoutes); // ✅ agora faz sentido

app.listen(3001, "0.0.0.0", () => {
  console.log("Servidor rodando na porta 3001");
});
