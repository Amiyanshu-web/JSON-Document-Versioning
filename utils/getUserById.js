const User = require('../models/user');

const getUserById = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    // Return selected fields
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
    };
};

module.exports = getUserById;
