const joi = require('joi');

module.exports = {
  createUser: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
      password: joi.string().min(6).max(32).required().label('Password'),
      password_confirm: joi.string().min(6).max(32).required().label('Password Confirm'),
    },
  },

  updateUser: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
    },
  },

  changePassword: {
    body: {
      currentPassword: joi.string().min(6).max(32).required().label('Current Password'),
      newPassword: joi.string().min(6).max(32).required().label('New Password'),
      confirmPassword: joi.string().valid(joi.ref('newPassword')).required().label('Confirm New Password'),
    },
  },
};
