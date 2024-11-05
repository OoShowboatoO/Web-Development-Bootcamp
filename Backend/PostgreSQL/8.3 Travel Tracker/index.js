import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisited() {
  const visited = await db.query("SELECT country_code FROM visited_countries;");
  let countries =[];
  visited.rows.forEach((country) => {
    countries.push(country.country_code);
  })
  return countries;
}


app.get("/", async (req, res) => {
  //Write your code here.
  const countries = await checkVisited()
  res.render("index.ejs", {countries: countries, total: countries.length});
});

app.post("/add", async (req, res) => {

  let input = req.body["country"];

  try {
    const result = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%'; ", [input.toLowerCase()]);
    const data = result.rows[0];
    const countryCode = data.country_code;

    try {
      await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [countryCode]);
      res.redirect("/");
    } catch (err) {
      console.log(err);
      const contries =  await checkVisited();
      res.render("index.ejs", {
        countries: contries,
        total: contries.length,
        error: "Country has already been added, please try again."
      })
    }

  } catch (err) {
    console.log(err);
      const contries =  await checkVisited();
      res.render("index.ejs", {
        countries: contries,
        total: contries.length,
        error: "Country name doesn't exist, please try again."
      })
  }

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
