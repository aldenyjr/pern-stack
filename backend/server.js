import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoute.js";
import { sql } from "./config/db.js";

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

app.use("/api/products", productRoutes);

async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log("Database initialized successfully");
  } catch (error) {
    console.log("Error initDB", error);
  }
}
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
