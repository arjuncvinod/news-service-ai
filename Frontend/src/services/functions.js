const getDate=()=>{
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate())
    
    return `${year}-${month}-${day}`;
      }


      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
      };

      function estimateReadingTime(text, wordsPerMinute = 200) {
        const wordCount = text.split(/\s+/).length;
        const readingTimeInMinutes = wordCount / wordsPerMinute;
        const readingTimeInSeconds = Math.round(readingTimeInMinutes * 60);
        return Math.ceil(readingTimeInSeconds/60);
      }

export {getDate,shuffleArray,estimateReadingTime}