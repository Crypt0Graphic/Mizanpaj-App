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
    let canvas = new fabric.Canvas('c');
    let src = "../../images/kupurSecond.jpg";
    // Seçimin Başladığı ve Bittiği Koordinatlar
    let firstX, firstY, lastX, lastY;
    // Seçimin Başladığı ve Bittiği Koordinatlara Göre Max & Min
    let minX, minY, maxX, maxY;

    // Küpürü Yükle
    fabric.Image.fromURL(src, function (oImg) {
      oImg.left = 10;
      oImg.top = 10;
      canvas.add(oImg);
      canvas.renderAll();
    }, { hasControls: false, selectable: false, evented: false, strokeDashArray: [2, 2], opacity: 1 });

    // Seçimin Başladığı Koordinatlar
    canvas.on('mouse:', function (e) {
      firstX = getMouseCoords(e)[0];
      firstY = getMouseCoords(e)[1];
      console.log('Down:' + firstX + ' ' + firstY);
    });

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

      if (maxX - minX > 1) {
        console.log('If');
        canvas.clipTo = function (ctx) {
          ctx.rect(minX, minY, maxX - minX, maxY - minY);
          console.log('ClipTo ' + minX + ' ' + maxX + ' ' + minY + ' ' + maxY);
        }

        fabric.Image.fromURL(src, function (oImg) {
          oImg.left = 10;
          oImg.top = 10;
          canvas.add(oImg);
        }, { hasControls: false, selectable: false, evented: false, strokeDashArray: [2, 2], opacity: 1 });
      }
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



  }
}
