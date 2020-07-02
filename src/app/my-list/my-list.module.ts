import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyListComponent } from './my-list.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { EditPersonaComponent } from './components/edit-persona/edit-persona.component';
import { ConfirmDeleteDialogComponent } from './components/confirm-delete-dialog/confirm-delete-dialog.component';

@NgModule({
  declarations: [
    MyListComponent,
    EditPersonaComponent,
    ConfirmDeleteDialogComponent,
  ],
  entryComponents: [ConfirmDeleteDialogComponent],
  imports: [CommonModule, MaterialModule, RouterModule, SharedModule],
})
export class MyListModule {}
