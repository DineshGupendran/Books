const Book = require("../models/book.model")

module.exports = {

    createBook: (req, res) => {
        console.log(req.body, 'check');
        Book.findOne({ isbn: req.body.isbn })
            .then(data => {
                if (data) {
                    console.log("isbn exists");
                    res.json({ stat: false, msg: "isbn exists" });
                } else {
                    const prod = new Book(req.body);
                    prod.save(prod)
                        .then((data) => {
                            res.json({ stat: true, book: data })
                        })
                        .catch((err) => {
                            res.json({ stat: false, msg: err })
                        })
                }
            })
            .catch((err) => {
                res.json({ stat: false, msg: err })
            })
    },

    getAllBooks: (req, res) => {
        console.log('getAllBooks');
        Book.find()
            .then((data) => {
                res.json({ stat: true, books: data })
            })
            .catch((err) => {
                res.json({ stat: false, msg: err })
            })
    },

    removeBook: (req, res) => {
        console.log('removeBook', req.params.isbn);
        Book.deleteOne({ isbn: req.params.isbn })
            .then((res) => {
                res.json({ stat: true, msg: 'Successfully deleted' })
            })
            .catch((err) => {
                res.json({ stat: false, msg: err })
            })
    },

    update: (req, res) => {
        console.log(req.body);
        if (!req.body) {
            return res.status(400).send({
                message: "Data to update can not be empty!"
            });
        }
        const isbn = req.params.isbn;

        Book.findOneAndUpdate({ isbn: isbn }, req.body, { useFindAndModify: false })
            .then(data => {
                console.log('data', data);
                if (!data) {
                    res.status(404).send({
                        message: `Cannot update Book with isbn=${isbn}. Maybe Book was not found!`
                    });
                } else res.send({ message: "Book was updated successfully." });
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Book with isbn=" + isbn
                });
            });
    },
}