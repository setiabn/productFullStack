const expressSession = require("express-session");
const SessionSequelize = require("connect-session-sequelize")(
  expressSession.Store
);

//
const db = require("../app/db");
const config = require("../app/config");
//

const store = new SessionSequelize({ db, expiration: config.SESSION_TIME });

const session = expressSession({
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store,
  cookie: {
    httpOnly: true,
    maxAge: config.SESSION_TIME,
  },
});

module.exports = { store, session };
