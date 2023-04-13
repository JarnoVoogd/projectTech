const getQuote = async () => {
  try {
    const response = await fetch('https://api.quotable.io/random');
    const quote = await response.json();
    console.log(quote);
    const quoteText = `${quote.content} - ${quote.author}`;
    document.querySelector('.myProfile-quote').innerHTML = quoteText;
  } catch (err) {
    console.log(err);
  }
};

getQuote();