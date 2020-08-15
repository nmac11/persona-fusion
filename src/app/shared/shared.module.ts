import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PersonaInfoComponent } from './persona-info/persona-info.component';
import { MaterialModule } from '../material/material.module';
import { InputDebouncerDirective } from './input-debouncer.directive';
import { ChangeDebouncerDirective } from './change-debouncer.directive';
import { SkillsDialogComponent } from './skills-dialog/skills-dialog.component';
import { FusionItemComponent } from './fusion-item/fusion-item.component';
import { DialogAllSkillsListComponent } from './skills-dialog/dialog-all-skills-list/dialog-all-skills-list.component';
import { DialogLearnedSkillsListComponent } from './skills-dialog/dialog-learned-skills-list/dialog-learned-skills-list.component';
import { ListDialogComponent } from './list-dialog/list-dialog.component';
import { DialogPersonaListComponent } from './dialog-persona-list/dialog-persona-list.component';
import { DialogSavedListComponent } from './dialog-saved-list/dialog-saved-list.component';
import { FusionPreviewBottomSheetComponent } from './fusion-preview-bottom-sheet/fusion-preview-bottom-sheet.component';
import { RouterModule } from '@angular/router';
import { PersonaPreviewBottomSheetComponent } from './persona-preview-bottom-sheet/persona-preview-bottom-sheet.component';
import { GameContainerComponent } from './game-container/game-container.component';

@NgModule({
  declarations: [
    PersonaInfoComponent,
    SkillsDialogComponent,
    FusionItemComponent,
    InputDebouncerDirective,
    ChangeDebouncerDirective,
    DialogAllSkillsListComponent,
    DialogLearnedSkillsListComponent,
    ListDialogComponent,
    DialogPersonaListComponent,
    DialogSavedListComponent,
    FusionPreviewBottomSheetComponent,
    PersonaPreviewBottomSheetComponent,
    GameContainerComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    DragDropModule,
    RouterModule,
  ],
  exports: [
    PersonaInfoComponent,
    FusionItemComponent,
    InputDebouncerDirective,
    ChangeDebouncerDirective,
    DialogPersonaListComponent,
    DialogSavedListComponent,
  ],
})
export class SharedModule {}
