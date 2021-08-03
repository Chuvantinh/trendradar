import { Component, OnInit } from '@angular/core';
// get data from backend
import {Apollo} from "apollo-angular";
import gql from 'graphql-tag';
import {Router, ActivatedRoute} from "@angular/router";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.sass']
})
export class PortfolioComponent implements OnInit {
  portFolio: any = [];
  constructor(
    private notification: NotificationService,
    private apollo: Apollo,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getPortfolioList();
  }

  getPortfolioList(){
    this.apollo
    .watchQuery({
      query: gql`
        query getPortfolioEvalution{
          getPortfolioEvalution{
            trendId{
              id
              title
              description
              createdAt
            }
            total_pro
            count
            average_pro
            average_effect
            total_effect
            total
          }
        }
      `,
    })
    .valueChanges.subscribe(result => {
      this.portFolio = Array.of(result.data);
      this.portFolio =   Array.of(this.portFolio[0].getPortfolioEvalution);
      console.log(this.portFolio);
    });
  }

  titleSlice(text: string): string{
    return text.slice(0, 25) + "...";
  }

  roundExtends(num: string): string{
    let convertedText = parseFloat(num);
    return convertedText.toFixed(2);
  }

  /**
   * go to page trend details with id
   */
  routerOtherPage(id:any){
    this.router.navigateByUrl(`/listtrends/${id}`);
  }

  getClassColor(average_effect_input:any){
    let average_effect:number = parseFloat(average_effect_input);
      if (average_effect > 0.1 && average_effect < 2) {
        return "bubble-red";
      }
      else if(average_effect > 2 && average_effect < 3.6) {
        return "bubble-yellow";
      }
      else if(average_effect > 3.5){
        return "bubble-blue";
      }
      else {
        return "";
      }
  }
}


