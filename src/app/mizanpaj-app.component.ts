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

  constructor(mdIconRegistry: MdIconRegistry) {
    mdIconRegistry
      .registerFontClassAlias('fontawesome', 'fa');
  }

  ngOnInit() {
    let canvas = new fabric.Canvas('cLeft');
    let src = "../../images/kupurSecond.jpg";
    // Seçimin Başladığı ve Bittiği Koordinatlar
    let firstX, firstY, lastX, lastY;
    // Seçimin Başladığı ve Bittiği Koordinatlara Göre Max & Min
    let minX, minY, maxX, maxY;

    console.log("Inıt");

    // Küpürü Yükle
    fabric.Image.fromURL(src, function (oImg) {
      oImg.left = 10;
      oImg.top = 10;
      canvas.add(oImg);
      canvas.renderAll();
      console.log("Image");
    }, { hasControls: false, selectable: false, evented: false, strokeDashArray: [2, 2], opacity: 1 });

    // Seçimin Başladığı Koordinatlar
    canvas.on('mouse:down', function (e) {
      firstX = getMouseCoords(e)[0];
      firstY = getMouseCoords(e)[1];
      console.log('Down:' + firstX + ' ' + firstY);
    });

    // Seçimin Bittiği Koordinatlar
    canvas.on('mouse:up', function (e) {
      lastX = getMouseCoords(e)[0];
      lastY = getMouseCoords(e)[1];
      console.log('Up: ' + lastX + ' ' + lastY);
      getRectCoords();

      // if (maxX - minX > 1) {
      //   console.log('If');
      //   canvas.clipTo = function (ctx) {
      //     event.preventDefault()
      //     ctx.rect(minX, minY, maxX - minX, maxY - minY);
      //     console.log('ClipTo ' + minX + ' ' + maxX + ' ' + minY + ' ' + maxY);
      //   }

      //   fabric.Image.fromURL(src, function (oImg) {
      //     oImg.left = 10;
      //     oImg.top = 10;
      //     canvas.add(oImg);
      //     canvas.renderAll();
      //   }, { hasControls: false, selectable: false, evented: false, strokeDashArray: [2, 2], opacity: 1 });
      // }
    });

    // Min & Max Değerleri (Dikdörtgen Koordinatları)
    function getRectCoords() {
      if (firstX < lastX) {
        minX = firstX;
        maxX = lastX;
      }
      else {
        minX = lastX;
        maxX = firstX;
      }

      if (firstY < lastY) {
        minY = firstY;
        maxY = lastY;
      }
      else {
        minY = lastY;
        maxY = firstY;
      }

      //console.log(minX + ' ' + maxX + ' ' + minY + ' ' + maxY);
    }

    function getMouseCoords(event) {
      var pointer = canvas.getPointer(event.e);
      var posX = pointer.x;
      var posY = pointer.y;
      let XY = [posX, posY];
      return XY;
    }
  };

  public crop() {
    var c = <HTMLCanvasElement> document.getElementById("cLeft");
    var ctx = c.getContext("2d");
    // Clip a rectangular area
    ctx.rect(10, 10, 200, 200);
    ctx.stroke();
    ctx.clip();
    // Draw red rectangle after clip()
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 150, 100);
  }

  public send() {
    var canvasLeft = new fabric.Canvas('cLeft');
    var canvasRight = new fabric.Canvas('cRight');
    var dt = canvasLeft.toDataURL('image/jpeg');

    console.log();

    this.undo();

    fabric.Image.fromURL("../../images/kupurSecond.jpg", function (img) {
      canvasRight.add(img)
    });
  }

  public undo() {
    var canvasLeft = new fabric.Canvas('cLeft');
    fabric.Image.fromURL("../../images/kupurSecond.jpg", function (img) {
      canvasLeft.add(img)
    });
  }

}


