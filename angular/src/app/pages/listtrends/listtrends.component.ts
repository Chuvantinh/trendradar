import { Component, OnInit } from '@angular/core';

// Get data by gql query
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

import {Observable} from "rxjs";
import {Router, ActivatedRoute} from '@angular/router';
import {NotificationService} from "../../services/notification.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {shareReplay} from "rxjs/operators";
// ref : pagination : https://www.npmjs.com/package/ngx-pagination#demo

@Component({
  selector: 'app-listtrends',
  templateUrl: './listtrends.component.html',
  styleUrls: ['./listtrends.component.sass']
})

export class ListtrendsComponent implements OnInit {
  listTrends: any;// store all trend to show
  categories:any = []; // store all categories
  form: FormGroup = this.formBuilder.group({});

  p: number = 1;// define page of pagination on the view

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,

    private notification: NotificationService,
    private apollo: Apollo,
  ) { }

  ngOnInit(): void {
    this.getListTrends("", "title", "asc", null, null);
    this.getCategories();
    this.definedFormGroup();
  }

  /**
   * Definde the arttribute of Form with 4 option
   */
  definedFormGroup(){
    this.form = this.formBuilder.group({
      search_string: ['', Validators.required],
      //categories: ['', Validators.required],
      orderByField: ['', Validators.required],
      valueField: ['', Validators.required],
    });
  }

  // getTrendsForTest(){
  //   return this.apollo
  //   .watchQuery({
  //     query: gql`
  //       query GetAllTrends($search_string: String, $orderByField: String, $valueField: String, $start: DateTime, $end: DateTime){
  //         getTrends(data:{
  //           search_string: $search_string, orderByField: $orderByField, valueField: $valueField, start: $start, end: $end
  //         }){
  //           id,
  //           title,
  //           description,
  //           images,
  //           videos,
  //           start,
  //           end,
  //           createdAt,
  //           createdBy{
  //             id
  //             name
  //           }
  //           status
  //           source{
  //             id
  //             title
  //             description
  //             url
  //             createdAt
  //           }
  //           trendEvalution{
  //             id
  //             effect
  //             probability
  //             during
  //             createdAt
  //           }
  //           comment{
  //             id
  //             content
  //           }
  //         }
  //       }
  //     `,
  //     variables: {
  //       search_string: "",
  //       orderByField: "title",
  //       valueField: "asc",
  //       start: "",
  //       end: "",
  //     }
  //   })
  //   .valueChanges.pipe(shareReplay(1));
  //   // .valueChanges.subscribe(result => {
  //   //   this.listTrends = Array.of(result.data);
  //   //   this.listTrends =   this.listTrends[0].getTrends;
  //   // });
  // }

  /**
   * Get all of actually trends on the table "Trend" in the database system
   */
  getListTrends(search_string: string, orderByField: string, valueField: string, start: Date | null, end: Date | null){
    this.apollo
    .watchQuery({
      query: gql`
        query GetAllTrends($search_string: String, $orderByField: String, $valueField: String, $start: DateTime, $end: DateTime){
          getTrends(data:{
            search_string: $search_string, orderByField: $orderByField, valueField: $valueField, start: $start, end: $end
          }){
            id,
            title,
            description,
            images,
            videos,
            start,
            end,
            createdAt,
            createdBy{
              id
              name
            }
            status
            source{
              id
              title
              description
              url
              createdAt
            }
            trendEvalution{
              id
              effect
              probability
              during
              createdAt
            }
            comment{
              id
              content
            }
          }
        }
      `,
      variables: {
        search_string: search_string,
        orderByField: orderByField,
        valueField: valueField,
        start: start,
        end: end,
      }
    })
    .valueChanges.subscribe(result => {
      this.listTrends = Array.of(result.data);
      this.listTrends =   this.listTrends[0].getTrends;
    });
  }

  /**
   * Get Information of all categories with subcategory
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
   * Event click filter
   * start and end variable were set null
   * @param value
   * return trend list
   */
  getListBySearch(value:any){
    if(value.orderByField == ""){
      value.orderByField = "title";
    }

    if (value.valueField == ""){
      value.valueField = "asc";
    }
    this.getListTrends(value.search_string, value.orderByField, value.valueField, null, null);
  }

  /**
   * Split images to item
   */

  exporeImages(images: string){
   //  console.log(images[0])
    return images[0];
  }
}
