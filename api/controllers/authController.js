const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const secret = 'asdfe45we45w345wegw345werjktjwertkj';
//register admin user and password
exports.register = async (req, res) => {
  const { username, password, isAdmin } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, 10),
      isAdmin: isAdmin || false,
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });

  if (!userDoc) {
    return res.status(400).json({ error: 'IncorrectUsername' });
  }

  const passOk = bcrypt.compareSync(password, userDoc.password);

  if (passOk) {
    jwt.sign({ username, id: userDoc._id, isAdmin: userDoc.isAdmin }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token).json({
        id: userDoc._id,
        username,
        isAdmin: userDoc.isAdmin,
      });
    });
  } else {
    res.status(400).json({ error: 'IncorrectPassword' });
  }
};

exports.logout = (req, res) => {
  res.cookie('token', '').json('ok');
};
