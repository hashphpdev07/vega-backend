'use strict';
module.exports = mongoose => {
  const newSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    jwtToken: {
      type: String
    },
    logoutAt: {
      type: Date
    },
    deleteAt: {
      type: Date
    }
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  const UserLogin = mongoose.model('UserLogin', newSchema);
  return UserLogin;
};