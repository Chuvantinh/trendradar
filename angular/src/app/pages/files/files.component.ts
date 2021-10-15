import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

import {FilepreviewComponent} from "../filepreview/filepreview.component";

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.sass']
})
export class FilesComponent implements OnInit {
  listData: [] = []; // pass list data to

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker'
  ];
  allowedFileExtensions = ['png', 'jpg'];

  fileItems = [{
    name: "Documents",
    isDirectory: true,

    items: [{
      name: "Projects",
      isDirectory: true,

      items: [{
        name: "About.rtf",
        isDirectory: false,
        size: 1024,

        items:[{
          name: "Photos",
          isDirectory: true,
        }]
      }, {
        name: "Passwords.rtf",
        isDirectory: false,
        size: 2048
      }]
    }, {

      name: "About.xml",
      isDirectory: false,
      size: 1024
    }]
  }];

  selectedIndex = 1;
  id = 0;

  tree = [
    {
      "id": 1,
      "name": "D",
      "parentid": 0,
      "type": "folder",
      "isshare": true,
      "size": 1234
  },
    {
      "id": 5,
      "name": "Master",
      "parentid": 1,
      "type": "folder",
      "isshare": false,
      "size": 12344
    },
    {
      "id": 2,
      "name": "Dokuments",
      "parentid": 0,
      "type": "folder",
      "isshare": true,
      "size": 2222
    },
    {
      "id": 3,
      "name": "Projects",
      "parentid": 0,
      "type": "folder",
      "isshare": true,
      "size": 3333
    }
  ];




  list_view:any = [
    {
      "id": 4,
      "name": "About",
      "parentid": 1,
      "type": "xml",
      "isshare": false,
      "size": 2323
    },
    {
      "id": 5,
      "name": "Master",
      "parentid": 1,
      "type": "folder",
      "isshare": false,
      "size": 12344
    }
  ];

  list_view_D:any = [
    {
      "id": 4,
      "name": "About",
      "parentid": 1,
      "type": "xml",
      "isshare": false,
      "size": 2323
    },
    {
      "id": 5,
      "name": "master",
      "parentid": 1,
      "type": "folder",
      "isshare": false,
      "size": 1212
    }
  ];

  data_Documents = [
    {
      "id": 7,
      "name": "AI Machine",
      "parentid": 1,
      "type": "pdf",
      "isshare": false,
      "size": 12344
    }
  ];

  data_master = [
    {
      "id": 8,
      "name": "Kmeans",
      "parentid": 5,
      "type": "excel",
      "isshare": true,
      "size": 1735
    },
    {
      "id": 9,
      "name": "DBSCAN",
      "parentid": 5,
      "type": "pdf",
      "isshare": false,
      "size": 2222
    }
  ];

  projects = [

  ];


  myFiles:any [] = [];

  form: FormGroup = this.formBuilder.group({});

  constructor
  (
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.listData = [];
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.form = this.formBuilder.group({
      files: ['', Validators.required],
    });
  }

  setIndex(id:number){
    console.log('id' + id);
    this.selectedIndex = id;
    this.id = id;
    this.getListView(id);
  }

  getListView(id:number){
    if(id == 1){
      this.list_view = this.list_view_D;
    }

    if (id == 5){
      this.list_view = this.data_master;
    }

    if(id == 2){
      this.list_view = this.data_Documents;
    }

    if (id == 3){
      this.list_view = this.projects;
    }
  }

  previewFile(id:number, name:string, type: string){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.position = {
      //'top': '5%',
    };

    dialogConfig.width= '90%';
    dialogConfig.height= '90%';

    dialogConfig.data = {
      id: id,
      name: name,
      type: type,
      url: "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf"
    };

    const dialogRef = this.dialog.open(FilepreviewComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: any) => {
        console.log("Dialog output:", data)
      }
    );

  }

  upload(valueInput:any){
    for ( let i = 0 ; i < this.myFiles.length; i ++ ) {
      console.log(this.myFiles[i].lastModified);
    }
  }


  /**
   * Handle Change of Images
   */
  onFilesChange(event:any) {
    if (event.target.files && event.target.files[0]) {
      //console.log(this.uploadFilesImages);
      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let reader = new FileReader();

        reader.onload = (event: any) => {
          // console.log(event.target.files[i]);
          //this.myFiles.push(event.target.files[i]);

        };
        // for upload image
        this.myFiles.push(event.target.files[i]);

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }













  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  notification(movie:string){
    alert(movie);
  }

  alert(){
    alert(123);
  }


  caculatePadding(index:number){
    return index * 10 + 'px';
  }

  getIcons(type:string){
    if(type == 'folder'){
      return '<i class="fas fa-folder-open">';
    }else if( type == 'word'){
      return '<i class="fas fa-file-word"></i>';
    }else if (type == 'pdf'){
      return '<i class="fas fa-file-pdf"></i>';
    }else if (type == 'image'){
      return '<i class="far fa-file-image"></i>';
    } else if (type == 'video'){
      return '<i class="fas fa-file-video"></i>';
    } else if (type == 'excel'){
      return '<i class="fas fa-file-excel"></i>';
    } else if (type == 'zip'){
      return '<i class="fas fa-file-archive"></i>';
    } else {
      return '<i class="fas fa-file"></i>';
    }
  }
}
