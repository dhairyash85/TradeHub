// Ensure to have "type": "module" in your package.json

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import AuthRoutes from './Routes/AuthRoutes.js'; // Make sure to add .js extension
import ItemRoutes from "./Routes/ItemRoutes.js"

const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: '*'
};

const app = express();
app.use(express.json())
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader('access-control-allow-origin', '*');
  res.setHeader('access-control-allow-methods', '*');
  res.setHeader('access-control-allow-headers', '*');

  next();
});

const uri = "mongodb+srv://jaindhairyashj:dhairyash85@tradehub.ihqkfez.mongodb.net/?retryWrites=true&w=majority&appName=TradeHub";
mongoose.connect(uri)
  .then(() => console.log("connected"))
  .catch(err => console.log(err));

app.use("/api/auth", AuthRoutes);
app.use("/api/item", ItemRoutes);

const port = 5000;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
