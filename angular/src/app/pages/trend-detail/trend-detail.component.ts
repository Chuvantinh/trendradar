import { Component, OnInit } from '@angular/core';

// Get data by gql query
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

import {Observable} from "rxjs";
import {Router, ActivatedRoute} from '@angular/router';
import {NotificationService} from "../../services/notification.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Constants} from "../../services/constants";

@Component({
  selector: 'app-trend-detail',
  templateUrl: './trend-detail.component.html',
  styleUrls: ['./trend-detail.component.sass']
})
export class TrendDetailComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({});
  trend: any; // store a trend detail
  id: number;
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
}
