import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormArray, FormBuilder, Validators} from '@angular/forms';
// Get data by gql query
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

import {Router, ActivatedRoute} from '@angular/router';
import {NotificationService} from '../../services/notification.service';

import {AngularFireDatabase} from "@angular/fire/database";
import {AngularFireStorage} from "@angular/fire/storage";
import { HttpClientModule } from '@angular/common/http';
import {Observable,of, from } from 'rxjs';
import {finalize, map} from "rxjs/operators";

@Component({
  selector: 'app-trend-add-one',
  templateUrl: './trend-add-one.component.html',
  styleUrls: ['./trend-add-one.component.sass'],
})
export class TrendAddOneComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({});
  categories:any = [];
  categoriesMegatrend:any = [];

  images:any[] = []; // for preview images
  videos:any[] = []; // for preview videos
  uploadFilesImages:any[] = []; // for save images
  uploadFilesVideos:any[] = []; // for save videos
  // link images and videos after uploading
  linkImages:any[] = [];
  linkVideos:any[] = [];
  downloadURL: Observable<string> = new Observable<string>();

  constructor(
    private formBuilder: FormBuilder,
    private apollo: Apollo,

    private router: Router,
    private route: ActivatedRoute,
    private notification: NotificationService,
    private fb: FormBuilder,

    private db: AngularFireDatabase,
    // public downloadURL: Observable<string>,
    private storage: AngularFireStorage,
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getCategoriesMegatrend();

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      trendVideos: this.fb.array([
        this.fb.group({
          trend_videos: new FormControl('', [Validators.required]),
        })
      ]),
      trendImages: this.fb.array([
        this.fb.group({
          trend_images: new FormControl('', [Validators.required]),
        })
      ]),
      status: ['', Validators.required],
      catId1: ['', Validators.required],
      catId2: ['', Validators.required],
    });
  }

  async add(valueInput: any) {
    // validate form
    if (this.form.invalid) {
      this.notification.showError('Bitte validieren Sie Form', 'open-innovation.de');
      return;
    }

    if ( this.uploadFilesImages.length > 0){
      for await (let item of this.uploadFilesImages){
        this.linkImages.push( await this.uploadImages(item));
      }
    }

    if ( this.uploadFilesVideos.length > 0){
      for await (let item of this.uploadFilesVideos){
        this.linkVideos.push( await this.uploadVideos(item));
      }
    }

    enum STATUS {
      e = 'ACTIVE',
      g = 'DEACTIVE',
      b = 'BEENDET'
    }

    const _status = STATUS;

    // add data to database
  }

  /**
   * Handle Change of Images
   */
  onFileImagesChange(event:any) {
    if (event.target.files && event.target.files[0]) {
      //console.log(this.uploadFilesImages);
      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let reader = new FileReader();

        reader.onload = (event: any) => {
          // console.log(event.target.result);
          this.images.push(event.target.result);

        };
        // for upload image
        this.uploadFilesImages.push(event.target.files[i]);
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  /**
   * Handle Change of Videos
   */
  onFileVideoChange(event:any) {
    if (event.target.files && event.target.files[0]) {
      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let reader = new FileReader();

        reader.onload = (event: any) => {
          // console.log(event.target.result);
          this.videos.push(event.target.result);

        };
        // for upload video to frise base
        this.uploadFilesVideos.push(event.target.files[i]);
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  /**
   * get Infor of all categories
   */
  getCategories() {
    this.apollo
    .watchQuery({
      query: gql`
        query getCategories($isparent: Int){
          getCategories(isparent: $isparent){
            id
            title
            description
            createdAt
            createdBy
            {
              id
              name
            }
          }
        }
      `,
      variables: {
        isparent: 1
      }
    })
    .valueChanges.subscribe(result => {

      this.categories = Array.of(result.data);

      this.categories = this.categories[0].getCategories;

    });
  }

  /**
   * get Infor of all categories
   */
  getCategoriesMegatrend() {
    this.apollo
    .watchQuery({
      query: gql`
        query getCategories($isparent: Int){
          getCategories(isparent: $isparent){
            id
            title
            description
            createdAt
            createdBy
            {
              id
              name
            }
          }
        }
      `,
      variables: {
        isparent: 0
      }
    })
    .valueChanges.subscribe(result => {

      this.categoriesMegatrend = Array.of(result.data);

      this.categoriesMegatrend = this.categoriesMegatrend[0].getCategories;

    });
  }

  getMarcoTrendByMegaId($event: any){
    let parentId:number = parseInt($event);
    console.log(parentId);
    this.apollo
    .watchQuery({
      query: gql`
        query getMarcoTrendByMegaId($parentId: Int){
          getMarcoTrendByMegaId(parentId: $parentId){
            id
            title
            description
          }
        }
      `,
      variables: {
        parentId: parentId
      }
    })
    .valueChanges.subscribe(result => {
      this.categories = Array.of(result.data);
      this.categories = Array.of(this.categories[0].getMarcoTrendByMegaId);

    });
  }

  /**
   * ************************************************************************************ FORM ARRAY
   */

  // Video ----------------------------------------------------------------------------------------------------------
  /**
   * Video, Add and Remove question type Video
   */
  trend_videos() {
    return this.form.get('trendVideos') as FormArray;
  }

  removeQuestionVideo(index: number) {
    this.trend_videos().removeAt(index);
  }

  // Images ----------------------------------------------------------------------------------------------------------
  /**
   * Image, Add and Remove question type image
   * image would save on the google cloud
   */
  trend_images() {
    return this.form.get('trendImages') as FormArray;
  }

  removeQuestionImage(index: number) {
    this.trend_images().removeAt(index);
  }

  /**
   * ***********************************************************************************************************
   */

  /**
   * Upload Image to Firebase Cloud in Folder ImagesSurvey
   * @output string url
   */
  uploadImages(fileItem: any):any {
    return new Promise((resolve, reject) => {
      let URL:any;
      const date = Date.now();
      const filePath = `Masterthesis/${date}`; // where storaged
      const fileRef = this.storage.ref(filePath); // where is the endpoint

      const task = this.storage.upload(`Masterthesis/${date}`, fileItem);
      task.snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(url => {
              if (url) {
                URL = url;
                resolve(URL);
              }
              console.log('Link image in function uploadImages  is :' + URL);
            });
          })
        )
        .subscribe();
    });
  }

  /**
   * Upload Video to Firebase Cloud in Folder VideosSurvey
   * @output string url
   */
  uploadVideos(fileItem: any): any {
    return new Promise((resolve, reject) => {
      let URL: any;
      const date = Date.now();
      const filePath = `Masterthesis/${date}`; // where storaged
      const fileRef = this.storage.ref(filePath); // where is the endpoint

      const task = this.storage.upload(`Masterthesis/${date}`, fileItem);
      task.snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(url => {
              if (url) {
                URL = url;
                resolve(URL);
              }
              console.log('Link video in function uploadImages  is :' + URL);
            });
          })
        )
        .subscribe();
    });
  }
}
