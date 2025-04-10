export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).send("Falta el parámetro ?url=");

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const body = await response.text();

    // Eliminar cabeceras que bloquean iframe
    res.removeHeader("X-Frame-Options");
    res.removeHeader("Content-Security-Policy");

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(body);
  } catch (err) {
    res.status(500).send("Error al acceder al enlace: " + err.message);
  }
}
