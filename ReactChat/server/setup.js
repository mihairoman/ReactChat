'use strict'

const fs = require('fs')

fs.createReadStream('./server/config/.pusher-env')
  .pipe(fs.createWriteStream('.env'))
