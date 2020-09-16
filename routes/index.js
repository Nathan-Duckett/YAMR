var express = require('express');
var router = express.Router();

let status = [];
let nextId = 1;

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send(status);
});

/**
 * Update an entries status to on with the last registered time set to now.
 * 
 * This will ensure the tracking is up to date to know when it last sent a ping.
 */
router.post('/update/:id', (req, res) => {
  for (let i = 0; i < status.length; i++) {
    if (status[i].id == req.params.id) {
      status[i].status = 'on';
      status[i].lastTime = new Date();
      res.sendStatus(200);
      return;
    }
  }
  res.sendStatus(404);
});

/**
 * Register a new device into the device's list. This only persists as long as the
 * server is running. This registers it with a provided friendly name.
 */
router.post('/register', (req, res) => {
  let details = {
    "id": nextId++,
    "friendlyName": req.body.name,
    "status": "on",
    "lastTime": new Date()
  }
  status.push(details);
  res.status(201).send(details);
});

module.exports = router;