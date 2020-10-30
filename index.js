const express = require("express");
const { title } = require("process");
const { runInNewContext } = require("vm");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//DATA
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

const ratings = [
    {
        id: 0,
        b_id: 0,
        rating: 7
    },
    {
        id: 1,
        b_id: 1,
        rating: 6 
    },
    {
        id: 2,
        b_id: 2,
        rating: 8
    }
]

//REQUESTS

//GET endpoint: books
//Req: none
//Optional: none
app.get('/api/books', (req,res)=>{
    res.status(200).json({
        success: true,
        books: books
    });
});

//GET endpoint: quotes
//Req: none
//Optional: none
app.get('/api/quotes', (req,res)=>{
    res.status(200).json({
        success: true,
        quotes: quotes
    });
});

//GET endpoint: raitings
//Req: none
//Optional: none
app.get('/api/ratings', (req,res)=>{
    res.status(200).json({
        success: true,
        ratings: ratings
    });
});

//GET endpoint: quotes
//Req: b_id
//Optional: none
app.get('/api/quotes/:b_id', (req,res)=>{
    const b_id = Number(req.params.b_id);
    const bquotes = [];
    quotes.forEach(quote => quote.b_id === b_id ? bquotes.push(quote.quote): false);
    res.status(200).json({
        success:true,
        title: books[id].title,
        quotes: bquotes
    });
});

//GET endpoint: books
//Req: id
//Optional: none
app.get('/api/books/:id', (req,res)=>{
    //console.log(books[req.params.id]);
    res.status(200).json({
        success: true,
        books: books[req.params.id]['title']
    });
});

//POST endpoint: books
//Req: title, author, year, month
//Optional: none
app.post('/api/books', (req,res)=>{
    console.log(req.body);
    const [title, author, year, month]=[req.body.title,req.body.author,req.body.year,req.body.month];
    if(title && author && year && month) {
        //const title = req.body.title;
        
        //console.log(title);
        const newBook = {
            id: books.length,
            title:title,
            author:author,
            year:year,
            month:month
        };
        books.push(newBook);
        res.status(201).json({
            success: true,
            book: title,
            books: books
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Required fields missing'
        });
    }
    
});

//PUT endpoint: books
//Req: id
//Optional: title, author, year, month
app.put('/api/books', (req,res)=>{
    const id = typeof(req.body.id) === 'number' ? req.body.id : false;
    const [title, author, year, month] = [
        typeof(req.body.title) === 'string' && req.body.title.trim().length > 0 ? req.body.title : false,
        typeof(req.body.author) === 'string' && req.body.author.trim().length > 0 ? req.body.author : false,
        typeof(req.body.year) === 'number' ? req.body.year : false,
        typeof(req.body.month) === 'number' ? req.body.month : false
    ];
    if(id || id === 0) {
        title ? books[id].title = title : false;
        author ? books[id].author = author : false;
        year ? books[id].year = year : false;
        month ? books[id].month = month : false;
        res.status(400).json({
            success : true,
            message: books[id]
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Required fields missing/invalid'
        });
    }
     
});

//DELETE endpoint: books
//Req: id
//Optional: none
app.delete('/api/books', (req,res)=>{
    const id = typeof(req.body.id) === 'number' ? req.body.id : false;
    if (id || id === 0) {
        books.splice(id,1);
        res.status(200).json({
            success:true,
            message: 'Book successfully deleted!',
            books: books
        });
    } else {
        res.status(400).json({
            success:false,
            message: 'Something went wrong!'
        });
    }
});


//Start server
app.listen(4000, () => {
  console.log("Server's running, yay.");
});
