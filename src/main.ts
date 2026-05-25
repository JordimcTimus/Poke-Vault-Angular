/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

export const environment = {
  production: false,
  recaptchaSiteKey: '6Ld7E_AsAAAAAEHkjZhDWvWrisxncKGRlkFdbcq5'
};
