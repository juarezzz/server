const mongoose = require('mongoose')
const Book = require('../models/Book')

exports.findBookById = (id) => (
    Book.aggregate(
        [
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $addFields: {
                    numb_of_reviews: { $size: "$reviews" },
                    avg_rating: { $round: [{ $avg: '$reviews.score' }, 2] },
                    num_of_comments: { $size: '$reviews.comment' }
                }
            }
        ]
    )
)

exports.findBooksByTitle = (title) => (
    Book.aggregate(
        [
            {
                $match: {
                    title: { $regex: new RegExp(title), $options: 'i' }
                }
            },
            {
                $addFields: {
                    num_of_reviews: { $size: "$reviews" },
                    avg_rating: { $round: [{ $avg: '$reviews.score' }, 2] }
                }
            },
            {
                $project: {
                    reviews: 0
                }
            }
        ]
    )
)