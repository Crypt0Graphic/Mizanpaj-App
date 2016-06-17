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
  public cropped: HTMLImageElement;
  public srcLeft: string = "../../images/kupurSecond.jpg";
  public cL: any;
  public cR: any;

  constructor(mdIconRegistry: MdIconRegistry) {
    mdIconRegistry
      .registerFontClassAlias('fontawesome', 'fa');
  }

  ngOnInit() {

    this.cR = new fabric.Canvas('cRight');
    this.cL = new fabric.Canvas('cLeft');
    var src = this.srcLeft;


    this.cL.on('mouse:down', (event: any): void => {
      this.cL.clipTo = null;
      var position = this.cL.getPointer(event.e);
      this.firstX = position.x;
      this.firstY = position.y;
      console.log("Down");
    });

    this.cL.on('mouse:up', (event: any): void => {
      var position = this.cL.getPointer(event.e);
      this.lastX = position.x;
      this.lastY = position.y;
      console.log("Up");
      // ReLoad Image
      loadImage(src, this.cL, '0', this.firstX, this.firstY, this.lastX, this.lastY);
    });

    loadImage(src, this.cL, '1');

  }; // End of ngOnInıt

  public clip = () => {

    var src = this.srcLeft;
    loadImage(src, this.cL, '2');

    //this.cL.clipTo = null;
    this.cL.renderAll();

    // If there is enough width -> clipTo
    if (Math.abs(this.firstX - this.lastX) > 20 || Math.abs(this.firstY - this.lastY) > 20) {

      this.cL.clipTo = (ctx) => {

        console.log("-->> clipTo: " + this.firstX + " " + this.firstY + " " + this.lastX + " " + this.lastY);

        var rect = new fabric.Rect({
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
        rect.render(ctx);
      };
      this.cL.renderAll();
    }
  }

  public send = () => {
    this.cL.clipTo = null;
    // Cropped Image toDataUrl START
    var croppedImage = new Image;
    croppedImage.src = this.cL.toDataURL({
      left: this.firstX,
      top: this.firstY,
      width: Math.abs(this.lastX - this.firstX),
      height: Math.abs(this.lastY - this.firstY)
    });

    // canvas.clear();
    var image = new fabric.Image(croppedImage, { cornerColor: 'Red', borderColor: 'Red', lockUniScaling: true, transparentCorners: true, cornerSize: 6, rotatingPointOffset: 12 });
    image.left = this.firstX;
    image.top = this.firstY;
    //image.setCoords();
    this.cR.add(image);
    // //canvas.renderAll();
    console.log("Send");
  }

  public undo = () => {
    this.cL.clipTo = null;
    var canvas = new fabric.Canvas('cLeft');
    let src = this.srcLeft;
    loadImage(src, canvas, '3');
    console.log("Undo");
  }

  public delete = () => {
    var activeObject = this.cR.getActiveObject(),
      activeGroup = this.cR.getActiveGroup();
    if (activeObject) {
      if (confirm('Seçili öğeyi silmek istediğinize emin misiniz?')) {
        this.cR.remove(activeObject);
      }
    }
    else if (activeGroup) {
      if (confirm('Seçili öğeleri silmek istediğinize emin misiniz?')) {
        var objectsInGroup = activeGroup.getObjects();
        this.cR.discardActiveGroup();
        objectsInGroup.forEach((object) => {
          this.cR.remove(object);
        });
      }
    }
  }

  public download = () => {
    var aElement = <HTMLAnchorElement>document.getElementById("btnDownload");
    aElement.href = this.cR.toDataURL('image/jpeg');
  }

}

var loadImage = (src: string, canvas: any, info: string, fX?: number, fY?: number, lX?: number, lY?: number) => {
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
      console.log("-->> Image + Rect: " + info);
    }
    else {
      console.log("-->> Image Loaded: " + info);
    }
    canvas.renderAll();
    canvas.setHeight(oImg.getHeight() + 20);
    canvas.setWidth(oImg.getWidth() + 20);
  }, { hasControls: false, selectable: false, evented: false, strokeDashArray: [2, 2], opacity: 1 });
}




