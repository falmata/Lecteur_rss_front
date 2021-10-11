import {Component, OnChanges, OnInit} from '@angular/core';
import {FeedService} from './shared/services/feed.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'rssfeedfront';
  RssData: any;
  items: any;
  totalRecord: any;
  page: number = 1;
  channel: any;
  faEdit = faEdit;
  closeResult: string;


  constructor(private service: FeedService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
     this.getFeeds();
     this.getItems();

  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  getFeeds(){
    this.service.getFeed()
      .subscribe(
        data => {
          this.RssData = data;
          return this.RssData;
        },
        error => {
          console.log(error);
        });
  }
  getItems(){
    this.service.getItems()
      .subscribe(
        data => {
          this.items = data;
          return this.items;
        },
        error => {
          console.log(error);
        });
  }
  getdiffDate(endDate){
    return this.service.getDataDiff(endDate);
  }

  updateChannel(){
    console.log('dRSS ata', this.RssData );
    this.service.updateChannel(this.RssData)
      .subscribe(
        response => {
          console.log('response', response);
          window.location.reload();
          this.modalService.dismissAll('fin');
          return response;

        },
        error => {
          console.log(error);
        });
  }

}
