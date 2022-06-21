const { DB } = require("../utils/constants.util");

module.exports = 
{
  "development": {
    "database": {
      "url": `mongodb://${DB.HOST}:${DB.PORT}/${DB.DATABASE}`, 
      "options": {
        "useNewUrlParser": true
      }
    }
  },
  "test": {
    "database": {
      "url": `mongodb://${DB.HOST}:${DB.PORT}/${DB.DATABASE}`, 
      "options": {
        "useNewUrlParser": true
      }
    }
  },
  "production": {
    "database": {
      "url": `mongodb://${DB.HOST}:${DB.PORT}/${DB.DATABASE}`, 
      "options": {
        "useNewUrlParser": true
      }
    }
  }
}
