import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private afs: AngularFirestore
  ) { }
  getList(collection_name){
    try{
      var self=this;
      self.afs.collection(collection_name).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data:any = a.payload.doc.data() ;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
    }
    catch(error){
      console.log("Erro while getting the list",error)
    }

  }
 async createItem(collection_name,data_to_be_added){
    try{
     await this.afs.collection(collection_name).add(data_to_be_added)
    }
    catch(error){
      console.log("error while creating a doc,",error)
    }
  }
  queryItem(collection_name,order_by_field,direction):Observable<any>{
    try{
     var query=this.afs.collection(collection_name,ref=>ref.orderBy(order_by_field,direction))
    return query.valueChanges()
   
    }
    catch(error){
      console.log("error while querying item",error)
    }
  }
}
