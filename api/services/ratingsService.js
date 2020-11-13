const ratings = [
    {
      id: 0,
      b_id: 0,
      rating: 7,
    },
    {
      id: 1,
      b_id: 1,
      rating: 6,
    },
    {
      id: 2,
      b_id: 2,
      rating: 8,
    },
  ];

  ratingsService = {};

  ratingsService.read = () => {
    return ratings;
  };

  module.exports = ratingsService;