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

  title = "Ana Sayfa";

  public firstX: number;
  public firstY: number;
  public lastX: number;
  public lastY: number;
  public data: string;
  public srcLeft: string = "../../images/kupurSecond.jpg";

  constructor(mdIconRegistry: MdIconRegistry) {
    mdIconRegistry
      .registerFontClassAlias('fontawesome', 'fa');
  }

  ngOnInit() {

    var canvas = new fabric.Canvas('cLeft');
    let src = this.srcLeft;

    canvas.on('mouse:down', (event) => {
      var position = canvas.getPointer(event.e);
      this.firstX = position.x;
      this.firstY = position.y;
    });

    canvas.on('mouse:up', (event) => {
      var position = canvas.getPointer(event.e);
      this.lastX = position.x;
      this.lastY = position.y;
      // ReLoad Image
      loadImage(src, canvas, this.firstX, this.firstY, this.lastX, this.lastY);
    });

    loadImage(src, canvas);

  }; // End of ngOnInıt

  public clip() {
    var canvas = new fabric.Canvas('cLeft');
    let src = this.srcLeft;
    loadImage(src, canvas);

    // If there is enough width -> clipTo
    if (Math.abs(this.firstX - this.lastX) > 20 || Math.abs(this.firstY - this.lastY) > 20) {

      canvas.clipTo = (ctx) => {

        console.log("-->> clipTo: " + this.firstX + " " + this.firstY);

        var shp = new fabric.Rect({
          top: this.firstY,
          left: this.firstX,
          width: Math.abs(this.lastX - this.firstX),
          height: Math.abs(this.lastY - this.firstY),
          hasControls: false,
          selectable: false,
          evented: false,
          fill: '#f5f5f5'
          // fill: 'rgba(0,0,0,0)'
        });
        shp.render(ctx);
      };
    }
    // this.data = canvas.toDataURL();
  }

  public send() {
    var canvasRight = new fabric.Canvas('cRight');

    fabric.Image.fromURL(this.data, (oImg) => {
      canvasRight.add(oImg);
      canvasRight.renderAll();
    });
  }

  public undo() {
    var canvas = new fabric.Canvas('cLeft');
    let src = this.srcLeft;
    loadImage(src, canvas);
  }

}

function loadImage(src: string, canvas: any, fX?: number, fY?: number, lX?: number, lY?: number) {
  canvas.clear();
  fabric.Image.fromURL(src, (oImg) => {
    oImg.left = 10;
    oImg.top = 10;
    canvas.add(oImg);

    if (fX && (Math.abs(fX - lX) > 20 || Math.abs(fY - lY) > 20)) {
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
      var rect = new fabric.Rect({
        left: x, top: y, width: Math.abs(lX - fX), height: Math.abs(lY - fY),
        strokeDashArray: [5, 3], stroke: 'red', strokeWidth: 1,
        fill: '#ff0',
        // fill: 'rgba(0,0,0,0)',
        hasControls: false,
        selectable: false,
        evented: false
      }).setOpacity(0.3);
      canvas.add(rect);
      console.log("-->> Image + Rect: " + x + ' ' + y + ' ' + Math.abs(lX - fX) + ' ' + Math.abs(lY - fY));
    }
    else {
      console.log("-->> Image Loaded");
    }
    canvas.renderAll();
    canvas.setHeight(oImg.getHeight() + 20);
    canvas.setWidth(oImg.getWidth() + 20);
  }, { hasControls: false, selectable: false, evented: false, strokeDashArray: [2, 2], opacity: 1 });
}




