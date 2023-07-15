import { Component, OnInit, Output } from '@angular/core';
import { TokenService } from './Services/Token/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Examination system';

  isStudent: Boolean = false;

  constructor(
    private tokenService: TokenService,
  ) {}
  ngOnInit(): void {
    if (this.tokenService.GetRole() == 'Student') {
      this.isStudent = true;
    } else {
      this.isStudent = false;
    }
  }
}
