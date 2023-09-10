const User = require("./User");

/**
 * Convert User uuid to user id
 * @param {string} uuid
 * @returns {Promise<number|null>}
 */
const uuid2id = async (uuid) => {
  const user = await User.findOne({
    where: { uuid },
    attributes: ["id"],
    raw: true,
  });

  return user?.id;
};

module.exports = {
  uuid2id,
};
