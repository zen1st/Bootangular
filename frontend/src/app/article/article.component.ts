import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../model/index';
import { ArticleService, UserService } from '../service/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

	private sub: any;
	id: number;
	currentUser;
	currentArticle;
	subheading;
	form: FormGroup;
	
	constructor(private route: ActivatedRoute, 
	private articleService: ArticleService,
	private userService: UserService,
	private formBuilder: FormBuilder,
	private router: Router
	) {}

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.id = +params['id']; // (+) converts string 'id' to a number
		});

		if(this.id) {
			this.articleService.getArticle(this.id).subscribe(data => this.success(data), err => this.failed(err));
		}
		
		this.currentUser = this.userService.currentUser;
		
		this.form = this.formBuilder.group({
		  title:[''],
		  content: ['']
		});
	}

	success(data){
		this.currentArticle = data;
		this.subheading = "By " + data.createdBy + " on " + new Date(data.createdAt);
		
		console.log(this.form.value);
	}

	failed(err){
		console.log(err);
	}
	
	onSubmit(){
		
		this.articleService.postArticle(this.form.value).subscribe(
			suc => {
				console.log(suc);
				this.router.navigate(['/article/'+suc.id]);
			},
			err => {
				console.log(err );
			}
		);
	}
	
	editArticle()
	{
		//console.log("editing");
	}
	
	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
