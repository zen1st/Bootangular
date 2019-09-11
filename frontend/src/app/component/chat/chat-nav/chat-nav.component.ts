import { Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import {
  UserService,
  AuthService
} from 'app/service';
import { Router } from '@angular/router';
import { AdminGuard } from 'app/guard/index';
import { interval } from 'rxjs/observable/interval';
declare var $: any;

@Component({
  selector: 'app-chat-nav',
  templateUrl: './chat-nav.component.html',
  styleUrls: ['./chat-nav.component.css']
})
export class ChatNavComponent implements OnInit {
	constructor(@Inject(DOCUMENT) private document,
		private userService: UserService,
		private authService: AuthService,
		private adminGuard: AdminGuard,
		private router: Router
	) { }

  
  ngOnInit() {

    var availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
    function split( val ) {
      return val.split( /,\s*/ );
    }
    function extractLast( term ) {
      return split( term ).pop();
    }
 
    $( "#myInput" )
      // don't navigate away from the field on tab when selecting an item
      .on( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).autocomplete( "instance" ).menu.active ) {
          event.preventDefault();
        }
      })
      .autocomplete({
        minLength: 0,
        source: function( request, response ) {
          // delegate back to autocomplete, but extract the last term
          response( $.ui.autocomplete.filter(
            availableTags, extractLast( request.term ) ) );
        },
        focus: function() {
          // prevent value inserted on focus
          return false;
        },
        select: function( event, ui ) {
          var terms = split( this.value );
          // remove the current input
          terms.pop();
          // add the selected item
          terms.push( ui.item.value );
          // add placeholder to get the comma-and-space at the end
          terms.push( "" );
          this.value = terms.join( ", " );
          return false;
        }
      });
  }
  
  logout() {
    this.authService.logout().subscribe(res => {
      this.router.navigate(['/']);
    });
  }

  loggedIn() {
    return !!this.userService.currentUser;
  }

  userName() {
    const user = this.userService.currentUser;
    //return user.firstName + ' ' + user.lastName;
	return user.username;
  }

  refreshToken() {
	this.userService.initUser();
	//var source = interval(1000);
	//var subscribe = source.subscribe(val => console.log(val));
  }
  
	menuClick(){
		
	}
}