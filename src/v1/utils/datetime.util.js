const moment = require('moment')

exports.currentDateTime24 = () => moment().format('YYYY-mm-dd HH:ii:ss')