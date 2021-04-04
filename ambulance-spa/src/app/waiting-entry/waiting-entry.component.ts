import { Component, Input, EventEmitter, Output } from '@angular/core';
import { WaitingEntryModel } from '../store/waiting-entry-model/waiting-entry-model.model';

@Component({
  selector: 'app-waiting-entry',
  templateUrl: './waiting-entry.component.html',
  styleUrls: ['./waiting-entry.component.css']
})
export class WaitingEntryComponent {
  @Input()
  public data: WaitingEntryModel;

  @Output()
  public delete = new EventEmitter<WaitingEntryModel>();

}
