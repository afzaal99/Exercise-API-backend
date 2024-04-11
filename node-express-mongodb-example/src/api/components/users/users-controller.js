const usersService = require('./users-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

/**
 * Handle get list of users request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getUsers(request, response, next) {
  try {
    const users = await usersService.getUsers();
    return response.status(200).json(users);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle get user detail request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getUser(request, response, next) {
  try {
    const user = await usersService.getUser(request.params.id);

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown user');
    }

    return response.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle create user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createUser(request, response, next) {
  try {
    const name = request.body.name;
    const email = request.body.email;
    const password = request.body.password;
    const passwordConfirm = request.body.password_confirm;

    // Check if password and password confirm match
    if (password !== passwordConfirm) {
      throw errorResponder(
        errorTypes.INVALID_PASSWORD,
        'Password and password confirmation do not match'
      );
    }

    // Check if email is already taken
    const emailTaken = await usersService.checkIfEmailTaken(email);
    if (emailTaken) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'This email already taken, try using another'
      );
    }

    const success = await usersService.createUser(name, email, password);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create user'
      );
    }

    return response.status(200).json({ name, email });
  } catch (error) {
    // Handle other errors
    return next(error);
  }
}

/**
 * Handle update user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function updateUser(request, response, next) {
  try {
    const id = request.params.id;
    const name = request.body.name;
    const email = request.body.email;

    // Check if email is already taken
    const emailTaken = await usersService.checkIfEmailTaken(email);
    if (emailTaken) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'This email already taken, try using another'
      );
    }

    const success = await usersService.updateUser(id, name, email);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update user'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle delete user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function deleteUser(request, response, next) {
  try {
    const id = request.params.id;

    const success = await usersService.deleteUser(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete user'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle change password request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function changePassword(request, response, next) {
  try {
    const Id = request.params.id;
    const currentPassword = request.body.currentPassword;
    const newPassword = request.body.newPassword;
    const confirmPassword = request.body.confirmPassword;

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      throw errorResponder(
        errorTypes.INVALID_PASSWORD,
        'New password and confirm password do not match'
      );
    }

    // Check if current password is correct
    const user = await usersService.getUser(Id);
    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown user');
    }

    // Check if current password matches the user's current password
    const isPasswordCorrect = await usersService.isValidPassword(Id, currentPassword);
    if (!isPasswordCorrect) {
      throw errorResponder(
        errorTypes.INVALID_PASSWORD,
        'Current password is incorrect'
      );
    }

    // Change password
    const success = await usersService.changePassword(Id, newPassword);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to change password'
      );
    }

    return response.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    return next(error);
  }
}


module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  changePassword,
};
