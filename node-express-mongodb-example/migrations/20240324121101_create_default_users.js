// const logger = require('../src/core/logger')('api');
// const { User } = require('../src/models');
// const { hashPassword } = require('../src/utils/password');

// const name = 'Administrator';
// const email = 'admin@example.com';
// const password = '123456';

// logger.info('Creating default users');

// (async () => {
//   try {
//     const numUsers = await User.countDocuments({
//       name,
//       email,
//     });

//     if (numUsers > 0) {
//       throw new Error(`User ${email} already exists`);
//     }

//     const hashedPassword = await hashPassword(password);
//     await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });
//   } catch (e) {
//     logger.error(e);
//   } finally {
//     process.exit(0);
//   }
// })();

// const logger = require('../src/core/logger')('api');
// const { User } = require('../src/models');
// const { hashPassword } = require('../src/utils/password');

// const name = 'Afzaal';
// const email = 'afzaal@gmail.com';
// const password = '369369';

// logger.info('Creating default users');

// (async () => {
//   try {
//     const numUsers = await User.countDocuments({
//       name,
//       email,
//     });

//     if (numUsers > 0) {
//       throw new Error(`User ${email} already exists`);
//     }

//     const hashedPassword = await hashPassword(password);
//     await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });
//   } catch (e) {
//     logger.error(e);
//   } finally {
//     process.exit(0);
//   }
// })();

// const logger = require('../src/core/logger')('api');
// const { User } = require('../src/models');
// const { hashPassword } = require('../src/utils/password');

// const name = 'Adnan';
// const email = 'adnan@example.com';
// const password = '654321';

// logger.info('Creating default users');

// (async () => {
//   try {
//     const numUsers = await User.countDocuments({
//       name,
//       email,
//     });

//     if (numUsers > 0) {
//       throw new Error(`User ${email} already exists`);
//     }

//     const hashedPassword = await hashPassword(password);
//     await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });
//   } catch (e) {
//     logger.error(e);
//   } finally {
//     process.exit(0);
//   }
// })();

const logger = require('../src/core/logger')('api');
const { User } = require('../src/models');
const { hashPassword } = require('../src/utils/password');

const name = 'Afzaalghaiyyas';
const email = 'afzaal@gmail.com';
const password = '313131';

logger.info('Creating default users');

(async () => {
  try {
    const numUsers = await User.countDocuments({
      name,
      email,
    });

    if (numUsers > 0) {
      throw new Error(`User ${email} already exists`);
    }

    const hashedPassword = await hashPassword(password);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (e) {
    logger.error(e);
  } finally {
    process.exit(0);
  }
})();