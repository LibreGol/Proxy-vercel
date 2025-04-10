import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send("Falta el parámetro ?url=");
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/113.0.0.0 Safari/537.36",
        "Referer": targetUrl
      }
    });

    let body = await response.text();

    // Quitar cabeceras de bloqueo en iframe (si existieran en el contenido)
    res.setHeader("Content-Type", "text/html");
    res.removeHeader?.("X-Frame-Options");
    res.removeHeader?.("Content-Security-Policy");

    // También se pueden limpiar etiquetas meta CSP si querés (opcional)
    body = body.replace(/<meta[^>]+content-security-policy[^>]+>/gi, "");

    res.status(200).send(body);
  } catch (err) {
    res.status(500).send("Error al cargar el recurso: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log("Proxy activo en el puerto " + PORT);
});
