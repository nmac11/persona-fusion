import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavContentComponent } from './nav-content/nav-content.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NavContentComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [NavContentComponent, ReactiveFormsModule, FormsModule],
})
export class SharedModule {}
