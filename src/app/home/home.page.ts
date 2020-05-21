import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddTransactionComponent } from '../component/add-transaction/add-transaction.component';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
transactions:any=[];
  constructor(public modalController: ModalController,
    public crud_service:CrudService)  {}
  ngOnInit(){
    var self=this;
    this.crud_service.queryItem('transactions','creation_time','desc')
    .subscribe((transactions_obtained)=>{
      console.log("Transactions obtained ",transactions_obtained)
      if(transactions_obtained && transactions_obtained.length>0){
self.transactions=[...transactions_obtained]
      }
    },(error)=>{
      console.log("Error after obtaining the transactions",error)
    })
  }
  async presentModal() {
    var data
    const modal = await this.modalController.create({
      component: AddTransactionComponent,
      
      componentProps:{previous:(this.transactions && this.transactions.length>0)
        ?this.transactions[0]:[]}
    });
    return await modal.present();
  }

}
