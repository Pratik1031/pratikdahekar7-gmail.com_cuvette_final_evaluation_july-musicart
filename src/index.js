const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const connectDB = require("./db/db.connection");

connectDB()
  .then(() => {
    app.listen(8080, () => {
      console.log(
        `Music Art App Runing Sucessfully on https://localhost:${process.env.PORT} ⚙️  👌`
      );
    });
  })
  .catch((error) => {
    console.error(error);
  });
