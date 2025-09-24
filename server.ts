import 'zone.js/node';
import express from 'express'; // ← default import
import { join } from 'path';
import { existsSync } from 'fs';
import { renderApplication } from '@angular/platform-server';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './src/app/app.component';
import { config } from './src/app/app.config.server';
import { APP_BASE_HREF } from '@angular/common';

const distFolder = join(process.cwd(), 'dist/angular-headless-wp/browser'); // Replace <project-name>
const indexHtml = existsSync(join(distFolder, 'index.html')) ? 'index.html' : 'index.original.html';

export default async function (req: any, res: any) {
  const app = express();

  app.get('*.*', express.static(distFolder, { maxAge: '1y' }));

  app.get('*', async (req, res) => {
    try {
      const html = await renderApplication(() =>
        bootstrapApplication(AppComponent, config), {
          url: req.url,
          platformProviders: [
            { provide: APP_BASE_HREF, useValue: req.baseUrl }
          ],
          document: indexHtml
      });
      res.send(html);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

  return app(req, res);
}
