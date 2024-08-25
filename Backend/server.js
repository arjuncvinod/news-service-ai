// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import { db } from './firebase.js';
// import axios from 'axios';
// import { format, subDays, parseISO } from 'date-fns';

// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Function to get the date of yesterday
// const getYesterdayDate = () => {
//   return format(subDays(new Date(), 1), 'yyyy-MM-dd');
// };

// // Route to save news data from the News API to the database
// app.post('/news/save', async (req, res) => {
//   try {
//     const todayDate = format(new Date(), 'yyyy-MM-dd');
//     const yesterdayDate = getYesterdayDate();

//     // Fetch news from the external API
//     const response = await axios.get('https://newsapi.org/v2/everything', {
//       params: {
//         q: 'all',
//         language: 'en',
//         sortBy: 'popularity',
//         apiKey: '37b720850b0e4450a50a8b543e831d94', // Replace with your actual API key
//         from: yesterdayDate,
//       },
//     });

//     const articles = response.data.articles;

//     if (articles && articles.length > 0) {
//       // Save the news data to Firestore
//       await db.collection('news').doc(todayDate).set({
//         date: todayDate,
//         articles: articles,
//       });
//       res.send({ message: 'News data saved successfully'});
//     } else {
//       res.status(404).send({ message: 'No articles found to save' });
//     }

//   } catch (error) {
//     console.error('Error saving news:', error);
//     res.status(500).send({ error: 'Failed to save news' });
//   }
// });

// // Custom route to retrieve news data by date using a query parameter
// app.get('/news', async (req, res) => {
//   try {
//     const { date } = req.query;

//     if (!date) {
//       return res.status(400).send({ error: 'Date query parameter is required' });
//     }

//     // Ensure the date is in a valid format
//     const formattedDate = format(parseISO(date), 'yyyy-MM-dd');

//     // Retrieve the document from Firestore with the given date as ID
//     const newsDoc = await db.collection('news').doc(formattedDate).get();

//     if (newsDoc.exists) {
//       const articles = newsDoc.data().articles;
//       res.send({ message: `News data for ${formattedDate} retrieved successfully`, data: articles });
//     } else {
//       res.status(404).send({ message: `No news data found for the date: ${formattedDate}` });
//     }

//   } catch (error) {
//     console.error('Error retrieving news:', error);
//     res.status(500).send({ error: 'Failed to retrieve news' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { db } from './firebase.js';
import axios from 'axios';
import { format, subDays } from 'date-fns';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Function to fetch news by category
const fetchNewsByCategory = async (category) => {
  const yesterdayDate = format(subDays(new Date(), 1), 'yyyy-MM-dd');
  
  const response = await axios.get('https://newsapi.org/v2/everything', {
    params: {
      q: category,
      language: 'en',
      sortBy: 'popularity',
      apiKey: '37b720850b0e4450a50a8b543e831d94', // Replace with your actual API key
      from: yesterdayDate,
    },
  });

  // Extract and format only the necessary fields
  return response.data.articles.map(article => ({
    publishedAt: article.publishedAt,
    title: article.title,
    description: article.description,
    urlToImage: article.urlToImage,
    content: article.content,
    category: category,
  }));
};

// Route to save news data from the News API to the database
app.post('/news/save', async (req, res) => {
  try {
    const todayDate = format(new Date(), 'yyyy-MM-dd');

    // Fetch news data for different categories
    const internationalNews = await fetchNewsByCategory('international');
    const nationalNews = await fetchNewsByCategory('india');
    const technologyNews = await fetchNewsByCategory('technology');

    // Combine all articles into one array
    const allArticles = [...internationalNews, ...nationalNews, ...technologyNews];

    if (allArticles.length > 0) {
      // Save the combined news data to Firestore
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
        // Filter articles by category if provided
        articles = articles.filter(article => article.category === category.toLocaleLowerCase());
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
  res.send("API is live")
})
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});