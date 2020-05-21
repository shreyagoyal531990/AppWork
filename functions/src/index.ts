import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
exports.runningBalance = functions.firestore
    .document('transactions/{transactionID}')
    .onCreate(async(snap, context) => {
try{
    var total=await db.collection('transaction_value').doc('123').get()
    console.log("tottal data obtained",total)
    if(total){
        console.log("Total obtained",total)
        const newValue:any = snap.data();
        const transaction_type=newValue['transaction_type']
              // access a particular field as you would any JS property
              const amount = transaction_type=='Credit'?total['balance']-newValue['amount']:total['balance']+newValue['amount'];
   
              // perform desired operations ...
                await db.collection('transaction_value').doc('123').set({balance:amount})  
        
                db.collection(`transactions/${context.params.transactionID}`).set({running_balance:amount},{merge:true})
    }
    else{
            // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      const newValue:any = snap.data();
const transaction_type=newValue['transaction_type']
      // access a particular field as you would any JS property
      const amount = transaction_type=='Credit'?-newValue['amount']:newValue['amount'];

      // perform desired operations ...
        await db.collection('transaction_value').doc('123').set({balance:amount})  

        db.collection(`transactions/${context.params.transactionID}`).set({running_balance:amount},{merge:true})
    }

}
catch(error){
    console.log("Error ",error)
}
  
    })
