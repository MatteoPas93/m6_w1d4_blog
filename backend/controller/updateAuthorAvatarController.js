const userModel = require('../models/authors'); 

exports.patchAuthorAvatar = async (request, response) => {
    const { id } = request.params;
    const { avatar } = request.body;

    try {
        const user = await userModel.findById(id);

        if (!user) {
            return response.status(404).json({ message: 'Author not found!' });
        }

        user.avatar = avatar;
        await user.save();

        response.json({ message: 'Avatar updated successfully', user });
    } catch (error) {
        console.error('Error updating avatar', error);
        response.status(500).json({ message: 'Internal Server Error' });
    }
};

