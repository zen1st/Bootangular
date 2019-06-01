import { Component, OnInit } from '@angular/core';
import { LoginGuard } from 'app/guard/index';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private lG: LoginGuard) { }

  ngOnInit() {
  }

}
