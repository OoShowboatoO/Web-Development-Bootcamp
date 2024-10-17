import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    // const d = new Date();
    const d = new Date("June 24, 2023 11:13:00");
    let day = d.getDay();

    let dayT = "a weekday";
    let adv = "it's time to work hard";

    if (day === 0 || day === 6) {
        dayT = "the weekend";
        adv = "chill bro";
    }
    res.render("index.ejs", {
        dayType: dayT,
        advice: adv,
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});