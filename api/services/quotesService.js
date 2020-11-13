const quotes = [
    {
      id: 0,
      b_id: 0,
      quote: "Chance favors only the prepared mind.",
    },
    {
      id: 1,
      b_id: 0,
      quote: "Never underestimate spite as a motivator for genius.",
    },
    {
      id: 2,
      b_id: 1,
      quote:
        "Most scary stories are, of course, meant to be told. They are more scary that way. But _how_ you tell them is important.",
    },
    {
      id: 3,
      b_id: 2,
      quote:
        "It isn't often that Aunt Dahlia lets her angry passions rise, but when she does, strong men climb trees and pull them up after them.",
    },
  ];

  quotesService = {};

  quotesService.read = () => {
    return quotes;
  };

  module.exports = quotesService;