import { Component, OnInit } from '@angular/core';
import {Form, FormGroup, FormBuilder, Validators} from "@angular/forms";
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
// get data from backend
import {Apollo} from "apollo-angular";
import gql from 'graphql-tag';
import {Router, ActivatedRoute} from "@angular/router";
import {NotificationService} from "../../services/notification.service";
import DateTimeFormat = Intl.DateTimeFormat;

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.sass']
})
export class RoadmapComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({});
  events: string[] = [];
  portFolio: any = [];
  listTrends: any;// store all trend to show
  arrayTimline: any[] = [];
  arrayMoths:any[] = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug', 'Sep', 'Oct', 'Nov.', 'Dec.']
  constructor(
    private formBuilder: FormBuilder,
    private notification: NotificationService,
    private apollo: Apollo,
    private router: Router,
  ) {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.form = this.formBuilder.group({
        start: [ '', Validators.required],
        end: [ '', Validators.required],
        type_view: [ 'year', Validators.required]
      }
    )
  }

  ngOnInit(): void {
    this.getListTrends("", "start", "asc", null, null);
  }

  getPortfolioList(): any{
    return new Promise( ((resolve, reject) => {
      this.apollo
      .watchQuery({
        query: gql`
          query getPortfolioEvalution{
            getPortfolioEvalution{
              trendId{
                id
                title
                description
                start
                end
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
        resolve(result);
      });
    }));
  }

  /**
   * Get actually all of trends in the table Trend
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
        end: end
      }
    })
    .valueChanges.subscribe(async (result) => {
      this.listTrends = Array.of(result.data);
      this.listTrends =   this.listTrends[0].getTrends;

      let data = await this.getPortfolioList();
      data = Array.of(data.data);
      data = data[0].getPortfolioEvalution;
      console.log(data)

      this.listTrends = this.listTrends.map((item:any) => ({
        ...item,
        layer: 4, // default for all is not evaluated trend
        unit_timeline_from: 0,
        unit_timeline_to: 0
      }));


      // add unit to show time , with year  or month
      // get the min and max time line
      // add layer for each trend oki
      let minDate:any = this.listTrends[0].start; // it is to day: Thu Aug 12 2021 14:52:24 GMT+0200 (Central European Summer Time)
      let maxDate:any = this.listTrends[0].end; // it is to day: Thu Aug 12 2021 14:52:24 GMT+0200 (Central European Summer Time)

      if(data && this.listTrends){

        for(let trend of this.listTrends){

            minDate = this.CompareDate(minDate, trend.start, 'min');
            maxDate = this.CompareDate(maxDate, trend.end, 'max');

          for (let item of data){
            if(item.trendId.id == trend.id){
              if(item.average_effect > 3.5 && item.average_pro > 30){ // right part 1
                trend.layer = 1;
              }else if(item.average_effect > 3.5 && item.average_pro < 31){ // left part 1
                trend.layer = 2;
              }else if(item.average_effect > 2 && item.average_pro > 70){ // right of part2
                trend.layer = 1;
              }else if(item.average_effect > 2 && item.average_pro > 30 && item.average_pro <= 70){// mittel part 2
                trend.layer = 2;
              }else if(item.average_effect > 2 && item.average_pro < 31){// left part 2
                trend.layer = 3;
              }else if( item.average_effect < 2.1 && item.average_effect > 0 && item.average_pro < 71 && item.average_pro > 0){// left part 3
                trend.layer = 3;
              }else if(item.average_effect < 2.1 && item.average_effect > 0 && item.average_pro > 70){// right part 3
                trend.layer = 3;
              }else{

              }
            }

          }
        }

      }

      // handle list year
      this.arrayTimline = this.handleListYear(minDate, maxDate);
      console.log(minDate)
      console.log(this.arrayTimline)
      console.log(this.listTrends)
    });
  }

  handleWithForTrend(start:any, end:any, listyear:any){
     let total_month = listyear.length * 12;
     let startMonth = new Date(start).getMonth();
     let endMonth = new Date(start).getMonth();
  }

  /**
   * handle min max date and return list of years
   * @param minDate
   * @param maxDate
   * return list of years
   */
  handleListYear(minDate: any, maxDate:any):any{
    let minYear = new Date(minDate).getFullYear();
    let maxYear = new Date(maxDate).getFullYear();
    let listYears:any[] = [];
    if(minYear == maxYear){
      listYears.push(minYear);
    }else{
      for(let item = 0; item <= (maxYear - minYear); item++){
          listYears.push(minYear + item);
      }
    }
    return listYears;
  }

  /**
   * Compare between 2 Dates
   */
  CompareDate(date1:any, date2: any, getMinOrMax: string): any{

      let diffTime = new Date(date2).valueOf() - new Date(date1).valueOf();
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if(getMinOrMax === 'min'){
        if(diffTime > 0 || diffTime == 0){
          return date1;
        }else{
           return date2;
        }
      }

      if(getMinOrMax == 'max'){
        if(diffTime > 0 || diffTime == 0){
          return date2;
        }else{
          return date1;
        }
      }

  }

  filter(valueInput: any) {
    console.log(valueInput.start)
    this.getListTrends("", "start", "asc", new Date(valueInput.start), new Date(valueInput.end));
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
   * go to page trend details with id
   */
  routerOtherPage(id:any){
    this.router.navigateByUrl(`/listtrends/${id}`);
  }

  ShowDate(data:any){
    let d = new Date(data),
      minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
      hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
      ampm = d.getHours() >= 12 ? 'pm' : 'am',
      months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    //return days[d.getDay()]+', '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()+' '+hours+':'+minutes+ampm;
    return months[d.getMonth()] + d.getFullYear();
  }

  // time line show
  caculateWithYearElement(lengthYear:number){
    let num = 12 / lengthYear;
    let stringClass = "col-lg-" + num + " col-md-" + num + " col-sm-" + num + " col-xs-" + num + " ";
    return stringClass;
  }

}
