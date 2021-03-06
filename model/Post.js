var mongoose = require('mongoose');

var Post = new mongoose.Schema({ 
    title: {
        type: String
    },
    content: {
        type: String
    },
    image: {
        type: String
    },
    user: {
        type: String
    }
}, {
    collection: 'posts'
});

module.exports = mongoose.model('Post', Post);