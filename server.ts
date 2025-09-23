import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

// Express app
export function app(): express.Express {
  const server = express();
 
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // 1️⃣ Serve only static files (CSS, JS, assets)
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y',
  }));

  // 2️⃣ All other routes handled by Angular SSR
  server.get('**', (req, res, next) => {
    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: req.originalUrl,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => {
        console.error('SSR rendering error:', err);
        next(err);
      });
  });

  return server;
}

// 3️⃣ Start server
function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Run only if this file is executed directly
if (process.env['NODE_ENV'] !== 'test') {
  run();
}
