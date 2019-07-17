import { Component, OnInit } from '@angular/core';
import { LoginGuard } from 'app/guard/index';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private lG: LoginGuard) { }

  ngOnInit() {
  }

}
