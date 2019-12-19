const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
    {
      login: {
        type: String
      },
      massage: {
        type: String
      }
    },
    {
      timestamps: true
    }
  );
  
  
  schema.set('toJSON', {
    virtuals: true
  });
  
  module.exports = mongoose.model('Chat', schema);