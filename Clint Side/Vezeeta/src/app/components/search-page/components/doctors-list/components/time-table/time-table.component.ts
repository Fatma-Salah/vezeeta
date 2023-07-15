import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {

  @Input() products: any;

  responsiveOptions: any;
  items!: string[];

  ngOnInit(): void {
    this.items = Array.from({ length: 50 }).map((_, i) => `Item #${i}`);
    // this.products = ['haha', 'hahah,', 'hahah', 'hhaha']

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

}
