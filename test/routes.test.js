import assert from "node:assert/strict";
import { after, before, test } from "node:test";

import app from "../src/app.js";

let server;
let baseUrl;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (server) await new Promise((resolve) => server.close(resolve));
});

for (const path of [
  "/",
  "/about",
  "/servicios",
  "/disenoyartes",
  "/disenoydev",
  "/tienda",
  "/contacto",
  "/eventos",
  "/ecosistema",
  "/experiencia",
]) {
  test(`${path} renders an HTML page`, async () => {
    const response = await fetch(`${baseUrl}${path}`);
    const body = await response.text();

    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type"), /text\/html/);
    assert.match(body, /<title>[^<]*Yehiibhii Estudio[^<]*<\/title>/);
  });
}

test("static assets remain available", async () => {
  for (const asset of ["/css/main.css", "/css/tailwind.css", "/css/site-v3.css", "/js/site-v3.js"]) {
    const response = await fetch(`${baseUrl}${asset}`);
    assert.equal(response.status, 200, asset);
  }
});

test("new home links to the original visual experience and diagnostic", async () => {
  const body = await (await fetch(baseUrl)).text();
  assert.match(body, /href="\/experiencia"/);
  assert.match(body, /https:\/\/ybestudio\.com\//);
  assert.match(body, /href="\/ecosistema"/);
});
