const { mongoose } = require("mongoose");


var bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        publicationYear: {
            type: Date,
            required: true
        },
        isbn: {
            type: Number,
            unique: true,
            required: true
        },
        // createdOn: {
        //     type: Date,
        //     default: Date.now()
        // },
        // createdBy: {
        //     type: String,
        //     // required: true
        // },
        // updatedOn: {
        //     type: Date,
        //     default: Date.now()
        // },
        // updatedBy: {
        //     type: String,
        //     // required: true
        // }
    },
    { timestamps: true }
);

bookSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});


module.exports = mongoose.model("book", bookSchema);