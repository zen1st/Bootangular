import { Component, OnInit, OnChanges, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'app/model/index';
import { ArticleService, UserService } from 'app/service/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AdminGuard } from 'app/guard/index';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

	private sub: any;
	action: string;
	id: number;
	title;
	subheading;
	currentUser;
	currentArticle;
	form: FormGroup;
	
	constructor(private route: ActivatedRoute, 
	private articleService: ArticleService,
	private userService: UserService,
	private formBuilder: FormBuilder,
	private router: Router,
	private adminGuard: AdminGuard
	) {}

	ngOnInit() {
		
		this.currentUser = this.userService.currentUser;
		
		this.form = this.formBuilder.group({
		  title:[''],
		  content: ['']
		});
	 
		this.sub = this.route.params.subscribe(params => {
			this.action = params['action'];
			this.id = +params['id']; // (+) converts string 'id' to a number
			
			if(this.action == "view" && this.id) {
				this.articleService.getArticle(this.id).subscribe(data => this.getArticleSuccess(data), err => this.failed(err));
				
			}
			else if(this.action=="post"){
				
				if (typeof this.currentUser === 'undefined' || this.currentUser === null) {
					this.router.navigate(['/403']);
				}
				else{
					this.title="Posting a New Article";
				}
			}
			else if(this.action == "edit" && this.id){

				this.userService.getMyInfo().subscribe(res => {
					this.currentUser = res;
					
					if (typeof this.currentUser === 'undefined' || this.currentUser === null) {
						this.router.navigate(['/403']);
					}
					else{
						this.articleService.getArticle(this.id).subscribe(
						data => this.getArticleSuccess(data), 
						err => this.failed(err));
					}
				}, 
				err => {
					this.router.navigate(['/403']);
				});
		
			}
		});
	}
	
	getArticleSuccess(data){
		this.currentUser = this.userService.currentUser;
		this.currentArticle = data;
		this.title = data.title;
		this.subheading = "By " + data.createdBy + " on " + new Date(data.createdAt);
		
		if(this.action == "edit")
		{
			this.form = this.formBuilder.group({
			  title:[data.title],
			  content: [data.content]
			});

		}
	}

	failed(err){
		console.log(err);
		this.router.navigate(['/404']);
	}
	
	onSubmit(){
		if(this.action == "post"){
			this.articleService.postArticle(this.form.value).subscribe(
				suc => {
					//console.log(suc);
					this.router.navigate(['/article/view/'+suc.id]);
				},
				err => {
					console.log(err );
				}
			);
		}
		else if(this.action == "edit"){
			this.articleService.putArticle(this.id, this.form.value).subscribe(
				suc => {
					console.log(suc);
					this.router.navigate(['/article/view/'+suc.id]);
				},
				err => {
					console.log(err );
				}
			);
		}
	}
	
	deleteArticle()
	{
		var r = confirm("Are you sure?");
		if (r == true) {
			this.articleService.deleteArticle(this.id).subscribe(
				suc => {
					console.log(suc);
				},
				err => {
					console.log(err );
					this.router.navigate(['/']);
				}
			);
		} 
		else {
			
		}
	}
	
	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}