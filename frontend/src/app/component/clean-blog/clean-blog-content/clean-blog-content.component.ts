import { Component, OnInit, OnChanges, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'app/model/index';
import { BlogService, UserService } from 'app/service/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AdminGuard } from 'app/guard/index';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-clean-blog-content',
  templateUrl: './clean-blog-content.component.html',
  styleUrls: ['./clean-blog-content.component.css']
})
export class CleanBlogContentComponent implements OnInit {

	private sub: any;
	action: string;
	id: number;
	
	title;
	subheading;
	imgUrl;
	createdBy;
	createdTime;
	currentUser;
	currentBlog;
	form: FormGroup;
	
	blogPreviews;
	
	constructor(
	private titleService: Title,
	private route: ActivatedRoute, 
	private blogService: BlogService,
	private userService: UserService,
	private formBuilder: FormBuilder,
	private router: Router,
	private adminGuard: AdminGuard
	) {}

	ngOnInit() {
		
		this.currentUser = this.userService.currentUser;
		
		this.imgUrl="/assets/startbootstrap-clean-blog-gh-pages/img/home-bg.jpg";
		
		this.form = this.formBuilder.group({
		  title:[''],
		  content: ['']
		});
	 
		this.sub = this.route.params.subscribe(params => {
			this.action = params['action'];
			this.id = +params['id']; // (+) converts string 'id' to a number
			
			if(this.action == "view" && this.id) {
				this.blogService.getBlog(this.id).subscribe(data => this.getBlogSuccess(data), err => this.failed(err));
				
			}
			else if(this.action=="post"){
				
				if (typeof this.currentUser === 'undefined' || this.currentUser === null) {
					this.router.navigate(['/403']);
				}
				else{
					this.titleService.setTitle("Posting a New Article");
					this.title="Posting a New Article";
				}
			}
			else if(this.action == "edit" && this.id){
	
				if (typeof this.currentUser === 'undefined' || this.currentUser === null ) {
					this.router.navigate(['/403']);
				}
				else{
					this.blogService.getBlog(this.id).subscribe(
					data => this.getBlogSuccess(data), 
					err => this.failed(err));
				}
			}
			else
			{
				this.title="Home"
				this.subheading="Welcome!"
				this.imgUrl="/assets/startbootstrap-clean-blog-gh-pages/img/home-bg.jpg";

				this.blogService.getAll().subscribe(
				data => this.getBlogPreviewsSuccess(data), 
				err => this.getBlogPreviewsFailed(err));
			}
		});
	}

	getBlogSuccess(data){
		this.currentBlog = data;
		this.title = data.title;
		//this.subheading = "By " + data.createdBy + " on " + new Date(data.createdAt);
		this.createdBy = data.createdBy;
		this.createdTime = new Date(data.createdAt);
	
		this.titleService.setTitle(this.title + " | " + this.action);

		if(this.action == "edit")
		{
			this.title="Editing : " + this.title;
			
			if(!data.editable)
			{
				this.router.navigate(['/403']);
			}
			
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
	
	getBlogPreviewsSuccess(data){
		this.blogPreviews = data;
	}

	getBlogPreviewsFailed(err){
		console.log(err);
	}
	
	onSubmit(){
		if(this.action == "post"){
			this.blogService.postBlog(this.form.value).subscribe(
				suc => {
					//console.log(suc);
					this.router.navigate(['/blogs/view/'+suc.id]);
				},
				err => {
					console.log(err );
				}
			);
		}
		else if(this.action == "edit"){
			this.blogService.putBlog(this.id, this.form.value).subscribe(
				suc => {
					//console.log(suc);
					this.router.navigate(['/blogs/view/'+suc.id]);
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
			this.blogService.deleteBlog(this.id).subscribe(
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
		//this.sub.unsubscribe();
	}
}
