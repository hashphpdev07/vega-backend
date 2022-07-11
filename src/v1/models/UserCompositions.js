'use strict';
module.exports = mongoose => {
  const newSchema = new mongoose.Schema({
    UserId:{
      type: mongoose.Schema.Types.ObjectId, ref: 'Users'
    },
    Metadata: {
      type: String
    }
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  const UserCompositions = mongoose.model('UserCompositions', newSchema);
  return UserCompositions;
};