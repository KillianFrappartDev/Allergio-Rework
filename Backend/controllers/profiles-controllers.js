// Local imports
const Profile = require('../models/profile');
const User = require('../models/user');

const getProfileById = async (req, res, next) => {
  const profileId = req.params.pid;

  let profile;
  try {
    profile = await Profile.findById(profileId);
  } catch (error) {
    return next(new Error('[GET][PROFILES] Could not find profile.'));
  }

  console.log('[GET][PROFILES] Profile found!');
  res.json({ message: profile });
};

const createProfile = async (req, res, next) => {
  const { name, allergens, owner, image } = req.body;

  let user;
  try {
    user = await User.findById(owner);
  } catch (error) {
    return next(new Error('[POST][PROFILE] Could not find user.'));
  }

  let userWithProfiles;
  try {
    userWithProfiles = await User.findById(owner).populate('profiles');
  } catch (error) {
    return next(new Error('[POST][PROFILE] Could not find user with profiles.'));
  }

  const newProfile = new Profile({ name, owner: user, readers: [], allergens, image });

  try {
    await newProfile.save();
  } catch (error) {
    return next(new Error('[POST][PROFILE] Could not create profile.'));
  }

  try {
    userWithProfiles.profiles.push(newProfile);
    await userWithProfiles.save();
  } catch (error) {
    return next(new Error('[POST][PROFILE] Could not add profile to user.'));
  }

  console.log('[POST][PROFILE] Profile create!');
  res.json({ message: 'New profile created!' });
};

const editProfile = async (req, res, next) => {
  const { name } = req.body;
  const profileId = req.params.pid;

  let profile;
  try {
    profile = await Profile.findById(profileId);
  } catch (error) {
    return next(new Error('[PUT][PROFILES] Could not find profile.'));
  }

  profile.name = name;

  try {
    profile.save();
  } catch (error) {
    return next(new Error('[PUT][PROFILES] Could not update profile.'));
  }

  console.log('[PUT][PROFILES] Profile updated!');
  res.json({ message: profile });
};

const getProfilesByUser = async (req, res, next) => {
  // Extract user ID
  const userId = req.params.uid;

  // Get user with profiles
  let userWithProfiles;
  try {
    userWithProfiles = await User.findById(userId).populate('profiles');
  } catch (error) {
    return next(new Error('[GET][PROFILES] Could not get user with profiles.'));
  }

  // Get user with profiles
  let userWithShared;
  try {
    userWithShared = await User.findById(userId).populate('sharedProfiles');
  } catch (error) {
    return next(new Error('[GET][PROFILES] Could not get user with shared.'));
  }

  // Populate allergens for each profile
  const responseProfiles = [];
  for (const profile of userWithProfiles.profiles) {
    let profileWithAllergens;
    try {
      profileWithAllergens = await Profile.findById(profile._id).populate('allergens');
    } catch (error) {
      return next(new Error('[GET][PROFILES] Could not get profile with allergens.'));
    }
    responseProfiles.push(profileWithAllergens);
  }

  // Populate allergens for each profile
  const responseShared = [];
  for (const profile of userWithShared.sharedProfiles) {
    let profileWithAllergens;
    try {
      profileWithAllergens = await Profile.findById(profile._id).populate('allergens');
    } catch (error) {
      return next(new Error('[GET][PROFILES] Could not get profile with allergens.'));
    }
    responseShared.push(profileWithAllergens);
  }

  // Send profiles with allergens name
  console.log('[GET][PROFILES] Profiles fetched');
  res.json({ profiles: responseProfiles, shared: responseShared, message: 'Profiles fetched' });
};

exports.getProfileById = getProfileById;
exports.createProfile = createProfile;
exports.editProfile = editProfile;
exports.getProfilesByUser = getProfilesByUser;
