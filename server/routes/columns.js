const express = require("express");
const router = express.Router();
const Column = require('../models/Column')

//GET to / => gets all cols
router.get("/col", (req, res, next) => {
  Column.find()
    .then(col => {
      res.json(col);
    })
    .catch(err => console.log(err));
})

// GET to /col/:id => gets 1 col by id
router.get("/col/:id", (req, res) => {
  Column.findById(req.params.id)
  .then(card => {
    res.json(card);
  })
    .catch(err => res.status(404).json({success:false}))
})

//POST create a col into db
router.post("/add-col", (req, res, next) => {
  const newCol = new Column({
    name: req.body.name,
    position: req.body.position,
  });
  newCol.save().then(col => res.json(col));
});

module.exports = router;
