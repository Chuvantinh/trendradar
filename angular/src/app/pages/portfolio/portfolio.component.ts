import { Component, OnInit } from '@angular/core';
import { DOCUMENT} from "@angular/common";// for get element by id or class
import { Renderer2} from "@angular/core";// for add class
import { Inject, Injectable } from '@angular/core';
// get data from backend
import {Apollo} from "apollo-angular";
import gql from 'graphql-tag';
import {Router, ActivatedRoute} from "@angular/router";
import {NotificationService} from "../../services/notification.service";
// if print with other layout and version : https://timdeschryver.dev/blog/print-css-with-angular#hiding-entire-components

import {jsPDF} from "jspdf";
import {PrintService} from "../../services/print.service";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.sass', './print-component.sass']
})
export class PortfolioComponent implements OnInit {
  portFolio: any = [];
  constructor(
    private notification: NotificationService,
    private apollo: Apollo,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private rendere: Renderer2,
    public printService: PrintService,
  ) { }

  ngOnInit(): void {
    this.getPortfolioList();
  }

  /**
   * Get List of trend, which were evaluated by user before
   * and show it on the table with different colors and some areas.
   */
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

  /**
   * cut lenght of description
   * @param text
   */
  titleSlice(text: string): string{
    return text.slice(0, 25) + "...";
  }

  /**
   * make the number with only 2 number after the komma such as 2.39
   * @param num
   */
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

  /**
   * caculated the top with % for each trend. This top is with position absolute. the null point is above at 5 point of the table
   * each cell = 100px , ex: 5 to 4.5 is 100 because the with of tag td is 100 px.
   * each areas with a factor and in each areas the top procent will be again caculated
   * after having of factor, we will multiple with 100 , and minus half with of trend (35/2 = 17.5)
   * @param effect
   * return percent of top
   */
  caculateTop(effect:any){
    let effect_local = parseFloat(effect);
    let factor = 1;

    if( effect_local == 5){
      factor = 0;
    }else if(effect_local == 4.5){
      factor = 1;
    }
    else if(effect_local == 4){
      factor = 2;
    }
    else if(effect_local == 3.5){
      factor = 3;
    }
    else if(effect_local == 3){
      factor = 4;
    }
    else if(effect_local == 2.5){
      factor = 5;
    }
    else if(effect_local == 2){
      factor = 6;
    }
    else if(effect_local == 1.5){
      factor = 7;
    }
    else if(effect_local == 1){
      factor = 8;
    }
    else if(effect_local < 5 && effect_local > 4.5){
      factor = effect_local / 5
    }

    else if(effect_local < 4.5 && effect_local > 4){
      factor = effect_local / 4.5
    }

    else if(effect_local < 4 && effect_local > 3.5){
      factor = effect_local * 2 / 4
    }

    else if(effect_local < 3.5 && effect_local > 3){
      factor = effect_local * 3 / 3.5
    }

    else if(effect_local < 3 && effect_local > 2.5){
      factor = effect_local * 4 / 3
    }

    else if(effect_local < 2.5 && effect_local > 2){
      factor = effect_local * 5/ 2.5
    }

    else if(effect_local < 2 && effect_local > 1.5){
      factor = effect_local * 6/ 2
    }
    else if(effect_local < 1.5 && effect_local > 1){
      factor = effect_local * 7 / 1.5
    }
    else{

    }

    return factor * 100 - 17.5;
  }

  /**
   * Add class active, when hover in a trend
   * work follow is get id of element
   * add class active
   * @param $event
   */
  public mouseEnter($event: any){
    let highlight_class = this.document.getElementById($event.target.id);
    this.rendere.addClass(highlight_class, 'active');
  }

  /**
   * remove class active when you moved out of this element.
   * @param $event
   */
  public mouseLeave($event:any){
    let highlight_class = this.document.getElementById($event.target.id);
    this.rendere.removeClass(highlight_class, 'active');
  }
}


