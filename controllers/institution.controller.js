'use strict';
const mongoose = require('mongoose');
const Institution = mongoose.model('Institution');

module.exports = {

    getInstitution: function(emailDomain) {
        Institution.find({ email_domain: emailDomain }, (err, data) => {
            if (err) return console.error(err);
            return data ? true : false;
        })
    },
    getBooks: function(req, res, next) {
        Institution.find().exec()
            .then(books => {
                res.status(200).json({
                    count: books.length,
                    schools: books
                });
                next();
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: err });
                next();
            })
    },
    addBook: function(req, res, next) {
        new Institution({
            name: req.body.name,
            url: req.body.url,
            email_domain: req.body.email_domain,
        }).save()
            .then(result => {
                res.status(200).json({ message: 'New institution has been added', book: result });
                next();
            })
            .catch(err => {
                res.status(500).json({ error: err });
                next();
            });
    },
    changeBook: function(req, res, next) {
        Institution.findOneAndUpdate({ _id: req.params.bookId }, req.body )
            .then(result => {
                res.status(200).json({ message: 'Institution has been updated', book: result })
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: err });
            })
    },
    removeBook: function(req, res, next) {
        Institution.findByIdAndRemove({_id: req.params.bookId }).exec()
            .then(result => {
                res.status(200).json({ message: 'Institution has been deleted' })
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: err });
            })
    },
    getBook: function(req, res, next) {
        Institution.findById({ _id: req.params.bookId }).exec()
            .then(book => {
                if (book) return res.status(200).json({ message: 'Here are the institution details', school: book });
                res.status(409).json({ message: 'Institution not available' });
                next();
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: err });
            })
    }
}