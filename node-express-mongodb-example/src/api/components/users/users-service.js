const usersRepository = require('./users-repository');
const { hashPassword } = require('../../../utils/password');
const bcrypt = require('bcrypt');

/**
 * Get list of users
 * @returns {Array}
 */
async function getUsers() {
  const users = await usersRepository.getUsers();

  const results = [];
  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];
    results.push({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  return results;
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Object}
 */
async function getUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {boolean}
 */

async function createUser(name, email, password) {
  // Check if email is already taken
  const emailTaken = await checkIfEmailTaken(email);
  if (emailTaken) {
    return false;
  }
  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    await usersRepository.createUser(name, email, hashedPassword);
  } catch (err) {
    return null;
  }
  return true;
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {boolean}
 */
async function updateUser(id, name, email) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.updateUser(id, name, email);
  } catch (err) {
    return null;
  }
  return true;
}

/**
 * Delete user
 * @param {string} id - User ID
 * @returns {boolean}
 */
async function deleteUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.deleteUser(id);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Check if email is already taken
 * @param {string} email - Email address
 * @returns {boolean} - True if email is taken, false otherwise
 */
async function checkIfEmailTaken(email) {
  const user = await usersRepository.getUserByEmail(email);
  return !!user;
}

/**
 * Change user password
 * @param {string} id - User ID
 * @param {string} newPassword - New password
 * @returns {promise<boolean>} - True if password changed successfully, false otherwise
 */
async function changePassword(id, newPassword) {
  try {
    // Hash the new password
    const hashedNewPassword = await hashPassword(newPassword);
    
    // Update the password in the database
    await usersRepository.updatePassword(id, hashedNewPassword);

    return true; // Password changed successfully
  } catch (error) {
    return false; // Error occurred
  }
}

/**
 * Check if the provided password matches the password stored in the database for the given user ID
 * @param {string} id - User ID
 * @param {string} current_password - Password to check
 * @param {string} hashedPassword - hashedPassword to check
 * @returns {Promise<boolean>} - True if password matches, false otherwise
 */
async function isValidPassword(id, current_password) {
  try {  

  const user = await usersRepository.getUser(id);
  if (!user) {
    return false; // User not found
  }
  
  const hashedPassword = user.password;
  
  // Compare the provided password (after hashing) with the stored hashed password
  const match = await bcrypt.compareSync(current_password, hashedPassword);
  return match;
  } catch (error) {
  console.error('Error comparing passwords with hash:', error);
  return false;
  }
}



module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  checkIfEmailTaken,
  changePassword,
  isValidPassword,
};
