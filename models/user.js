const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');
const tr=require('transliter')


const schema = new Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

schema.plugin(
  URLSlugs('title', {
    field: 'url',
    generator: text => tr.slugify(text)
  })
);

schema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('User', schema);