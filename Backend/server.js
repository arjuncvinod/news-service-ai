// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import { db } from './firebase.js';
// import axios from 'axios';
// import { format, subDays } from 'date-fns';

// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Function to get the date of yesterday
// const getYesterdayDate = () => {
//   return format(subDays(new Date(), 1), 'yyyy-MM-dd');
// };

// app.get('/news/all', async (req, res) => {
//   try {
//     const todayDate = format(new Date(), 'yyyy-MM-dd');
//     const yesterdayDate = getYesterdayDate();

//     const newsDoc = await db.collection('news').doc(todayDate).get();

//     let articles;
//     if (newsDoc.exists) {
//       // If the document exists, retrieve the articles
//       articles = newsDoc.data().articles;
//     } else {
//       // If the document does not exist, fetch from the news API
//       const response = await axios.get('https://newsapi.org/v2/everything', {
//         params: {
//           q: 'all',
//           language: 'en',
//           sortBy: 'popularity',
//           apiKey: '37b720850b0e4450a50a8b543e831d94',
//           from: yesterdayDate,
//         },
//       });

//       articles = response.data.articles;

//       // Save the news data to Firestore with today's date as the document ID
//       await db.collection('news').doc(todayDate).set({
//         date: todayDate,
//         articles: articles,
//       });
//     }

//     // Log the content of each article to the console (Optional)
//     articles.forEach((article, index) => {
//       console.log(`Article ${index + 1}: ${article.content}`);
//     });

//     // Send the news data as a response
//     res.send({ message: 'News data retrieved successfully', data: articles });

//   } catch (error) {
//     console.error('Error fetching news:', error);
//     res.status(500).send({ error: 'Failed to fetch news' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { db } from './firebase.js';
import axios from 'axios';
import { format, subDays, parseISO } from 'date-fns';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Function to get the date of yesterday
const getYesterdayDate = () => {
  return format(subDays(new Date(), 1), 'yyyy-MM-dd');
};

// Route to save news data from the News API to the database
app.post('/news/save', async (req, res) => {
  try {
    const todayDate = format(new Date(), 'yyyy-MM-dd');
    const yesterdayDate = getYesterdayDate();

    // Fetch news from the external API
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: 'all',
        language: 'en',
        sortBy: 'popularity',
        apiKey: '37b720850b0e4450a50a8b543e831d94', // Replace with your actual API key
        from: yesterdayDate,
      },
    });

    const articles = response.data.articles;

    if (articles && articles.length > 0) {
      // Save the news data to Firestore
      await db.collection('news').doc(todayDate).set({
        date: todayDate,
        articles: articles,
      });
      res.send({ message: 'News data saved successfully'});
    } else {
      res.status(404).send({ message: 'No articles found to save' });
    }

  } catch (error) {
    console.error('Error saving news:', error);
    res.status(500).send({ error: 'Failed to save news' });
  }
});

// Custom route to retrieve news data by date using a query parameter
app.get('/news', async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).send({ error: 'Date query parameter is required' });
    }

    // Ensure the date is in a valid format
    const formattedDate = format(parseISO(date), 'yyyy-MM-dd');

    // Retrieve the document from Firestore with the given date as ID
    const newsDoc = await db.collection('news').doc(formattedDate).get();

    if (newsDoc.exists) {
      const articles = newsDoc.data().articles;
      res.send({ message: `News data for ${formattedDate} retrieved successfully`, data: articles });
    } else {
      res.status(404).send({ message: `No news data found for the date: ${formattedDate}` });
    }

  } catch (error) {
    console.error('Error retrieving news:', error);
    res.status(500).send({ error: 'Failed to retrieve news' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
