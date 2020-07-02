import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyListComponent } from './my-list.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditPersonaComponent } from './components/edit-persona/edit-persona.component';
import { ConfirmDeleteDialogComponent } from './components/confirm-delete-dialog/confirm-delete-dialog.component';
import { CreatePersonaComponent } from './components/create-persona/create-persona.component';

@NgModule({
  declarations: [
    MyListComponent,
    EditPersonaComponent,
    ConfirmDeleteDialogComponent,
    CreatePersonaComponent,
  ],
  entryComponents: [ConfirmDeleteDialogComponent, CreatePersonaComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class MyListModule {}
