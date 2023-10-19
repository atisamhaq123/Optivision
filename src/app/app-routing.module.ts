import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvalidComponent } from './invalid/invalid.component';
import { TaggingComponent } from './tagging/tagging.component';
import { DetectionComponent } from './detection/detection.component';
import { SimilarityComponent } from './similarity/similarity.component';
import { HomeComponent } from './home/home.component';
SimilarityComponent
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'Tagging', component: TaggingComponent },
  { path: 'Detection', component: DetectionComponent },
  { path: 'Contact', component: SimilarityComponent },
  { path: '**', component: InvalidComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
