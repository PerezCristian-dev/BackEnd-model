// express custom helper to validate dates

// importing moment to handle dates since Express don't include a date validator.

const moment = require("moment");

const isDate = (value, { req, location, path }) => {
  if (!value) {
    return false;
  }

  const date = moment(value);

  if (date.isValid()) {
    return true;
  } else {
    return false;
  }
};

module.exports = { isDate };
