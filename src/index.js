import { z } from "zod";

import app from "./app.js";

const port = z.coerce.number().int().min(1).max(65535).parse(process.env.PORT ?? 3001);

app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});
