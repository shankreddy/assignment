import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FolderFilesComponent} from './folder-files/folder-files.component';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {routes} from './app.route';
import {ModalComponent} from './modal/modal.component';
import {SharedService} from './service/shared.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FolderFilesComponent,
    ModalComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        FormsModule
    ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
