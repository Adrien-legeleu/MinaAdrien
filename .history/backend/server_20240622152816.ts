import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const uri = process.env.MONGODB_KEY || "";
const PORT = 8080;

if (uri) {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("MongoDB connecté");
    })
    .catch((err: any) => {
      console.log(err);
    });
} else {
  console.log("Pas de clé URI pour la DB");
}

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Exemple d'authentification basique
const users = [{ username: "admin", password: "password" }];

app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  console.log(`Tentative de connexion avec le nom d'utilisateur : ${username}`);
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    res.status(200).json({ authToken: "fake-jwt-token" });
  } else {
    res
      .status(401)
      .json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
  }
});

// app.post("/auth/register", (req, res) => {
//   const { username, password } = req.body;
//   users.push({ username, password });
//   res.status(201).json({ authToken: "fake-jwt-token" });
// });

app.listen(PORT, () => {
  console.log(
    `Serveur connecté sur le port ${PORT} => url: http://localhost:${PORT}`
  );
});
