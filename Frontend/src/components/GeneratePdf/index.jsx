import { useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import "./index.css";

// Define styles for the PDF document
const pdfStyles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Times-Roman",
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold", // Makes the heading bold
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "32%", // Card width to fit three in a row
    marginBottom: 10,
    padding: 5,
    border: "1px solid #000", // Optional: Add border to the cards
    fontSize: 8, // Smaller font size for better fit
  },
  headline: {
    fontSize: 14, // Reduced headline font size
    fontWeight: "bold",
    marginBottom: 2,
  },
  subHeadline: {
    fontSize: 8, // Reduced subheadline font size
    fontStyle: "italic",
    marginBottom: 2,
  },
  article: {
    fontSize: 6, // Reduced article text font size
    textAlign: "justify",
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: 80, // Reduced image height
    marginBottom: 5,
  },
  footer: {
    marginTop: 10,
    fontSize: 6,
    textAlign: "center",
  },
});

// PDF Document Layout
const NewspaperPDF = ({ newsData }) => {
  const limitedNewsData = newsData.flat().slice(0, 15); // Limit to the first 15 articles

  return (
    <Document>
    <Page size={[594, 841]} style={pdfStyles.page}>
      {/* Newspaper Heading */}
      <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 20 }}>
        News Scade
      </Text>
      <Text style={{ fontSize: 14, textAlign: 'center', marginBottom: 20 }}>
        Date: {new Date().toLocaleDateString()} {/* Add current date */}
      </Text>
      
      <View style={pdfStyles.grid}>
        {limitedNewsData.map((article, articleIndex) => (
          <View key={articleIndex} style={pdfStyles.card}>
            <Text style={pdfStyles.headline}>{article.title}</Text>
            <Text style={pdfStyles.subHeadline}>
              {article.category} - {article.publishedAt}
            </Text>
            {article.urlToImage && (
              <Image style={pdfStyles.image} src={article.urlToImage} />
            )}
            <Text style={pdfStyles.article}>{article.description}</Text>
            <Text style={pdfStyles.article}>{article.content}</Text>
          </View>
        ))}
      </View>
      <Text style={pdfStyles.footer}>The Daily Times</Text>
    </Page>
  </Document>

  );
};

// Editable Newspaper UI Component
const NewsPaperGenerator = ({ news }) => {
  const [newsData, setNewsData] = useState([news]);

  const handleContentChange = (pageIndex, articleIndex, field, value) => {
    const updatedNews = [...newsData];
    updatedNews[pageIndex][articleIndex][field] = value;
    setNewsData(updatedNews);
  };

  return (
    <div>
      <h1 className="h1">Newspaper Editor</h1>
      <div className="newspaper-preview">
        {newsData.map((page, pageIndex) => (
          <div key={pageIndex} className="page">
            {page.map((article, articleIndex) => (
              <div key={articleIndex} className="section">
                <div className="column-wrapper">
                  <div className="column">
                    <input
                      type="text"
                      value={article.title}
                      onChange={(e) =>
                        handleContentChange(
                          pageIndex,
                          articleIndex,
                          "title",
                          e.target.value
                        )
                      }
                      className="headline"
                    />
                    <input
                      type="text"
                      value={article.category}
                      onChange={(e) =>
                        handleContentChange(
                          pageIndex,
                          articleIndex,
                          "category",
                          e.target.value
                        )
                      }
                      className="subHeadline"
                    />
                    <img
                      src={article.urlToImage}
                      alt="news"
                      className="image"
                    />
                    <textarea
                      value={article.description}
                      onChange={(e) =>
                        handleContentChange(
                          pageIndex,
                          articleIndex,
                          "description",
                          e.target.value
                        )
                      }
                      className="article"
                    />
                    <textarea
                      value={article.content}
                      onChange={(e) =>
                        handleContentChange(
                          pageIndex,
                          articleIndex,
                          "content",
                          e.target.value
                        )
                      }
                      className="article"
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="footer">
              Page {pageIndex + 1} - The Daily Times
            </div>
          </div>
        ))}
      </div>
      <PDFDownloadLink
        document={<NewspaperPDF newsData={newsData} />}
        fileName="newspaper.pdf"
      >
        {({ loading }) =>
          loading ? "Loading PDF..." : <button>Download PDF</button>
        }
      </PDFDownloadLink>
    </div>
  );
};

export default NewsPaperGenerator;
