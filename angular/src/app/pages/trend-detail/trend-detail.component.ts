import { Component, OnInit } from '@angular/core';

// Get data by gql query
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

import {Observable} from "rxjs";
import {Router, ActivatedRoute} from '@angular/router';
import {NotificationService} from "../../services/notification.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Constants} from "../../services/constants";
//pdf
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {PrintService} from "../../services/print.service";

@Component({
  selector: 'app-trend-detail',
  templateUrl: './trend-detail.component.html',
  styleUrls: ['./trend-detail.component.sass']
})
export class TrendDetailComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({});
  trend: any; // store a trend detail
  id: number;
  datacomment:any;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,

    private notification: NotificationService,
    private apollo: Apollo,
  ) {
    this.id = 0;
  }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.params['id']);
    this.getTrendById(this.id);
    this.getCommentByTrendId(this.id);

    this.initForm();

  }

  /**
   * Init Form for trend's voting
   * @return void
   */
  public initForm(){
    this.form = this.formBuilder.group({
      effect: ['',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern(Constants.REGEX.NUMBER_FORMAT)
        ]
      ],
      probability: ['',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern(Constants.REGEX.NUMBER_FORMAT)
        ]
      ],
      during: ['', Validators.required]

    });
  }

  /**
   * get just only one trend
   * @param id
   */
  getTrendById(id: number){
    this.apollo
    .watchQuery({
      query: gql`
        query GetOneTrend( $id: Int!){
          getTrendById(id: $id){
            id,
            title,
            description,
            images,
            videos,
            start,
            end,
            categories{
              title
            }
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
              source
            }
            trendEvalution{
              id
              effect
              probability
              during
              createdAt
              createdBy{
                name
              }
            }
            comment{
              id
              content
            }
          }
        }
      `,
      variables: {
        id: id
      }
    })
    .valueChanges.subscribe(result => {
      this.trend = Array.of(result.data);

      this.trend =   Array.of(this.trend[0].getTrendById);
      console.log(this.trend);
    });
  }

  trendEvalution(valueInput: any): void{
    const effect = parseFloat(valueInput.effect);
    const probability = parseFloat(valueInput.probability);
    const during = valueInput.during;

    const createTrendEvalution = gql`
      mutation createTrendEvalution(
        $id: Int,
        $effect: Float,
        $probability: Float
        $during: String
      ){
          createTrendEvalution(data: {
            during: $during,
            effect: $effect,
            probability: $probability
          }, trendId: $id)
          {
            id
            effect
            probability
            trendId{
              id
              title
              description
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
      mutation: createTrendEvalution,
      variables: {
        id: this.id,
        effect: effect,
        probability: probability,
        during: during
      }
    }).subscribe( (data) => {
      this.notification.showSuccess('trendradar', 'added TrendEvalution')
      this.router.navigateByUrl('listtrends');
    })
  }

  /**
   * Take data from Comment Component and save data to the table TrendComment
   * @param newComment
   */
  addComment(newComment: string) {
   if(newComment){
     const createComment = gql`
       mutation createComment(
         $content: String,
         $trendId: Int,
       ){
         createComment(
           data: {
             content: $content,
         }, trendId: $trendId)
         {
           id
           content
           trendId{
             id
             title
             description
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
       mutation: createComment,
       variables: {
         content: newComment,
         trendId: this.id
       }
     }).subscribe( (data) => {
       this.notification.showSuccess('added new Comment', 'trendradar.de')
     })
   }
  }

  private getCommentByTrendId(id:number): any{
    const getCommentByTrendId = gql`
      query getCommentByTrendId($trendId: Int)
      {
        getCommentByTrendId(trendId: $trendId)
        {
          id
          content
          trendId{
            id
            title
            description
          }
          createdAt
          createdBy{
            id
            name
            email
          }
        }
      }
    `;

    this.apollo.watchQuery({
      query: getCommentByTrendId,
      variables: {
        trendId: this.id
      }
    }).valueChanges.subscribe( (data) => {
      this.datacomment = Array.of(data);
      this.datacomment = this.datacomment[0].data.getCommentByTrendId;
      console.log(this.datacomment);
    })
  }

  /**
   * Get PDF with library jspdf
   */
  public openPDF():void {
    let DATA:any = document.getElementById('htmlData');

    html2canvas(DATA).then(canvas => {

      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

      PDF.save('trend.pdf');
    });
  }
}
