import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { MizanpajAppAppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(MizanpajAppAppComponent,[
  HTTP_PROVIDERS
]
);
