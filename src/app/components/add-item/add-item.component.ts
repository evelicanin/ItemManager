import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';  // 'items' komponenta pristupa servisu 'ItemService'

import { Item } from '../../models/Item';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})

export class AddItemComponent implements OnInit {
  item: Item = {
    title: '',
    description:''
  }
  constructor(private itemService: ItemService) { }

  ngOnInit() {
  }

  onSubmit(){
    if(this.item.title != '' && this.item.description != ''){
      this.itemService.addItem(this.item);
      this.item.title = '';           // clearing fields after passing the user inputs
      this.item.description = '';     // clearing fields after passing the user inputs
    }  
  }
}