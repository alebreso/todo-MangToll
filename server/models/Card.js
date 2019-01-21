const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    position: {
      type: Number,
      required: true
    }
    // position: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'column',
    //   required: true
    // }
  },
  { timestamps: true }
)

module.exports = Card = mongoose.model('card',CardSchema)