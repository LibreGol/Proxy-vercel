export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send("Falta ?url=");
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const contentType = response.headers.get("content-type");
    const body = await response.text();

    res.setHeader("Content-Type", contentType);
    res.status(200).send(body);
  } catch (err) {
    res.status(500).send("Error al acceder al enlace: " + err.message);
  }
}
