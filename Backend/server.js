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

const fetchNewsByCategory = async (category) => {
  const today = format(new Date(), 'yyyy-MM-dd');

  const newsData = await scrapNews(category);

  return newsData.map(article => ({
    publishedAt: today,
    title: article.title,
    description: article.summary,
    urlToImage: article.image,
    content: article.content,
    category: category,
  }));
};

app.post('/news/save', async (req, res) => {
  try {
    const todayDate = format(new Date(), 'yyyy-MM-dd');

    const internationalNews = await fetchNewsByCategory('lifestyle');
    const nationalNews = await fetchNewsByCategory('india');
    const businessyNews = await fetchNewsByCategory('business');
    const keralaNews = await fetchNewsByCategory('kerala');
    const educationNews = await fetchNewsByCategory('education');
    const politicalNews = await fetchNewsByCategory('political-pulse');

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

      if (category && category.toLowerCase() !== 'all') {
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
app.get('/news/by-title', async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).send({ error: 'Title query parameter is required' });
    }

  
    const todayDate = format(new Date(), 'yyyy-MM-dd');
    const newsDoc = await db.collection('news').doc(todayDate).get();

    if (newsDoc.exists) {
      const articles = newsDoc.data().articles;

      const article = articles.find(article => article.title === decodeURIComponent(title));

      if (article) {
        res.send({ message: 'News article retrieved successfully', data: article });
      } else {
        res.status(404).send({ message: `No news article found with the title: ${title}` });
      }
    } else {
      res.status(404).send({ message: `No news data found for the date: ${todayDate}` });
    }
  } catch (error) {
    console.error('Error retrieving news by title:', error);
    res.status(500).send({ error: 'Failed to retrieve news article' });
  }
});
app.get('/', async (req, res) => {
  res.send('API is live');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
