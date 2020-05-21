import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
})
export class AddTransactionComponent implements OnInit {
@Input() previous:any;
  private new_transaction : FormGroup;

  constructor( private formBuilder: FormBuilder,
    public modalController: ModalController,
    public crud_service:CrudService ) {
    this.new_transaction = this.formBuilder.group({
      transaction_type: ['', Validators.required],

      amount: ['', Validators.required],
      description: [''],
    });
  }
 async addTransactionForm(){
   try{
    console.log(this.new_transaction.value)
  var running_balance:any;
    if(this.previous && this.previous['running_balance']){
      running_balance=(this.new_transaction.value.transaction_type=='Credit')?
       this.previous['running_balance']+this.new_transaction.value.amount:this.previous['running_balance']-this.new_transaction.value.amount}
      else{
        running_balance=(this.new_transaction.value.transaction_type=='Credit')?
        this.new_transaction.value.amount:-(this.new_transaction.value.amount)
      }
    var data_of_transaction={...this.new_transaction.value,'creation_time':Date.now(),'running_balance':running_balance}
    await this.crud_service.createItem('transactions',data_of_transaction)
    console.log("Data is successfully added to firestore")
    this.new_transaction.reset()
    this.closeTheForm()
   }
   catch(error){
     console.log("Error while adding data to firebase",error)
   }
  
  }
  closeTheForm(){
this.modalController.dismiss()
  }
  ngOnInit() {}
  ngAfterViewInit(){
    console.log("this.previous",this.previous)
    
  }

}
