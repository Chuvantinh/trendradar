import {
  Component,
  Renderer2,
  ViewChild,
  ElementRef,
  OnInit,
  ChangeDetectorRef, AfterContentChecked, Inject
} from '@angular/core';

// get data from backend
import {Apollo} from "apollo-angular";
import gql from 'graphql-tag';
import {Router, ActivatedRoute} from "@angular/router";
import {NotificationService} from "../../services/notification.service";
import {count} from "rxjs/operators";

import { DOCUMENT} from "@angular/common";
import {PrintService} from "../../services/print.service";

@Component({
  selector: 'app-trendradar',
  templateUrl: './trendradar.component.html',
  styleUrls: ['./trendradar.component.sass']
})
export class TrendradarComponent implements OnInit {

  portFolio: any = [];
  adoptTrends: any = [];
  trialTrends: any = [];
  assesTrends: any = [];
  holdTrends: any = [];

  radar1:number = 1.3;// r = 130
  radar2:number = 2.2; // r = 220
  radar3:number = 3.1; // r = 310
  radar4:number = 4; // r = 400

  @ViewChild('tooltip') tooltip: ElementRef = new ElementRef<any>('tooltip');

  constructor(
    private renderer: Renderer2,
    private notification: NotificationService,
    private apollo: Apollo,
    private router: Router,
    private cdref: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document,
    public printService: PrintService
  ) { }

  ngOnInit(): void {
   this.getPortfolioList();
  }

  /**
   * caculateTransform
   * @param vertical
   * @param horizontal
   * @param type : as circle or ring  1 or 2 or 3 or 4, 1 is smallest
   * @param indexed : as quadrat 1 or 2 or 3 or 4, left , right , below right, below left.
   * return "translate("+ x +"," + y + ")";
   */
   caculateTransform(vertical:any, horizontal:any, type:number, indexed: number){
    /**
     * BEGIN quadrat ? 1,2 ,3 4
     */
    //x^2 + y^2 = 130^2 = 16900   https://brainly.com/question/11458821, (x, y)=(78, 104) -> factor x = 78 / 5 = 15.6, y= 104 / 100 = 1.04
    let addessX: number = 1;
    let addessY: number = 1;
    let minus = 0;
    if(indexed == 0){
      addessX = -1;
      addessY = 1;
      minus = 20;
    }else if(indexed == 1){
      addessX = 1;
      addessY = 1;
      minus = 30;
    }else if(indexed == 2){
      addessX = 1;
      addessY = -1;
      minus = 40;
    }else{
      addessX = -1;
      addessY = 1;
      minus = 50;
    }
    /**
     * END quadrat ? 1,2 ,3 4
     */

    if(type == 1){// radius with r = 130
      let factor = 0;
      if(indexed % 2 == 0){
        factor = this.radar1;
      }else{
        factor = this.radar1 / 2;
      }
      let x:number = horizontal * factor  * addessX;
      let y:number = (Math.sqrt(130 * 130 - (x  * x )) - minus) * addessY ;
      return "translate(" + x + "," + y + ")";
    }else if(type == 2){
      let factor = 0;
      if(indexed % 2 == 0){
        factor = this.radar2;
      }else{
        factor = this.radar2 / 2;
      }

      let x:number = horizontal * factor  * addessX;
      let y:number = (Math.sqrt((220 * 220) - (x  * x )) - minus ) * addessY ;
      return "translate(" + x + "," + y + ")";
    }else if (type == 3){
      let factor = 0;
      if(indexed % 2 == 0){
        factor = this.radar3;
      }else{
        factor = this.radar3 / 2;
      }
      let x:number = horizontal * factor  * addessX;
      let y:number = (Math.sqrt(310 * 310 - (x  * x )) - minus ) * addessY ;
      return "translate(" + x + "," + y + ")";
    }else{
      let factor = this.radar4;
      let x:number = horizontal * factor  * addessX;
      let y:number = (Math.sqrt(400 *  400 - (x  * x ) )   - minus ) * addessY ;
      return "translate(" + x + "," + y + ")";
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
    .valueChanges.subscribe(async (result) => {
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

      // console.log(this.adoptTrends)
      // console.log(this.trialTrends)
      // console.log(this.assesTrends)
      // console.log(this.holdTrends)

      let length_adoptTrends = this.adoptTrends.length;
      let length_trialTrends = this.trialTrends.length;
      let length_assesTrends = this.assesTrends.length;
      let length_holdTrends  = this.holdTrends.length;

      let arr_eff_pro_adopt: any[] = [];
      for (let item of this.adoptTrends){
        let arr_tem:any[] = [item.average_effect, item.average_pro];
        arr_eff_pro_adopt.push(arr_tem);
      }

      let arr_eff_pro_trial: any[] = [];
      for (let item of this.trialTrends){
        let arr_tem:any[] = [item.average_effect, item.average_pro];
        arr_eff_pro_trial.push(arr_tem);
      }

      let arr_eff_pro_asses: any[] = [];
      for (let item of this.assesTrends){
        let arr_tem:any[] = [item.average_effect, item.average_pro];
        arr_eff_pro_asses.push(arr_tem);
      }

      let arr_eff_pro_hold: any[] = [];
      for (let item of this.holdTrends){
        let arr_tem:any[] = [item.average_effect, item.average_pro];
        arr_eff_pro_hold.push(arr_tem);
      }

      let result_adopt = await this.getCluster(arr_eff_pro_adopt, length_adoptTrends);
      let result_trial = await this.getCluster(arr_eff_pro_trial, length_trialTrends);
      let result_asses = await this.getCluster(arr_eff_pro_asses, length_assesTrends);
      let result_hold  = await this.getCluster(arr_eff_pro_hold,  length_holdTrends);

      let indexes_adopt:any;
      let indexes_trial:any;
      let indexes_asess:any;
      let indexes_hold:any;

      if(result_adopt){
         indexes_adopt = result_adopt[0].TrendCluster.indexes;
      }
      if (result_trial.length > 0){
         indexes_trial = result_trial[0].TrendCluster.indexes;
      }

      if (result_asses.length > 0) {
         indexes_asess = result_asses[0].TrendCluster.indexes;
      }

      if(result_hold.length  > 0){
         indexes_hold  = result_hold[0]?.TrendCluster.indexes;
      }

      if(indexes_adopt.length > 0){
        this.adoptTrends = this.adoptTrends.map((item: any, index:number) => ({
          ...item,
          indexed: indexes_adopt[index]
        }));
      }

      if(indexes_trial){
        this.trialTrends = this.trialTrends.map((item: any, index:number) => ({
          ...item,
          indexed: indexes_trial[index]
        }));
      }

      if(indexes_asess){
        this.assesTrends = this.assesTrends.map((item: any, index:number) => ({
          ...item,
          indexed: indexes_asess[index]
        }));
      }

      if(indexes_hold){
        this.holdTrends = this.holdTrends.map((item: any, index:number) => ({
          ...item,
          indexed: indexes_hold[index]
        }));
      }

    });
  }

  public async getCluster(input_data: any[][], number_element: number): Promise<Array<any>> {
    if(number_element > 0){
      return new Promise((resolve, reject) => {
        let default_cluster = 4;
        if( default_cluster > number_element){
          default_cluster = number_element; // rewrite this variable to prevent error of cluster api
        }

        // call api to get indexes
        const TrendClusterGL = gql`
          mutation TrendCluster($input_data: [[Float]], $number_cluster: Int, $max_interation: Int){
            TrendCluster(input_data : $input_data, number_cluster: $number_cluster, max_interation: $max_interation){
              iterations
              k
              indexes
            }
          }
        `;

        this.apollo.mutate({
          mutation: TrendClusterGL,
          variables: {
            input_data: input_data,
            number_cluster: default_cluster,
            max_interation: 15,
          }
        }).subscribe( (data) => {
          // this.notification.showSuccess('trendradar', 'added TrendEvalution')
          // this.router.navigateByUrl('listtrends');

          if (data){
            let arr_data = Array.of(data.data);
            //arr_data = arr_data.TrendCluster;
            resolve(arr_data);
          }
        })
      })
    }else{
      return [];
    }
  }

  // https://stackblitz.com/edit/angular-svg-tooltip?file=src%2Fapp%2Fapp.component.ts
  public mouseEnter($event:any, data:any): void {
    let circle = $event.target as HTMLElement;
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

  public clickCircle(id: any){
    this.router.navigateByUrl(`/listtrends/${id}`);
  }

  /**
   * Add class active, when hover in a trend
   * work follow is get id of element
   * add class active
   * @param $event
   */
  public mouseHighlightEnter($event: any){
    let highlight_class = this.document.getElementsByClassName($event.target.id);
    for (var i = 0; i < highlight_class.length; i++) {
      this.renderer.addClass(highlight_class[i], 'active');
    }
  }

  /**
   * remove class active when you moved out of this element.
   * @param $event
   */
  public mouseHighlightLeave($event:any){
    let highlight_class = this.document.getElementsByClassName($event.target.id);
    for (var i = 0; i < highlight_class.length; i++) {
      this.renderer.removeClass(highlight_class[i], 'active');
    }
  }
}
