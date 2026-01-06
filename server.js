const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.get("/", (req, res) => {
  res.send("Proxy IPTV ativo. Use /playlist");
});

app.get("/playlist", async (req, res) => {
  const IPTV_URL = "http://c.zztech.top/get.php?username=709818988&password=308053394&type=m3u_plus&output=hls";

  try {
    const response = await fetch(IPTV_URL);
    const data = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/x-mpegURL");

    res.send(data);
  } catch (err) {
    res.status(500).send("Erro ao buscar playlist IPTV");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor IPTV Proxy rodando");
});
