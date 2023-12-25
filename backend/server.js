const app = require("./app");
const connection = require("./db/Database");


connection();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});