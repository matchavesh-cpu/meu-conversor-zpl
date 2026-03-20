const express = require("express");
const { fromZpl } = require("zpl-image");
const path = require("path");

const app = express();

app.use(express.text({ type: "*/*" }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/render", async (req, res) => {
  try {
    const png = await fromZpl(req.body, {
      density: 8,
      width: 800,
      height: 1200
    });

    res.set("Content-Type", "image/png");
    res.send(png);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao renderizar ZPL");
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
