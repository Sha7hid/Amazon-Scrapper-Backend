const nar = require('../models/User');

const getUserScheduleByGoogleId = async (req, res, next) => {
  try {
    const googleId = req.params.googleId; // Assuming the Google ID is passed as a URL parameter
    const user = await nar.findOne({ googleId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const schedule = user.schedule; // Assuming the schedule field is called "schedule" in the user document

    return res.status(200).json({ schedule });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserScheduleByGoogleId
};
