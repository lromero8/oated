const router = require('express').Router();
const Post = require('../model/Post');
const upload = require('../file-upload');
const verify = require('./verifyToken');



const singleUpload = upload.single('image');

router.get('/', async (req, res) => {
    // res.send(req.user);
    
    try {
        var result = await Post.find().exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post('/', verify, (req, res) => {
  
    singleUpload(req, res, async function(err) {
        if (err) {
            return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}] });
        }
        // return res.json({ 'imageUrl': req.file.location })

        // Create a new post
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            image: req.file.location,
            user: req.user
        })

        // console.log(post);
    
        try {
            const savedPost = await post.save();
            res.send({ postId: post._id });
        } catch (err) {
            res.status(400).send(err);
        }

    })


})

router.put('/:id', verify, (req, res) => {

    if (req.body) {

        singleUpload(req, res, function(err) {
            if (err) {
                return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}] });
            }

            req.body.image = req.file.location;

            // console.log(req.body);
        
            Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
              .then((post) => res.status(200).json({ success: true, postId: post._id }))
              .catch((err) => res.status(400).json({ success: false, error: err }));
        })
        
    }

})

router.delete('/:id', verify, async (req, res) =>  {
    try {
        var result = await Post.deleteOne({ _id: req.params.id }).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
})

/* ENDPOINTS

LIST ALL POSTS
GET /api/posts/

CREATE POST
POST /api/posts/

UPDATE POST
UPDATE /api/posts/:id

DELETE POST
DELETE /api/posts/:id

READ POST
/api/posts/:id

SEE POSTS BY USER
/api/user/:id

*/

module.exports = router;