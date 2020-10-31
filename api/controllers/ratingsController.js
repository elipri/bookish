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

const ratingsController = {};


ratingsController.read = (req,res)=>{
    res.status(200).json({
        success: true,
        ratings: ratings
    });
};

module.exports = ratingsController;