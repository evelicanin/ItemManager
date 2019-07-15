import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';  // 'items' komponenta pristupa servisu 'ItemService'

import { Item } from '../../models/Item';

import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

    items: Item[]; // Ovdje cemo da smjestimo ono sto dobijamo iz baze

    editState: boolean = false;
    itemToEdit: Item;

    filteredItemsTitle = '';   // filtering : initialisation of the search bar : title
    filteredItemsDesc  = '';   // filtering : initialisation of the search bar : description

    pdfItemTitle = '';
    pdfItemDescription = '';

    constructor(private itemService:ItemService) { }
  
    // ngOnInit se automatski pokrece kada se 'izvrsi' komponenta
    // dovoljno probati logovati na konsolu da to vidis -> console.log('test');
    // ovdje ispod se koristi metod 'getItems' iz servisa 'ItemService'
    ngOnInit() {
      this.itemService.getItems().subscribe(items => {
        // console.log(items);  // ovo je test da vidim da li sam pristupio bazi
        this.items = items;     // sad imamo niz kojem se moze pristupiti kroz html, tacnije items.component.html
      });
      
    }

    // deleteItem iz componente poziva 'deleteItem' funkciju iz servisa itemService, proslijedjujemo item
    deleteItem(event, item: Item){
      // console.log('clicked');
      // console.log(item);
      this.clearState();
      this.itemService.deleteItem(item);
    }

    // pozivamo 'deleteItem' funkciju iz servisa itemService, proslijedjujemo item
    editItem(event, item: Item){
      this.editState = true;
      this.itemToEdit = item;
    }

    updateItem(item: Item){
      this.itemService.updateItem(item);
      this.clearState();
    }

    clearState(){
      this.editState = false;
      this.itemToEdit = null;
    }

    loopItems(event){

      const doc = new jsPDF();
      doc.setFontSize(36);
      doc.text('I T E M S !', 10, 20); 
      doc.setFontSize(12);
      doc.line(10, 30, 200, 30);
      doc.text('Title', 10, 35); 
      doc.text('Description', 50, 35); 
      doc.line(10, 36, 200, 36);
      console.log('item : ');
      var i = 36;
      this.items.forEach( item => {
         console.log('item : ');
         console.log(item);

         i += 6;
         this.pdfItemTitle = item.title;
         this.pdfItemDescription = item.description;
         doc.text(this.pdfItemTitle, 10, i); 
         doc.text(this.pdfItemDescription, 50, i); 
      });    
      // doc.text('-------------------------------------------------------------------------', 10, i+10); 
      doc.line(10, i+2, 200, i+2);
      doc.save('test.pdf');    
      
    }
  
}
