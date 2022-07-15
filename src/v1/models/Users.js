'use strict';
module.exports = mongoose => {
  const newSchema = new mongoose.Schema({
    FirstName: {
      type: String
    },
    LastName: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    ProfilePic: {
      type: String
    },
    StatusId: {
      type: String
    },
    roleId: {
      type: String
    },
    IsPasswordResetRequested: {
      type: String
    },
    PasswordResetToken: {
      type: String
    },
    IsEmailVerificationRequested: {
      type: String
    },
    IsEmailVerified: {
      type: String
    },
    EmailVerificationToken: {
      type: String
    }
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  const Users = mongoose.model('Users', newSchema);
  return Users;
};