import { Component } from '@angular/core';
import { SpecializationService } from './../../Services/Entity_Services/specialization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: any;

  responsiveOptions: any;

  constructor(private productService: SpecializationService, private router: Router) { }

  ngOnInit() {
    this.productService.GetAll().subscribe(a => {
      this.products = a.body
      this.products = this.products.filter((a: any) => a.id != 1)

    })

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
  navigate(id: any) {
    alert(id)
    this.router.navigate(
      ['/search'],
      { queryParams: { type: "b", city: 0, reigon: 0, name: "", special: id } }
    );
  }

}

