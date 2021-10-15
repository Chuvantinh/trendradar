import { Component, OnInit ,Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

// reference: https://blog.angular-university.io/angular-material-dialog/
// co cho sua file roi update
@Component({
  selector: 'app-filepreview',
  templateUrl: './filepreview.component.html',
  styleUrls: ['./filepreview.component.sass']
})
export class FilepreviewComponent implements OnInit {

  id:number;
  name: string;
  type: string;
  url: string;
  constructor(
    private dialogRef: MatDialogRef<FilepreviewComponent>,
    @Inject(MAT_DIALOG_DATA) data:any
  ) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.url = data.url;

  }

  ngOnInit(): void {
  }

  save() {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

  downloadPdf(pdfUrl: string, pdfName: string ) {
    //const pdfUrl = './assets/sample.pdf';
    //const pdfName = 'your_pdf_file';
  }

}
