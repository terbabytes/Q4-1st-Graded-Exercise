// Loads the express module
const express = require("express");
const hbs = require("hbs");

const bodyParser = require("body-parser");

const path = require("path");

//Creates our express server
const app = express();
const port = 3000;

//Serves static files (we need it to import a css file)
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));

hbs.registerHelper("json", function (context) {
  return JSON.stringify(context);
});

app.get("/happy", (req, res) => {
  res.render("happy", {formData: req.body}); // Render happy.hbs
});

app.post("/happy", (req, res) => {
  const { name, gender, number } = req.body;
  const guests = [];
  const singers = [];

  for (let i = 0; i < number; i++) {
    const guestName = req.body[`name${i + 1}`] || "";
    const isGoing = req.body[`checkbox${i + 1}`] ? true : false;
    guests.push({ guestName, isGoing });
    if (isGoing) singers.push(guestName);
  }

const attendingGuests = guests.filter(guest => guest.isGoing);

    const pronoun = gender === "male" ? "he's" : gender === "female" ? "she's" : "they're";
    const songLine = `For,${pronoun},a,jolly,good,fellow.,For,${pronoun},a,jolly,good,fellow.,For,${pronoun},a,jolly,good,fellow,,which,nobody,can,deny!`;
    const songWords = [
      "Happy", "birthday", "to", "you.",
      "Happy", "birthday", "to", "you.",
      "Happy", "birthday", "dear", `${name}.`,
      "Happy", "birthday", "to", "you!",
      songLine,
    ];
    song = songWords.map((word, i) => ({
      singer: singers[i % singers.length] || "Someone",
      word,
    }));

  res.render("happy", { name, gender, number, guests, song, formData: req.body});
});


app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => console.log(`App listening on port ${port}`));
