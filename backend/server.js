import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

// helmet()  é uma prática recomendada para melhorar a segurança da sua aplicação Express.
// Ele configura automaticamente vários cabeçalhos HTTP para proteger contra vulnerabilidades comuns.
app.use(helmet());

//morgan('dev') é uma prática recomendada para monitorar as requisições HTTP que chegam ao servidor.
// Ele ajuda a depurar problemas, entender o comportamento da aplicação e monitorar o desempenho.
app.use(morgan("dev"));

app.get("/test", (req, res) => {
  res.send("hello from the test route");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
