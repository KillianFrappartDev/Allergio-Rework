// Local imports
const User = require('../models/user');
const Profile = require('../models/profile');

const getContacts = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    return next(new Error('[GET][CONTACTS] Could not find user by ID.'));
  }

  let userWithContacts;
  try {
    userWithContacts = await User.findById(userId).populate('contacts');
  } catch (error) {
    return next(new Error('[GET][CONTACTS] Could not find user contacts.'));
  }

  let contactResponse;
  if (userWithContacts) {
    contactResponse = userWithContacts.contacts.map(item => {
      return { name: item.name, lastName: item.lastName, id: item._id };
    });
  } else {
    contactResponse = [];
  }

  console.log('[GET][CONTACTS] Contacts fetched!');
  res.json({ message: 'Contacts fetched!', contactResponse, shared: user.sharedContacts });
};

const searchContacts = async (req, res, next) => {
  const { search } = req.body;

  let users;
  try {
    users = await User.find();
  } catch (error) {
    return next(new Error('[GET][CONTACTS] Could not find contacts.'));
  }

  const filteredUsers = users.filter(item => item.name.includes(search) || item.lastName.includes(search));

  let contactResponse;
  if (filteredUsers) {
    contactResponse = filteredUsers.map(item => {
      return { name: item.name, lastName: item.lastName, id: item._id, isContact: false };
    });
  } else {
    contactResponse = [];
  }

  console.log('[GET][CONTACTS] Filtered users fetched!');
  res.json({ message: 'Users found!', contactResponse });
};

const addContact = async (req, res, next) => {
  const { userId, contactId } = req.body;

  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    return next(new Error('[GET][CONTACTS] Could not find user by ID.'));
  }

  let contact;
  try {
    contact = await User.findById(contactId);
  } catch (error) {
    return next(new Error('[GET][CONTACTS] Could not find contact by ID.'));
  }

  // Add contact to user
  let userWithContacts;
  try {
    userWithContacts = await User.findById(userId).populate('contacts');
  } catch (error) {
    return next(new Error('[GET][CONTACTS] Could not find user contacts.'));
  }

  try {
    userWithContacts.contacts.push(contact);
    await userWithContacts.save();
  } catch (error) {
    return next(new Error('[GET][CONTACTS] Could not save new contacts.'));
  }

  // Add user to contact
  let contactWithContacts;
  try {
    contactWithContacts = await User.findById(contactId).populate('contacts');
  } catch (error) {
    return next(new Error('[GET][CONTACTS] Could not find contact contacts.'));
  }

  try {
    contactWithContacts.contacts.push(user);
    await contactWithContacts.save();
  } catch (error) {
    return next(new Error('[GET][CONTACTS] Could not save new contacts.'));
  }

  let contactResponse;
  if (userWithContacts) {
    contactResponse = userWithContacts.contacts.map(item => {
      return { name: item.name, lastName: item.lastName, id: item._id };
    });
  } else {
    contactResponse = [];
  }

  console.log('[POST][CONTACTS] Contact added!');
  res.json({ message: 'Contacts added!', contactResponse });
};

const deleteContact = async (req, res, next) => {
  const { userId, contactId } = req.body;

  console.log(userId, contactId);

  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    return next(new Error('[DELETE][CONTACTS] Could not find user.'));
  }

  // Remove contact from user
  let userWithContacts;
  try {
    userWithContacts = await User.findById(userId).populate('contacts');
  } catch (error) {
    return next(new Error('[DELETE][CONTACTS] Could not find user contacts.'));
  }

  try {
    userWithContacts.contacts = userWithContacts.contacts.filter(item => item._id != contactId);
    await userWithContacts.save();
  } catch (error) {
    return next(new Error('[DELETE][CONTACTS] Could not delete contacts.'));
  }

  // Remove user from contact
  let contactWithContacts;
  try {
    contactWithContacts = await User.findById(contactId).populate('contacts');
  } catch (error) {
    return next(new Error('[DELETE][CONTACTS] Could not find user contacts.'));
  }

  try {
    contactWithContacts.contacts = contactWithContacts.contacts.filter(item => item._id != userId);
    await contactWithContacts.save();
  } catch (error) {
    return next(new Error('[DELETE][CONTACTS] Could not delete contacts.'));
  }

  let contactResponse;
  if (userWithContacts) {
    contactResponse = userWithContacts.contacts.map(item => {
      return { name: item.name, lastName: item.lastName, id: item._id };
    });
  } else {
    contactResponse = [];
  }

  console.log('[DELETE][CONTACTS] Contact deleted!');
  res.json({ message: 'Contacts deleted!', contactResponse });
};

const shareProfiles = async (req, res, next) => {
  // Extract user ID and contact ID
  const { userId, contactId } = req.body;

  // Get user profiles
  let userWithProfiles;
  try {
    userWithProfiles = await User.findById(userId).populate('profiles');
  } catch (error) {
    return next(new Error('[POST][CONTACTS] Could not find user with profiles'));
  }

  // Push profiles to contact sharedProfiles
  let contactWithShared;
  try {
    contactWithShared = await User.findById(contactId).populate('sharedProfiles');
  } catch (error) {
    return next(new Error('[POST][CONTACTS] Could not find contact with profiles'));
  }

  for (const profile of userWithProfiles.profiles) {
    contactWithShared.sharedProfiles.push(profile);
  }

  try {
    await contactWithShared.save();
  } catch (error) {
    return next(new Error('[POST][CONTACTS] Could not save contact with shared'));
  }

  // Push contact ID to user profiles readers
  for (const profile of userWithProfiles.profiles) {
    let profileWithReader;
    try {
      profileWithReader = await Profile.findById(profile._id).populate('readers');
    } catch (error) {
      return next(new Error('[POST][CONTACTS] Could not find profile with readers'));
    }

    profileWithReader.readers.push(contactId);

    try {
      await profileWithReader.save();
    } catch (error) {
      return next(new Error('[POST][CONTACTS] Could not save profile with readers'));
    }
  }

  // Push contact id to User sharedContacts
  let userWithSharedContacts;
  try {
    userWithSharedContacts = await User.findById(userId).populate('sharedContacts');
  } catch (error) {
    return next(new Error('[POST][CONTACTS] Could not find user with sharedContacts'));
  }

  try {
    userWithSharedContacts.sharedContacts.push(contactId);
    await userWithSharedContacts.save();
  } catch (error) {
    return next(new Error('[POST][CONTACTS] Could not save user shared contacts'));
  }

  // Fetch user shared contacts id
  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    return next(new Error('[POST][CONTACTS] Could not find user'));
  }

  console.log('[POST][CONTACTS] Profiles shared with contact!');
  res.json({ message: 'Profiles shared!', shared: user.sharedContacts });
};

const unshareProfiles = async (req, res, next) => {
  // Extract user ID and contact ID OK
  const { userId, contactId } = req.body;

  // Get user with profiles OK
  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    return next(new Error('[DELETE][CONTACTS] Could not find user '));
  }

  // Get contact and remove sharedProfiles OK
  let contact;
  try {
    contact = await User.findById(contactId);
  } catch (error) {
    return next(new Error('[DELETE][CONTACTS] Could not find contact '));
  }

  contact.sharedProfiles = contact.sharedProfiles.filter(item => !user.profiles.includes(item));

  try {
    await contact.save();
  } catch (error) {
    return next(new Error('[DELETE][CONTACTS] Could not save contact '));
  }

  // Remove contactId from profiles readers OK
  let userWithProfiles;
  try {
    userWithProfiles = await User.findById(userId).populate('profiles');
  } catch (error) {
    return next(new Error('[DELETE][CONTACTS] Could not find user with profiles'));
  }

  for (const profile of userWithProfiles.profiles) {
    let profileWithReader;
    try {
      profileWithReader = await Profile.findById(profile._id).populate('readers');
    } catch (error) {
      return next(new Error('[DELETE][CONTACTS] Could not find profile with readers'));
    }

    profileWithReader.readers = profileWithReader.readers.filter(item => item._id != contactId);

    try {
      await profileWithReader.save();
    } catch (error) {
      return next(new Error('[DELETE][CONTACTS] Could not save profile with readers'));
    }
  }

  // Remove contact from sharedContact FAIL
  let userWithSharedContacts;
  try {
    userWithSharedContacts = await User.findById(userId).populate('sharedContacts');
  } catch (error) {
    return next(new Error('[DELETE][CONTACTS] Could not find user contacts.'));
  }
  userWithSharedContacts.sharedContacts = userWithSharedContacts.sharedContacts.filter(item => item._id != contactId);

  try {
    await userWithSharedContacts.save();
  } catch (error) {
    return next(new Error('[DELETE][CONTACTS] Could not save user '));
  }

  // Get user with profiles OK
  let updatedUser;
  try {
    updatedUser = await User.findById(userId);
  } catch (error) {
    return next(new Error('[DELETE][CONTACTS] Could not find user '));
  }

  console.log('[DELETE][CONTACTS] Profiles unshared with contact!');
  res.json({ message: 'Profiles unshared!', shared: updatedUser.sharedContacts });
};

exports.getContacts = getContacts;
exports.searchContacts = searchContacts;
exports.addContact = addContact;
exports.deleteContact = deleteContact;
exports.shareProfiles = shareProfiles;
exports.unshareProfiles = unshareProfiles;
