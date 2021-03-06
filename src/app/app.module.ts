import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FolderFilesComponent} from './folder-files/folder-files.component';
import { HttpClientModule } from '@angular/common/http';
import {ModalComponent} from './modal/modal.component';
import {SharedService} from './service/shared.service';
import {FormsModule} from '@angular/forms';
import {RuleDataComponent} from './rule-data/rule-data.component';

@NgModule({
  declarations: [
    AppComponent,
    FolderFilesComponent,
    ModalComponent,
    RuleDataComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
