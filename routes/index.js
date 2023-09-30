var express = require('express');
var router = express.Router();


const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {messages: messages});
});
router.post('/new', (req, res)=>{
  console.log()
  messages.push({
    text: req.body.message, 
    user: req.body.user, 
    added: new Date()
  });

  res.redirect('/')
})

module.exports = router;
