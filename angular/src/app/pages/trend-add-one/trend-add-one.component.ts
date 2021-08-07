import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormArray, FormBuilder, Validators} from '@angular/forms';
// Get data by gql query
import {Apollo, gql} from 'apollo-angular';
// import  from 'graphql-tag';

import {Router, ActivatedRoute} from '@angular/router';
import {NotificationService} from '../../services/notification.service';

import {AngularFireDatabase} from "@angular/fire/database";
import {AngularFireStorage} from "@angular/fire/storage";
import { HttpClientModule } from '@angular/common/http';
import {Observable,of, from, Subscription } from 'rxjs';
import {finalize, map} from "rxjs/operators";

@Component({
  selector: 'app-trend-add-one',
  templateUrl: './trend-add-one.component.html',
  styleUrls: ['./trend-add-one.component.sass'],
})

export class TrendAddOneComponent implements OnInit {


  form: FormGroup = this.formBuilder.group({});
  categories:any = [];

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
      categoriesId: ['', Validators.required],
      sources: this.fb.array([
        this.fb.group({
          title: new FormControl('', [Validators.required]),
          description: new FormControl('', [Validators.required]),
          url: new FormControl('', [Validators.required]),
          source: new FormControl('', [Validators.required]),
        })
      ]),

    });
  }

  async add(valueInput: any) {
    // validate form
    if (this.form.invalid) {
      this.notification.showError('Bitte validieren Sie Form', 'trendradar.de');
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

    //console.log(valueInput.categoriesId) ["29", "30", "31", "36", "37"]

    enum STATUS {
      e = 'ACTIVE',
      g = 'DEACTIVE',
      b = 'BEENDET'
    }

    // add data to database
    const createTrend = gql`
      mutation createTrend(
        $title: String!,
        $description: String,
        $status: Status
        $images: [String],
        $videos: [String],
        $categoriesId: [String],
        $source: [TrendSourceCreateInput]
      ){
        createTrend( data: {
          title: $title,
          description: $description,
          status: $status,
          images: $images,
          videos: $videos,
          },
          categoriesId: $categoriesId,
          source: $source
        )
        {
          id
          title
          description
          createdAt
          createdBy{
            id
            name
          }
          createdBy{
            id
            name
            email
          }
        }
      }
    `;

    this.apollo.mutate({
      mutation: createTrend,
      variables: {
        title: valueInput.title,
        description: valueInput.description,
        status: STATUS.e,
        images: this.linkImages,
        videos: this.linkVideos,
        categoriesId: valueInput.categoriesId,
        source: valueInput.sources
      }
    }).subscribe( (data) => {
      if(data){
        this.notification.showSuccess('trendradar', 'trendradar.de');
        this.router.navigateByUrl('listtrends');
      } else {
        this.notification.showError('error during adding', 'trendradar.de')
      }

    })
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
   * get Infor of all categories with subcategory
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
            subCategory{
              id
              title
            }
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
        isparent: 3
      }
    })
    .valueChanges.subscribe(result => {

      this.categories = Array.of(result.data);

      this.categories = this.categories[0].getCategories;

    });
  }

  /**
   * ******************************************************************************************************** FORM ARRAY
   */

  /**
   * Video, Add and Remove question type Video
   */
  trend_videos() {
    return this.form.get('trendVideos') as FormArray;
  }

  removeQuestionVideo(index: number) {
    this.trend_videos().removeAt(index);
  }

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

  getSources(){
    return this.form.get('sources') as FormArray;
  }

  addSources(){
    return this.getSources().push(
      this.fb.group({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        url: new FormControl('', [Validators.required]),
        source: new FormControl('', [Validators.required]),
    }))
  }

  removeSources(index:number){
    this.getSources().removeAt(index);
  }

  /**
   * *********************************************************************************************************** END FORM ARRAY
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
