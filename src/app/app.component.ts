import { Component, OnInit, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import {saveAs} from 'file-saver';

declare var fabric;
declare var CP;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  @ViewChild('shirt', {static: false}) shirt: ElementRef;
  @ViewChild('shirt_color_picker', {static: true}) shirt_color_picker: ElementRef;
  @ViewChild('design_canvas', {static: true}) design_canvas: ElementRef;

  title = 'f2fdesigner';
  public shirt_text: any = '';

  canvas: any = {};
  designData: any;

  constructor()
  {
  
  }

  ngOnInit()
  {

    this.canvas = new fabric.Canvas('tshirt-canvas');
    console.log(this.canvas);

    // When the user selects a picture that has been added and press the DEL key
    // The object will be removed !
    document.addEventListener("keydown", e => {
      var keyCode = e.keyCode;

      if(keyCode == 46){
          console.log("Removing selected element on Fabric.js on DELETE key !");
          this.canvas.remove(this.canvas.getActiveObject());
      }
    }, false);

    let picker = document.querySelector("#color-picker");
 
    /*picker.on("change", color => {
      let colorhex = "#" + color;
      console.log(colorhex);
      this.shirt.nativeElement.style.backgroundColor = colorhex;
    });*/

    this.canvas.on('object:selected', obj => {
      console.log(obj.target.get('type'));
    }); 
  }

  updateColor(value)
  {
    this.shirt.nativeElement.style.backgroundColor = value;
  }

  updateShirtImage(imageURL){
 
    console.log(imageURL);
    fabric.Image.fromURL(imageURL, img => {                   
        img.scaleToHeight(200);
        img.scaleToWidth(200); 

        this.canvas.centerObject(img);
        this.canvas.add(img);
        this.canvas.renderAll();
    });
  }

  updateText(value)
  {
    let textBox = new fabric.Textbox(value);

    this.canvas.centerObject(textBox);
    this.canvas.add(textBox).setActiveObject(textBox);
    this.canvas.renderAll();
  }

  updateTextColor(value)
  {
    console.log(value);
    this.canvas.getActiveObject().set("fill", value);
    this.canvas.requestRenderAll();
  }

  updateTextFont(value)
  {
      this.canvas.getActiveObject().set("fontFamily", value);
      this.canvas.requestRenderAll();
  }

  selectCustomDesign(e)
  {
    let reader = new FileReader();
    reader.onloadend = (e) => {
   
      let fileString = reader.result;

      var imgObj = new Image();
      imgObj.src = fileString as string;

      // When the picture loads, create the image in Fabric.js
      imgObj.onload = () => {
          var img = new fabric.Image(imgObj);

          img.scaleToHeight(200);
          img.scaleToWidth(200); 

          this.canvas.centerObject(img);
          this.canvas.add(img);
          this.canvas.renderAll();
      };
    };

    // If the user selected a picture, load it
    if(e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
    }
  };

  updateShirtColor(color)
  {
    this.shirt.nativeElement.style.backgroundColor = color;
  }

  uploadPicture()
  {

  }

  export()
  {
    /*let canvasBlob = toda( blob => {
      let filename = Date.now() + '.png';
      saveAs(canvasBlob, filename);
    });*/

    let element = this.design_canvas;

    let canvasData = this.canvas.toDataURL('png');
    this.designData = canvasData;

    //$('#exampleModal').modal();

    /*let designImg = new Image(1000,1000);
    designImg.src = canvasData;

    var w = window.open("");
    w.document.write(designImg.outerHTML) ;*/
    
    console.log(this.canvas.getActiveObject().get('type'));
  }
}
