import {
  Component,
  Renderer2,
  ViewChild,
  ElementRef,
  OnInit
} from '@angular/core';

// get data from backend
import {Apollo} from "apollo-angular";
import gql from 'graphql-tag';
import {Router, ActivatedRoute} from "@angular/router";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-trendradar',
  templateUrl: './trendradar.component.html',
  styleUrls: ['./trendradar.component.sass']
})
export class TrendradarComponent implements OnInit {
  //x^2 + y^2 = 130^2 = 16900   https://brainly.com/question/11458821, (x, y)=(78, 104) -> factor x = 78 / 5 = 15.6, y= 104 / 100 = 1.04
  radar1 = 20; // r = 130
  radar2 = 44; // r = 220
  radar3 = 70; // r = 310
  radar4 = 80; // r = 400

  portFolio: any = [];
  adoptTrends: any = [];
  trialTrends: any = [];
  assesTrends: any = [];
  holdTrends: any = [];

  @ViewChild('tooltip') tooltip: ElementRef = new ElementRef<any>('tooltip');

  constructor(
    private renderer: Renderer2,
    private notification: NotificationService,
    private apollo: Apollo,
    private router: Router,
  ) { }

  ngOnInit(): void {
   this.getPortfolioList();
  }

  caculateTransform(vertical:any, horizontal:any, type:number){
    if(type == 1){
      let x:number = vertical * this.radar1;
      let y:number = horizontal * 1.3;
      return "translate("+ x +"," + y + ")";
    }else if(type == 2){
      let x:number = vertical * this.radar2;
      let y:number = horizontal * 1.3;
      return "translate("+ x +"," + y + ")";
    }else if (type == 3){
      let x:number = vertical * this.radar3;
      let y:number = horizontal * 1.3;
      return "translate("+ x +"," + y + ")";
    }else{
      let x:number = vertical * this.radar4;
      let y:number = horizontal * 1.3;
      return "translate("+ x +"," + y + ")";
    }

  }

  caculateTextAdopt(i:number){
    let stt = i + 1;
    return "translate("+ 0 +"," + 30 * stt + ")";
  }

  caculateTextTrial(i:number){
    let y = (i + 1) * 30 + 30;
    return "translate("+ -80 +"," + y + ")";
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
      this.portFolio =   Array.of(this.portFolio[0].getPortfolioEvalution)[0];

      for (let item of this.portFolio) {
        if(item.average_effect > 3.5 && item.average_pro > 30){ // right part 1
          this.adoptTrends.push(item);
        }else if(item.average_effect > 3.5 && item.average_pro < 31){ // left part 1
          this.trialTrends.push(item);
        }else if(item.average_effect > 2 && item.average_pro > 70){ // right of part2
          this.adoptTrends.push(item);
        }else if(item.average_effect > 2 && item.average_pro > 30 && item.average_pro <= 70){// mittel part 2
          this.trialTrends.push(item);
        }else if(item.average_effect > 2 && item.average_pro < 31){// left part 2
          this.assesTrends.push(item);
        }else if( item.average_effect < 2.1 && item.average_effect > 0 && item.average_pro < 71 && item.average_pro > 0){// left part 3
          this.holdTrends.push(item);
        }else if(item.average_effect < 2.1 && item.average_effect > 0 && item.average_pro > 70){// right part 3
          this.holdTrends.push(item);
        }else{

        }
      }

      console.log(this.adoptTrends)
      console.log(this.trialTrends)
      console.log(this.assesTrends)
      console.log(this.holdTrends)

    });
  }
  // https://stackblitz.com/edit/angular-svg-tooltip?file=src%2Fapp%2Fapp.component.ts
  public mouseEnter($event:any, data:any): void {
    let circle = $event.target as HTMLElement;
    console.log(circle);
    let coordinates = circle.getBoundingClientRect();
    let x = `${coordinates.left + 20}px`;
    let y = `${coordinates.top + 20}px`;
    this.renderer.setStyle(this.tooltip.nativeElement, 'left', x);
    this.renderer.setStyle(this.tooltip.nativeElement, 'top', y);
    this.renderer.setStyle(this.tooltip.nativeElement, 'display', 'block');
    this.renderer.setProperty(this.tooltip.nativeElement, 'innerHTML', data);
  }

  public mouseLeave($event:any): void {
    this.renderer.setProperty(this.tooltip.nativeElement, 'innerHTML', '');
    this.renderer.setStyle(this.tooltip.nativeElement, 'display', 'none');
  }

}
