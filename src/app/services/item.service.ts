
import { Injectable } from '@angular/core';     // ovo je servis koji ce biti koristen u svim komponentama, jer ga navodimo kao providera u app.module.ts

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument }  from 'angularfire2/firestore'; 
import { Observable } from 'rxjs/Observable';   // za ove dvije linije, vidi ::  https://github.com/angular/angularfire2/blob/master/docs/firestore/collections.md

import { Item } from '../models/Item';          // ovo je samo radi preglednosti, izdvojen item u zaseban file

@Injectable()
export class ItemService {

  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>; 
  itemDoc: AngularFirestoreDocument<Item>;
  

    // primjer konstruktora koji pristupa AngularFirestore bazi imas :
       // https://github.com/angular/angularfire2/blob/master/docs/firestore/documents.md
       // https://github.com/angular/angularfire2/blob/master/docs/firestore/collections.md

    constructor(public afs:AngularFirestore) { 
  
      // version 1 - using valueChanges()
      // this.items = this.afs.collection('items', ref => ref.orderBy('title', 'asc')).valueChanges(); 
      // ovako, linija iznad, valjda dohvatamo podatke iz baze, tj. dohvatamo kolekciju podataka : items
      // valueChanges()
        // What is it? 
          // Returns an Observable of document data. All Snapshot metadata is stripped and 
          // just the method provides only the data.
        // Why would you use it?      ( KAD TI NE TREBA ID )
          // When you just need the object data. 
          // No document metadata is attached which makes it simple to render to a view.        
        // When would you not use it? ( KAD TI TREBA ID )
          // When you need the id of the document to use data manipulation methods. 
          // This method assumes you either are saving the id to the document data or using a "readonly" approach.
    
      // version 2 - using snapshotChanges()
        // What is it? - Returns an Observable of data as a DocumentChangeAction.   
        // Why would you use it? 
          // When you need the document data but also want to keep around metadata. 
          // This metadata provides you the underyling DocumentReference and document id. 
          // Having the document's id around makes it easier to use data manipulation methods. 
          // This method gives you more horsepower with other Angular integrations 
          // such as ngrx, forms, and animations due to the type property. 
          // The type property on each DocumentChangeAction is useful for 
          // ngrx reducers, form states, and animation states.
      
        // When would you not use it?  
          // When you simply need to render data to a view and don't want to do any extra processing.
      
      this.itemsCollection = this.afs.collection('items', ref => ref.orderBy('title','asc'));    // ovako valjda dohvatamo iz baze kolekciju podataka
      // ovako se dohvata ID iz baze
      this.items = this.itemsCollection.snapshotChanges().map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Item;
          data.id = a.payload.doc.id;
          return data;
        });
      });

    }
    

  getItems(){
    return this.items;
  }

  addItem(item: Item){
    this.itemsCollection.add(item);
  }

  deleteItem(item: Item){
    this.itemDoc = this.afs.doc('items/' + item.id);
    this.itemDoc.delete();
  }

  
  updateItem(item: Item){
    this.itemDoc = this.afs.doc('items/' + item.id);
    this.itemDoc.update(item);
  }
  
/*
  updateItem(item: Item){
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.update(item);
  }
  */



}

