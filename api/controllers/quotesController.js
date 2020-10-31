const quotes = [
    {
        id: 0,
        b_id: 0,
        quote: 'Chance favors only the prepared mind.'
    },
    {
        id: 1,
        b_id: 0,
        quote: 'Never underestimate spite as a motivator for genius.'
    },
    {
        id: 2,
        b_id: 1,
        quote: 'Most scary stories are, of course, meant to be told. They are more scary that way. But _how_ you tell them is important.'
    },
    {
        id: 3,
        b_id: 2,
        quote: 'It isn\'t often that Aunt Dahlia lets her angry passions rise, but when she does, strong men climb trees and pull them up after them.'
    }
]

const books = [
    {
      id: 0,
      title: "The Disappearing Spoon",
      author: "Sam Kean",
      year: 2020,
      month: 10
    },
    {
      id: 1,
      title: "Scary Stories to Tell in the Dark",
      author: "Alvin Schwartz",
      year: 2020,
      month: 10
    },
    {
      id: 2,
      title: "Right Ho, Jeeves",
      author: "P.G. Wodehouse",
      year: 2020,
      month: 9
    },
  ];

const quotesController = {};


quotesController.read = (req,res)=>{
    res.status(200).json({
        success: true,
        quotes: quotes
    });
};

quotesController.get = (req,res)=>{
    const b_id = Number(req.params.b_id);
    const bquotes = [];
    //If given id matches b_id in quotes array, push it to bquotes and then display the quotes in response
    quotes.forEach(quote => quote.b_id === b_id ? bquotes.push(quote.quote): false);
    res.status(200).json({
        success:true,
        title: books[b_id].title,
        quotes: bquotes
    });
}

module.exports = quotesController;