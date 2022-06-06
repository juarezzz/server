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
                $lookup: {
                    from: "reviews",
                    localField: "reviews",
                    foreignField: "_id",
                    as: 'reviews'
                }
            },
            {
                $addFields: {
                    number_of_reviews: { $size: "$reviews" },
                    avg_rating: { $round: [{ $avg: '$reviews.score' }, 2] },
                    number_of_comments: { $size: '$reviews.comment' }
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
                $lookup: {
                    from: "reviews",
                    localField: "reviews",
                    foreignField: "_id",
                    as: 'reviews'
                }
            },
            {
                $addFields: {
                    number_of_reviews: { $size: "$reviews" },
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