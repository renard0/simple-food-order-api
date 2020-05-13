console.log(process.env.MYSQL_HOST);

module.exports = {
  "type": "mysql",
  "host": process.env.MYSQL_HOST,
  "port": 3306,
  "username": process.env.MYSQL_USER,
  "password": process.env.MYSQL_PASSWORD,
  "database": "food_order",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true,
  "logging": true
}