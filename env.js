// const fs = require('fs');

// if (fs.existsSync('./public')) {
//   process.env.NODE_ENV = 'production';
//   process.env.databaseUri = 'mongodb://patel:patel@ds153752.mlab.com:53752/angular-2-app'; // Databse URI and database name
//   process.env.databaseName = 'production database: hostel'; // Database name
// } else {
    process.env.NODE_ENV = 'development';
    process.env.databaseUri = 'mongodb://localhost:27017/hostel'; // Databse URI and database name
    process.env.databaseName = 'development database: hostel'; // Database name
    process.env.MY_DIR_NAME = __dirname;
// }