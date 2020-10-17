const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res) => {
  res.status(200).json({ message: "React IronProfile REST API"});
});

module.exports = router;
