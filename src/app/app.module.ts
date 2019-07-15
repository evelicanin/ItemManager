import { BrowserModule } from '@angular/platform-browser';           // ovo dobijes po default-u
import { NgModule } from '@angular/core';                            // ovo dobijes po default-u
import { FormsModule } from '@angular/forms';                        // bez ovoga nema rada sa formama

// import { environment } from '../environments/environment';        // ovdje je tvoja FireStore basa podataka
import { environment } from '../environments/environment.prod';      // ovdje je tvoja FireStore basa podataka

import { AngularFireModule } from 'angularfire2';                    // imas na github-u ovo, ovako se radi sa Firestore
import { AngularFirestoreModule } from 'angularfire2/firestore';     // imas na github-u ovo, ovako se radi sa Firestore
// --> i imas taj dio dole u 'imports', sve fino pise na github-u : 
// --> https://github.com/angular/angularfire2/blob/master/docs/install-and-setup.md
// kad dole ispod koristis 'initializeApp' mozes da setujes neko ime svoje 'baze'

import { AppComponent } from './app.component';                      // ovo dobijes po default-u
import { ItemsComponent } from './components/items/items.component'; // ovo si dobio kad si kreirao komponentu 'items'

import { ItemService } from './services/item.service';
// ovo si dobio kad si kreirao service      // service se mora 'rucno' dodati u 'proiders'
// kada se kreira, za razliku od komponenti // koje se dodaju u 'declarations' prilikom kreiranja


import { NavbarComponent } from './components/navbar/navbar.component';
import { AddItemComponent } from './components/add-item/add-item.component';


import { FilterPipe } from './filter.pipe'; // kreirani filter za search
          

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    NavbarComponent,
    AddItemComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'angularfs'), // imports firebase/app needed for everything
    AngularFirestoreModule // imports firebase/firestore, only needed for database features
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
