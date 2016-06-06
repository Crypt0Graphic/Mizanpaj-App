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

  public firstX: number;
  public firstY: number;
  public lastX: number;
  public lastY: number;

  constructor(mdIconRegistry: MdIconRegistry) {
    mdIconRegistry
      .registerFontClassAlias('fontawesome', 'fa');
  }

  ngOnInit() {

    let canvas = new fabric.Canvas('cLeft');
    let src = "../../images/kupurSecond.jpg";

    canvas.on('mouse:down', (event) => {
      var position = canvas.getPointer(event.e);
      this.firstX = position.x;
      this.firstY = position.y;
    });

    canvas.on('mouse:up', (event) => {
      var position = canvas.getPointer(event.e);
      this.lastX = position.x;
      this.lastY = position.y;
      // ReLoading Image
      loadImage(src, canvas, this.firstX, this.firstY, this.lastX, this.lastY);
    });

    loadImage(src, canvas);

  }; // ngOnInıt Son

  public clip() {
    //return this.firstX;
    console.log(this.firstX);
  }

}

function loadImage(src: string, canvas: any, fX?: number, fY?: number, lX?: number, lY?: number) {
  canvas.clear();
  fabric.Image.fromURL(src, function (oImg) {
    oImg.left = 10;
    oImg.top = 10;
    canvas.add(oImg);

    if (fX != undefined) {
      let x: number, y: number;

      if (fX < lX) {
        x = fX;
      }
      else {
        x = lX;
      }

      if (fY < lY) {
        y = fY;
      }
      else {
        y = lY;
      }
      var rect = new fabric.Rect({ left: x, top: y, width: Math.abs(lX - fX), height: Math.abs(lY - fY), strokeDashArray: [3, 3], stroke: 'red', strokeWidth: 1, fill: 'rgba(0,0,0,0)' });
      canvas.add(rect);
      console.log("->> Image Reloaded & Rect Drawwed: " + x + ' ' + y + ' ' + Math.abs(lX - fX) + ' ' + Math.abs(lY - fY));
    }
    else {
      console.log("->> Image Loaded");
    }
    canvas.renderAll();
    canvas.setHeight(oImg.getHeight() + 20);
    canvas.setWidth(oImg.getWidth() + 20);
  }, { hasControls: false, selectable: false, evented: false, strokeDashArray: [2, 2], opacity: 1 });
}




