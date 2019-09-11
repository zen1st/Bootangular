import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewEncapsulation, ViewChild } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {Router, RouterOutlet , ActivationStart  } from '@angular/router'

@Component({
  selector: 'app-based-chat',
  templateUrl: './based-chat.component.html',
  styleUrls: ['./based-chat.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BasedChatComponent implements OnInit {
  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

	@ViewChild(RouterOutlet) outlet: RouterOutlet;
	
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router : Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
		this.router.events.subscribe(e => {
			//if (e instanceof ActivationStart && e.snapshot.outlet === "chats") this.outlet.deactivate();
			if (e instanceof ActivationStart)this.outlet.deactivate();
		});
	
  }
  
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}