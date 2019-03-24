const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../../models/Users.js');

/*
 * @route : GET /api/admin/get_user_details
 * @access : Private
 * @description: get_user_details
 */

router.get('/get_user_details', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { role } = req.user;
  if (role == 'admin') {
    User.find({}).then(function(users) {
      res.json(users);
    });
  } else {
    res.status(401).json({ error: 'Require Admin previlages' });
  }
});

/*
 * @route : Delete /api/admin/delete_user/:id
 * @access : Private
 * @description: Deleting User
 */

router.delete('/delete_user/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  if (role == 'admin') {
    User.findByIdAndRemove(id, (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'User Not Found with Id specefied' });
      }
      return res.json({ message: 'Successfully removed User' });
    });
  } else {
    return res.status(401).json({ error: 'Require Admin previlages' });
  }
});

/*
 * @route : UPDATE /api/admin/updateuser
 * @access : Private
 * @description: get_user_details
 */

router.post('/update_user/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  const update = req.body;
  if (role == 'admin') {
    if (update.hasOwnProperty('password')) {
      return res.status(400).json({ error: 'Only rightfull are allowed to update their Password' });
    }
    User.update({ _id: id }, update, { upsert: true, new: true }, (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'User Not Found with Id specefied' });
      }
      return res.json({ message: 'Successfully Updated User', updated: { ...user } });
    });
  } else {
    return res.status(401).json({ error: 'Require Admin previlages' });
  }
});
module.exports = router;
