import { Component, OnInit } from '@angular/core';

// Get data by gql query
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

import {Observable} from "rxjs";
import {Router, ActivatedRoute} from '@angular/router';
import {NotificationService} from "../../services/notification.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-listtrends',
  templateUrl: './listtrends.component.html',
  styleUrls: ['./listtrends.component.sass']
})

export class ListtrendsComponent implements OnInit {
  listTrends: any;// store all trend to show

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,

    private notification: NotificationService,
    private apollo: Apollo,
  ) { }

  ngOnInit(): void {
    this.getListTrends();
  }

  /**
   * Get actually all of trends in the table Trend
   */
  getListTrends(){
    this.apollo
    .watchQuery({
      query: gql`
        query GetAllTrends{
          getTrends{
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
            }
            comment{
              id
              content
            }
          }
        }
      `,
      variables: {}
    })
    .valueChanges.subscribe(result => {
      this.listTrends = Array.of(result.data);
      this.listTrends =   this.listTrends[0].getTrends;
    });
  }

  getListBySearch(){
    alert("11");
  }
}
