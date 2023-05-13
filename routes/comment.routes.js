const router = require("express").Router();
const Pet = require("../models/Pet.model");
const Comment = require("../models/Comment.model");

// create a comment and send it to the database
router.post('/all-pets/:petId/comment', (req, res, next) => {
  const { petId } = req.params;
  const { author, content } = req.body;
  Pet.findById(petId)
    .then(dbPet => {
      let newComment;
      newComment = new Comment({ author, content });
      console.log(newComment);
      newComment
        .save()
        .then(dbComment => {
          dbPet.comments.push(dbComment._id);
          dbPet
            .save()
            .then(() => res.redirect(`/all-pets/${petId}`))
        });
    });
});

module.exports = router;


