const moment = require("moment")
function formatmessages(username, text) {
  return {
    text,
    username,
    time: moment().format("h:mm a")
  }
}

module.exports = { formatmessages }
