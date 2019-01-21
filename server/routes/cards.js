const express = require("express");
const router = express.Router();
const Card = require("../models/Card");
const Column = require('../models/Column')

//GET to / => gets all cards
router.get("/", (req, res, next) => {
  Card.find()
    .then(cards => {
      res.json(cards);
    })
    .catch(err => console.log(err));
})

// GET to /:id => gets 1 card by id
router.get("/:id", (req, res) => {
  Card.findById(req.params.id)
  .then(card => {
    res.json(card);
  })
    .catch(err => res.status(404).json({success:false}))
})

//POST to / => creates 1 card
router.post("/", (req, res, next) => {
  const newCard = new Card({
    title: req.body.title,
    text: req.body.text,
    position: req.body.position,
  });
  newCard.save().then(card => res.json(card));
});

//DELETE to /:id => delete 1 card
router.delete("/:id", (req, res, next) => {
  Card.findById(req.params.id)
    .then(card => card.remove().then(() => res.json({success:true})))
    .catch(err => res.status(404).json({success:false}))
});

module.exports = router;
