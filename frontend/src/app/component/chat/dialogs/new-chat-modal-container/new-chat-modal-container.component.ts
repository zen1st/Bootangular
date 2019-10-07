import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router'
import {Location} from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NewChatModalComponent } from '../new-chat-modal/new-chat-modal.component';

@Component({
  selector: 'app-new-chat-modal-container',
  templateUrl: './new-chat-modal-container.component.html',
  styleUrls: ['./new-chat-modal-container.component.css']
})
export class NewChatModalContainerComponent implements OnInit, OnDestroy {

  currentDialog: MatDialogRef<any> = null;
  destroy$ = new Subject<any>();

  constructor(matDialog: MatDialog, route: ActivatedRoute, router: Router, private location: Location) {
    route.params.pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        if (this.currentDialog) {
          this.currentDialog.close();
        }

		//console.log(params);
		if(params.action=="new")
		{
			this.currentDialog = matDialog.open(NewChatModalComponent, {
			  width: '1920px',
			  position: {
				top: '10vh'
			  },
			  data: {action : params.action}
			});


			this.currentDialog.afterClosed().subscribe(result => {
			  console.log('dialog closed');
			  this.location.back();
			})
		
		}
		
		/*
		else if (params.action=="edit" || "delete")
		{
			this.currentDialog = matDialog.open(TestTableModalComponent, {
				data: {action : params.action, id: params.id }
			});
		}
		*/
		

      }, () => {}, () => {
          if (this.currentDialog) {
          this.currentDialog.close();
        }
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next('');
  }

}