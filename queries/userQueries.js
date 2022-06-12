const mongoose = require('mongoose')
const User = require('../models/User')

exports.getUserBookLists = (userId) => {
    return (
        User.aggregate(
            [
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(userId)
                    }
                },
                {
                    $lookup: {
                        from: 'books',
                        localField: 'books.book',
                        foreignField: '_id',
                        as: 'book'
                    }
                },
                {
                    $unwind: {
                        path: '$books'
                    }
                },
                {
                    $group: {
                        _id: '$books.status',
                        books: { $push: '$books' }
                    }
                }
            ]
        )
    )
}