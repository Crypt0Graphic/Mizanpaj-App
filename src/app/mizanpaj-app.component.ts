import { Component, OnInit } from '@angular/core';
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
export class MizanpajAppAppComponent implements OnInit {

  title = 'mizanpaj-app!';

  constructor() { }

  ngOnInit() {
    var canvas = new fabric.Canvas('c');
    var src = "../../images/kupurSecond.jpg";

    fabric.Image.fromURL("../../images/kupurSecond.jpg", function (oImg) {
      oImg.left = 10;
      oImg.top = 10;
      canvas.add(oImg);
      canvas.renderAll();
    }, { hasControls: false, selectable: false, evented: false });
  }
}
