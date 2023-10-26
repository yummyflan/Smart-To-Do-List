const express = require('express');
const router = express.Router();
const getCategory = require('../api');
const createItem = require('../db/queries/createItem');
const deleteItemByID = require('../db/queries/deleteItem');

router.get('/', (req, res) => {
  const userID = req.cookies.userID;
  const name = req.cookies.username;
  const templateVars = { userID: userID, username: name };
  return res.render('items', templateVars);
});

router.post('/', (req, res) => {
  const userID = req.cookies.userID
  const name = req.body.item;
  const deadline = req.body.date;
  console.log(req.body);
  getCategory(name)
  .then(categoryID => {
    createItem(userID, categoryID, name, deadline);
  })
  .then(() => res.redirect('/'));
})

router.post('/delete/', (req, res) => {
  const itemID = req.body.todoId;
  deleteItemByID(itemID);
  return res.redirect('/');
});
module.exports = router;
