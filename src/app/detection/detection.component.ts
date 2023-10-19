import { Component,HostListener, ElementRef, Renderer2,AfterViewInit } from '@angular/core';
import { ImaggaService } from '../imagga.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detection',
  templateUrl: './detection.component.html',
  styleUrls: ['./detection.component.css']
})
export class DetectionComponent{
  componentLoaded=false;
  imagegot="";
  msg="";
  error="";
  selected_f="@4.jpg";
  selectedFile:any;
  imagebase="";
  imagebase64="assets/faces/@4.jpg";
  loading = false;
  resultsdiv = false;
  viewportWidth:number=0;
  toggleEnabled=false;
  screen=false;
  screen1=false;
  allowedTypes = ['jpeg', 'png', 'jpg','PNG'];
  //start
  tags = [
      {
          "confidence": 100,
          "tag": {
              "en": "automaton"
          }
      },
      {
          "confidence": 24.9597835540771,
          "tag": {
              "en": "cartoon"
          }
      },
      {
          "confidence": 20.89719581604,
          "tag": {
              "en": "3d"
          }
      },
      {
          "confidence": 10.2066612243652,
          "tag": {
              "en": "graphic"
          }
      },
      {
          "confidence": 10.1008262634277,
          "tag": {
              "en": "optical instrument"
          }
      },
      {
          "confidence": 10.0199203491211,
          "tag": {
              "en": "happy"
          }
      },
      {
          "confidence": 9.93219566345215,
          "tag": {
              "en": "television equipment"
          }
      },
      {
          "confidence": 9.92774963378906,
          "tag": {
              "en": "silhouette"
          }
      },
      {
          "confidence": 9.80552864074707,
          "tag": {
              "en": "game"
          }
      },
      {
          "confidence": 9.78609371185303,
          "tag": {
              "en": "device"
          }
      },
      {
          "confidence": 9.7536678314209,
          "tag": {
              "en": "kick"
          }
      },
      {
          "confidence": 9.70938110351562,
          "tag": {
              "en": "comic"
          }
      },
      {
          "confidence": 9.45061588287354,
          "tag": {
              "en": "drawing"
          }
      },
      {
          "confidence": 9.42876529693604,
          "tag": {
              "en": "player"
          }
      },
      {
          "confidence": 9.3785514831543,
          "tag": {
              "en": "expression"
          }
      },
      {
          "confidence": 9.25883865356445,
          "tag": {
              "en": "smile"
          }
      },
      {
          "confidence": 9.21687984466553,
          "tag": {
              "en": "male"
          }
      },
      {
          "confidence": 9.1738748550415,
          "tag": {
              "en": "funny"
          }
      },
      {
          "confidence": 9.10591220855713,
          "tag": {
              "en": "modern"
          }
      },
      {
          "confidence": 9.09453392028809,
          "tag": {
              "en": "shoot"
          }
      },
      {
          "confidence": 8.9928617477417,
          "tag": {
              "en": "human"
          }
      },
      {
          "confidence": 8.83872413635254,
          "tag": {
              "en": "robot"
          }
      },
      {
          "confidence": 8.70967483520508,
          "tag": {
              "en": "support"
          }
      },
      {
          "confidence": 8.60619163513184,
          "tag": {
              "en": "yellow"
          }
      },
      {
          "confidence": 8.51807498931885,
          "tag": {
              "en": "face"
          }
      },
      {
          "confidence": 8.4087963104248,
          "tag": {
              "en": "black"
          }
      },
      {
          "confidence": 8.35577774047852,
          "tag": {
              "en": "summer"
          }
      },
      {
          "confidence": 8.3368091583252,
          "tag": {
              "en": "clip art"
          }
      },
      {
          "confidence": 8.32709121704102,
          "tag": {
              "en": "child"
          }
      },
  
      {
          "confidence": 7.96868848800659,
          "tag": {
              "en": "world"
          }
      },
      {
          "confidence": 7.87539196014404,
          "tag": {
              "en": "vibrant"
          }
      },
      {
          "confidence": 7.85939931869507,
          "tag": {
              "en": "bright"
          }
      },
      {
          "confidence": 7.78776073455811,
          "tag": {
              "en": "pass"
          }
      },
      {
          "confidence": 7.67151308059692,
          "tag": {
              "en": "balls"
          }
      },
      {
          "confidence": 7.62231302261353,
          "tag": {
              "en": "electronic equipment"
          }
      },
      {
          "confidence": 7.33587884902954,
          "tag": {
              "en": "flag"
          }
      },
      {
          "confidence": 7.31970310211182,
          "tag": {
              "en": "artwork"
          }
      },
      {
          "confidence": 7.28822612762451,
          "tag": {
              "en": "digital"
          }
      },
      {
          "confidence": 7.248450756073,
          "tag": {
              "en": "people"
          }
      },
      {
          "confidence": 7.24119567871094,
          "tag": {
              "en": "figure"
          }
      },
      {
          "confidence": 7.16165018081665,
          "tag": {
              "en": "colorful"
          }
      },
      {
          "confidence": 7.11434459686279,
          "tag": {
              "en": "grass"
          }
      },
      {
          "confidence": 7.08578443527222,
          "tag": {
              "en": "kid"
          }
      }
  
  
  ]
  constructor(private img: ImaggaService, private http: HttpClient,private elementRef: ElementRef) {
  }
 


  async ngOnInit() {
    window.scrollTo(0, 0); //scroll to top
    this.imagebase64=await this.readFileAsBase64fromUrl(this.imagebase64);
    this.selectedFile=true;

    //
    this.viewportWidth = window.innerWidth;
    if (this.viewportWidth<992){
      this.toggleEnabled=true;
      this.screen1=true;
      this.removeClass("col-6");
      this.addClass("col-4");
    }
    else{
        this.screen=true;
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.viewportWidth = window.innerWidth;
    if (this.viewportWidth>991){
      this.toggleEnabled=false;
      this.screen=true;
      this.removeClass("col-4");
      this.addClass("col-2");
    }
    else{
      this.screen1=true;
      this.toggleEnabled=true;
      this.removeClass("col-6");
      this.addClass("col-4");
    }
  }
  addClass(x:any) {
    const element = this.elementRef.nativeElement.querySelector('.image-gallery');
    element.classList.add(x);
    
  }
  
  removeClass(x:any) {
    const element = this.elementRef.nativeElement.querySelector('.image-gallery');
    element.classList.remove(x);
    
  }
  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    event.target.classList.add('dragging');
  }

  onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    event.target.classList.remove('dragging');
  }

  handleDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    event.target.classList.remove('dragging');

    this.selectedFile = event.dataTransfer.files[0];
    console.log(this.selectedFile.name)
    this.selected_f=this.selectedFile.name;
    this.getbase64Image()
  }

  handleFileInput(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile.name);
    this.selected_f=this.selectedFile.name;
    this.getbase64Image()
  }
  async getbase64Image() {
    if (this.selectedFile) {
      this.imagebase64 = await this.convertToBase64(this.selectedFile);
      this.imagebase=this.imagebase64;
    }

  }

  openFileInput() {
    const fileInput = document.querySelector('.file-input') as HTMLInputElement;
    fileInput.click();
  }
  private convertToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        resolve(event.target.result);
      };
      reader.onerror = error => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }

 
  async Analyze() {
    if (this.selected_f.includes("@")){
        this.imagegot="assets/Results/"+this.selected_f.split(".")[0]+"_z."+this.selected_f.split(".")[1]
        this.resultsdiv = true;
        return
    }
  
    if (this.selectedFile) {
      if (this.selectedFile != true) {
        var filetype = this.selectedFile.name.split(".")[1];
        if (!this.allowedTypes.includes(filetype)) {
          this.msg = "Error: Allowed image types (JPEG, PNG, JPG)";
          return;
        }
      }
      this.msg = "";
      this.error="";
      this.resultsdiv = false;
      this.loading=true;
      
      // Set a flag to track whether the response has arrived
      let responseArrived = false;
  
      try {
        const responsePromise = this.img.getface(this.imagebase64,this.selectedFile);
        
        // Use Promise.race to wait for either the response or a 30-second timeout
        const result = await Promise.race([
          responsePromise,
          new Promise((resolve) => {
            setTimeout(() => {
              resolve({ timeout: true });
            }, 60000); // 30000 milliseconds (30 seconds)
          }),
        ]);
  
        if (!result.timeout) {
          // Handle the case where the response arrived within 30 seconds
          responseArrived = true;
        
          this.loading=false;
          
          this.imagegot="data:image;base64,"+result["image"];
          // Assuming you have an array of tags called 'tags'
        
        }
  
        // If the response didn't arrive within 30 seconds, stop loading
        if (!responseArrived) {
          this.loading = false;
          this.error="Timout error"
        }
        if (result.image=="No face detected"){
            this.error="No face detected";
            return
        }
        this.resultsdiv = true;
        
        console.log(result);
      } catch (error) {
        console.error("Error:", error);
        this.error="Network Error"
        this.loading = false; // Stop loading on error
      }
    } else {
      console.log("No file selected");
    }
  }



  readFileAsBase64fromUrl(filePath: string): Promise<string> {
    return this.http.get(filePath, { responseType: 'blob' })
      .toPromise()
      .then((blob: Blob | undefined) => { // Note the updated type definition here
        return new Promise<string>((resolve, reject) => {
          if (blob) { // Check if blob is defined
            const reader = new FileReader();
            reader.onloadend = () => {
              if (typeof reader.result === 'string') {
                resolve(reader.result);
              } else {
                reject('Failed to read file as base64.');
              }
            };
            reader.readAsDataURL(blob);
          } else {
            reject('File not found.');
          }
        });
      });
  }


  async setShowImage(event: any) {
    this.selected_f="@"+event.target.src.split("@")[1];
    this.imagebase64 = await this.readFileAsBase64fromUrl(event.target.src)
    this.selectedFile = true;
  }






}










