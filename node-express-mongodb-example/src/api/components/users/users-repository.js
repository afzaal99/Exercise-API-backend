const { User } = require('../../../models');

/**
 * Get a list of users
 * @returns {Promise}
 */
async function getUsers() {
  return User.find({});
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * Check if a user with the given email already exists
 * @param {string} email - Email address
 * @returns {Promise<boolean>} - True if user exists, false otherwise
 */
async function checkIfEmailTaken(email) {
  const user = await User.findOne({ email });
  return !!user;
}

/**
 * Get user by email
 * @param {string} email - User email
 * @returns {Promise<Object|null>} - User object if found, null otherwise
 */
async function getUserByEmail(email) {
  return User.findOne({ email });
}

/**
 * Change user password
 * @param {string} id - User ID
 * @param {string} newPassword - New password
 * @returns {Promise<boolean>} - True if password changed successfully, false otherwise
 */
async function changePassword(id, newPassword) {
  try {
    // Hash new password
    const hashedNewPassword = await hashPassword(newPassword);
    
    // Update password in the database
    await usersRepository.updatePassword(id, hashedNewPassword);

    return true; // Password changed successfully
  } catch (error) {
    return false; // Error occurred
  }
}
/**
 * update user password
 * @param {string} id - User ID
 * @param {string} newPassword - New password
 * @returns {Promise<boolean>} - True if password changed successfully, false otherwise
 */
async function updatePassword(id, newPassword) {
  try {
    // Temukan pengguna berdasarkan ID
    const user = await User.findById(id);
    
    // Perbarui password pengguna dengan password yang baru
    user.password = newPassword;
    
    // Simpan perubahan
    await user.save();
    
    return true; // Password diperbarui dengan sukses
  } catch (error) {
    console.error('Error updating user password:', error);
    return false; // Terjadi kesalahan
  }
}


module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  checkIfEmailTaken,
  getUserByEmail,
  changePassword,
  updatePassword,
};
