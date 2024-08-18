import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { db, auth } from './firebase.js';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/news/all', async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: 'all',
        language: 'en',
        sortBy: 'popularity',
        apiKey: '37b720850b0e4450a50a8b543e831d94',
      },
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch news' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
