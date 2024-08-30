import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { db } from './firebase.js';
import scrapNews from './services/scrap.js';
import { format, subDays } from 'date-fns';

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Function to fetch news by category
const fetchNewsByCategory = async (category) => {
  const yesterdayDate = format(subDays(new Date(), 1), 'yyyy-MM-dd');

  const newsData = await scrapNews(category);

  return newsData.map(article => ({
    publishedAt: yesterdayDate,
    title: article.title,
    description: article.summary,
    urlToImage: article.image,
    content: article.content,
    category: category,
  }));
};

// Route to save news data from the News API to the database
app.post('/news/save', async (req, res) => {
  try {
    const todayDate = format(new Date(), 'yyyy-MM-dd');

    const internationalNews = await fetchNewsByCategory('lifestyle');
    const nationalNews = await fetchNewsByCategory('india');
    const businessyNews = await fetchNewsByCategory('business');
    const keralaNews = await fetchNewsByCategory('kerala');
    const educationNews = await fetchNewsByCategory('education');
    const politicalNews = await fetchNewsByCategory('political-pulse/');

    const allArticles = [...internationalNews, ...nationalNews,...businessyNews,...keralaNews,...educationNews,...politicalNews];

    if (allArticles.length > 0) {
      await db.collection('news').doc(todayDate).set({
        date: todayDate,
        articles: allArticles,
      });
      res.send({ message: 'News data saved successfully', data: allArticles });
    } else {
      res.status(404).send({ message: 'No articles found to save' });
    }
  } catch (error) {
    console.error('Error saving news:', error);
    res.status(500).send({ error: 'Failed to save news' });
  }
});

// Custom route to retrieve news data by date and category using query parameters
app.get('/news', async (req, res) => {
  try {
    const { date, category } = req.query;

    if (!date) {
      return res.status(400).send({ error: 'Date query parameter is required' });
    }

    const formattedDate = format(new Date(date), 'yyyy-MM-dd');
    const newsDoc = await db.collection('news').doc(formattedDate).get();

    if (newsDoc.exists) {
      let articles = newsDoc.data().articles;

      if (category) {
        articles = articles.filter(article => article.category === category.toLowerCase());
      }

      if (articles.length > 0) {
        res.send({ message: `News data for ${formattedDate} retrieved successfully`, data: articles });
      } else {
        res.status(404).send({ message: `No news data found for the category: ${category}` });
      }
    } else {
      res.status(404).send({ message: `No news data found for the date: ${formattedDate}` });
    }
  } catch (error) {
    console.error('Error retrieving news:', error);
    res.status(500).send({ error: 'Failed to retrieve news' });
  }
});

app.get('/', async (req, res) => {
  res.send('API is live');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
