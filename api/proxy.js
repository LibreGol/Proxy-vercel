export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    res.status(400).send("Falta el parámetro ?url=");
    return;
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": url
      }
    });

    const contentType = response.headers.get("content-type") || "text/html";
    let body = await response.text();

    // Elimina posibles bloqueos para iframe
    res.setHeader("Content-Type", contentType);
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Opcional: remover meta CSP desde el HTML si lo trae
    body = body.replace(/<meta[^>]+content-security-policy[^>]+>/gi, "");

    res.status(200).send(body);
  } catch (err) {
    res.status(500).send("Error al acceder a la URL: " + err.message);
  }
}
