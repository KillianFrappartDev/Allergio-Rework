const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');

// Local imports
const usersRoute = require('./routes/users-route');
const profilesRoute = require('./routes/profiles-route');
const allergensRoute = require('./routes/allergens-route');
const contactsRoute = require('./routes/contacts-route');
const Allergen = require('./models/allergen');
const Profile = require('./models/profile');
const User = require('./models/user');

// Config
mongoose.set('useCreateIndex', true);
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Admin
AdminBro.registerAdapter(AdminBroMongoose);
const adminBro = new AdminBro({
  databases: [],
  rootPath: '/admin',
  resources: [Allergen, Profile, User]
});
const router = AdminBroExpress.buildRouter(adminBro);
app.use(adminBro.options.rootPath, router);

// Registered Routes
app.use('/api/users', usersRoute);
app.use('/api/profiles', profilesRoute);
app.use('/api/contacts', contactsRoute);
app.use('/api/allergens', allergensRoute);

// Error
app.use((error, req, res, next) => {
  console.log(error);
  res.json({ message: error.message || 'An unknow error occured' });
});

// DB & Start Server
mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT || 5000, () => console.log('Server up and running!'));
  })
  .catch(err => console.log(err));
