// ai.js
const express = require('express');
const model = require('../ai-model/model.js');

const app = express();
app.use(express.json());

app.post('/predict', (req, res) => {
  const input = req.body.input;
  const output = model.predict(input);
  res.json({ output });
});

app.listen(3000, () => {
  console.log('AI API listening on port 3000');
});