import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {TextFilterPipe} from './shared/note-text-filter.pipe';
import { WorkerComponent } from './worker/worker.component';
import { ProjectComponent } from './project/project.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { WorkerCompComponent } from './worker/worker-comp/worker-comp.component';

const appRoutes: Routes = [
  {
    path: 'worker',
    component: WorkerComponent
  },
  {
    path: 'project',
    component: ProjectComponent
  },
  {
    path: 'dashboard',
    component: OrganizerComponent
  },
  {
    path: '',
    component: OrganizerComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NotFoundComponent,
    TextFilterPipe,
    WorkerComponent,
    ProjectComponent,
    OrganizerComponent,
    WorkerCompComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  providers: [OrganizerComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
