import { Component } from '@angular/core';
import {MdToolbar} from '@angular2-material/toolbar';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';

@Component({
  moduleId: module.id,
  selector: 'mizanpaj-app-app',
  templateUrl: 'mizanpaj-app.component.html',
  styleUrls: ['mizanpaj-app.component.css'],
  directives: [MdToolbar, MD_BUTTON_DIRECTIVES, MdIcon],
  providers: [MdIconRegistry]
})
export class MizanpajAppAppComponent {
  title = 'mizanpaj-app works!';
}
