import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { InvalidComponent } from './invalid/invalid.component';
import { TaggingComponent } from './tagging/tagging.component';
import { ClipboardModule } from 'ngx-clipboard';
import { DetectionComponent } from './detection/detection.component';
import { SimilarityComponent } from './similarity/similarity.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InvalidComponent,
    TaggingComponent,
    DetectionComponent,
    SimilarityComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ClipboardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
