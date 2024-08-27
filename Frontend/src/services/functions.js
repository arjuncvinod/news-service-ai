const getDate=()=>{
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate())
    
    return `${year}-${month}-${day}`;
      }

export {getDate}