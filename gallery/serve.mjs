#!/usr/bin/env node
import { createServer } from "node:http";
import { existsSync, readFileSync, realpathSync, statSync } from "node:fs";
import { dirname, isAbsolute, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const own = fileURLToPath(import.meta.url);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
};
export async function startGalleryServer({ root, port = 4190 } = {}) {
  const base = realpathSync(resolve(root));
  if (!statSync(base).isDirectory() || !existsSync(resolve(base, "index.html")))
    throw Error("GALLERY_DIRECTORY_REQUIRED");
  const server = createServer((request, response) => {
    if (!["GET", "HEAD"].includes(request.method)) {
      response.writeHead(405).end();
      return;
    }
    try {
      const pathname = decodeURIComponent(
        new URL(request.url, "http://localhost").pathname,
      );
      const path = realpathSync(
        resolve(base, "." + (pathname === "/" ? "/index.html" : pathname)),
      );
      const local = relative(base, path);
      if (
        local === ".." ||
        local.startsWith("../") ||
        isAbsolute(local) ||
        !statSync(path).isFile()
      )
        throw Error("OUTSIDE_GALLERY");
      const data = readFileSync(path);
      const extension = "." + path.split(".").at(-1);
      response.writeHead(200, {
        "Content-Type": mime[extension] ?? "application/octet-stream",
        "Content-Length": data.length,
        "Cache-Control": "no-store",
      });
      response.end(request.method === "HEAD" ? undefined : data);
    } catch {
      response.writeHead(404).end("Not found");
    }
  });
  await new Promise((yes, no) => {
    server.once("error", no);
    server.listen(port, "127.0.0.1", yes);
  });
  return server;
}
if (
  process.argv[1] &&
  existsSync(process.argv[1]) &&
  realpathSync(resolve(process.argv[1])) === realpathSync(own)
) {
  try {
    const args = process.argv.slice(2);
    if (args.length === 1 && args[0] === "--help")
      console.log(
        "Usage: node scripts/serve_gallery.mjs [--root <gallery-directory>] [--port <port>]\nServes generated static files on 127.0.0.1 only. Requires Node; no installation or compilation.",
      );
    else {
      const packaged = resolve(dirname(own), "../assets/gallery");
      let root = existsSync(packaged)
        ? packaged
        : resolve(dirname(own), "../shared/gallery");
      let port = 4190;
      for (let i = 0; i < args.length; i++) {
        if (args[i] === "--root" && args[i + 1]) root = args[++i];
        else if (args[i] === "--port" && args[i + 1]) port = Number(args[++i]);
        else throw Error("GALLERY_OPTION_INVALID");
      }
      if (!Number.isInteger(port) || port < 0 || port > 65535)
        throw Error("GALLERY_PORT_INVALID");
      const server = await startGalleryServer({ root, port });
      console.log("Gallery: http://127.0.0.1:" + server.address().port + "/");
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
