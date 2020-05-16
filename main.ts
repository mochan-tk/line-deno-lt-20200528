import { App } from "https://raw.githubusercontent.com/aaronwlee/Attain/master/mod.ts";
import logger from "https://raw.githubusercontent.com/aaronwlee/Attain/master/plugins/logger.ts";
import parser from "https://raw.githubusercontent.com/aaronwlee/Attain/master/plugins/json-parser.ts";
import ky from 'https://deno.land/x/ky/index.js'
const app = new App();
// logging response method status path time
app.use(logger);
// parsing the request body and save it to request.params
app.use(parser);
app.use("/", (req, res) => {
  res.status(200).send("hello");
});
app.get("/hello", async (req, res) => {
  console.log("here '/hello'");
  res.status(200).send(`
  <!doctype html>
  <html lang="en">
    <body>
      <h1>Hello</h1>
    </body>
  </html>
  `);
});
app.post("/submit", (req, res) => {
  console.log(req.params);
  res.status(200).send({ data: "has received" });
});
app.use((req, res) => {
  res.status(404).send("page not found");
});
const PORT = Number(Deno.env.get('PORT')) || 8080;
app.listen({ port: PORT });
console.log(`Start listening on http://localhost:${PORT}`);