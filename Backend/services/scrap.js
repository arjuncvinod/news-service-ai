import axios from 'axios';
import * as cheerio from 'cheerio';

const scrapNews = async (category) => {
  const url = `https://indianexpress.com/section/${category}/`;

  function cleanContent(content) {
    let cleanedContent = content
      .replace(/Advertisement/g, '')
      .replace(/\t/g, ' ')
      .replace(/\n/g, ' ')
      .replace(/\+/g, ' ')
      .replace(/\s\s+/g, ' ')
      .replace(/and get latest news and updates/g, '')
      .trim();
    
    cleanedContent = cleanedContent.replace(/Click here to join.*?on WhatsApp/g, '');
    
    return cleanedContent.trim();
  }

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const newsItems = [];
    const links = [];

    $('h2.title').each((index, element) => {
      const title = $(element).text().trim();
      const summary = $(element).siblings('p').text().trim();
      const link = $(element).children('a').attr('href');
      links.push(link);
      newsItems.push({ title, summary, link });
    });

    const detailedNews = await Promise.all(newsItems.map(async item => {
      try {
        const articleHtml = await axios.get(item.link);
        const $ = cheerio.load(articleHtml.data);

        const fullTitle = $('h1').text().trim();
        const fullContent = $('div.story_details').text().trim();
        const image = $('span.custom-caption img').attr('src') || '';

        return {
          title: fullTitle || item.title,
          summary: item.summary,
          link: item.link,
          content: cleanContent(fullContent),
          image
        };
      } catch (error) {
        console.error(`Error fetching content from ${item.link}: ${error}`);
        return null;
      }
    }));

    return detailedNews.filter(item => item !== null);
  } catch (error) {
    console.error(`There was an error fetching the URL: ${error}`);
    return [];
  }
};

export default scrapNews;
