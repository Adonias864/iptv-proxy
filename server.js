const express = require("express");
const fetch = require("node-fetch");

const app = express();

// rota que entrega a lista IPTV
app.get("/playlist", async (req, res) => {

  // LINK IPTV ORIGINAL
  const IPTV_URL = "http://c.zztech.top/get.php?username=709818988&password=308053394&type=m3u_plus&output=hls";

  try {
    const response = await fetch(IPTV_URL);
    const data = await response.text();

    // libera acesso para qualquer site (CORS)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/x-mpegURL");

    res.send(data);

  } catch (err) {
    res.status(500).send("Erro ao buscar playlist IPTV");
  }
});

// porta usada pelo Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor IPTV Proxy rodando");
});
