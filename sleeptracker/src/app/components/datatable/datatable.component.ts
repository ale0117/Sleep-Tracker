import { CommonModule } from '@angular/common';
import { Component, OnInit, Input} from '@angular/core';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Output, EventEmitter } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
})
export class DatatableComponent implements OnInit {
  @Input() title: string = "";
  @Input() fields: string[] = [];
  @Input() data: string[][] = [];
  @Output() deleteEvent = new EventEmitter<number>();

  constructor(public alertController: AlertController) { 
  }

  ngOnInit() {}

  remove(idx:any) {
    this.alertController.create({
      message: 'This log will disappear from the database forever.',
      header: 'Remove this log?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Remove',
          handler: () => {  
            this.deleteEvent.emit(idx.i);
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });
  }
}

@NgModule({
  declarations: [DatatableComponent],
  imports: [CommonModule, IonicModule],
  exports: [DatatableComponent]
})
export class DatatableModule {}