import { Component, OnInit} from '@angular/core';
import { AdminGuard } from 'app/guard/index';
import { Router } from '@angular/router';
import {
  AuthService,
  UserService
} from 'app/service';
@Component({
  selector: 'app-clean-blog-nav',
  templateUrl: './clean-blog-nav.component.html',
  styleUrls: ['./clean-blog-nav.component.css']
})
export class CleanBlogNavComponent implements OnInit {
	constructor(private aG: AdminGuard, 
	private r : Router,
	private aS : AuthService,
	private uS : UserService) { }

	ngOnInit() {
	}

	logout() {
		this.aS.logout().subscribe(res => {
		  this.r.navigate(['/']);
		});
	}
}