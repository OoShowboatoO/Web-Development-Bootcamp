import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const isExist = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (isExist.rows.length > 0) {
      res.send("Email already exists. Please try again.");
    } else {
      const result = await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", 
                                    [email, password]);
      res.render("secrets.ejs");
    }    
  } catch (err) {
    console.log(err);
  }
  
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try{
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length == 0) {
      res.send("User does not exist.")
    } else {
      const user =  result.rows[0];
      const truePassword = user.password;

      if (truePassword === password) {
        res.render("secrets.ejs");
      } else {
        res.send("Incorrect Password");
      }
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
