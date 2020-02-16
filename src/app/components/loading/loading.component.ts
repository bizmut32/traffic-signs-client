import { Component, OnInit, Input } from '@angular/core';
import { animation } from '../animations';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  animations: [animation()]
})
export class LoadingComponent implements OnInit {

  @Input('loading') isLoading: boolean;
  constructor() { }

  ngOnInit() {
  }

}
