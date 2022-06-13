const express = require('express');
const postdata = require("./signup.routes");
const postData = require("./signin.routes");
const careersData = require("./careers.routes")
const contactusdata = require('./contactus.routes')
const clientlistingdata  = require("./clientslisting.routes")
const router = express.Router();
router.get('/', (req, res) => {
  res.send('TODO API Version 1');
});

router.use('/todo', require('./todo.routes'));
router.use("/signup",postdata)

router.use("/signin", postData);
router.use("/profile",require('./profile.routes'))
router.use("/service",require('./servicemanagment.routes'))
router.use("/pages",require('./pages.routes.js'))
router.use("/career",careersData)
router.use("/contactus",contactusdata)
router.use("/clientlisting",clientlistingdata)
router.use("/ourteam",require('./ourteam.routes'))


router.use((err, req, res) => {
  if (err)
    res.status(500).json({
      status: false,
      error: 'Something went wrong',
    });
});
module.exports = router;
