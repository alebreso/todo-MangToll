const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ColumnSchema = new Schema(
  {
    name: {
      type: String,
      required:true
    },
    position: {
      type: Number,
      required: true
    },
    // cards: {
    //   c: [
    //     {          
    //       type: Schema.Types.ObjectId,
    //       ref: 'card'
    //     }
    //   ]
    // }
  },
)

module.exports = Card = mongoose.model('column',ColumnSchema)