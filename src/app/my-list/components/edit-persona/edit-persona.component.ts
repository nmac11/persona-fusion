import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaStoreService } from '../../../services/persona-store.service';
import { FusionNode } from '../../../models/fusion-node';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'my-list-edit-persona',
  templateUrl: './edit-persona.component.html',
  styleUrls: ['./edit-persona.component.css'],
})
export class EditPersonaComponent implements OnInit {
  fusionNode: FusionNode;

  constructor(
    private personaStoreService: PersonaStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    const saveId = +this.route.snapshot.params['save_id'];
    this.personaStoreService
      .load(saveId)
      .then((fusionNode) => (this.fusionNode = fusionNode));
  }

  async onUpdate(): Promise<void> {
    const success = await this.personaStoreService.update(this.fusionNode);
    this.openSnackBar('Update', success);
    if (success) this.goBackToList();
  }

  confirmDelete(): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: { saveName: this.fusionNode.saveName },
    });
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) this.onDelete();
    });
  }

  private async onDelete(): Promise<void> {
    const success: boolean = await this.personaStoreService.delete(
      this.fusionNode.id,
    );
    this.openSnackBar('Delete', success);
    if (success) this.goBackToList();
  }

  private goBackToList(): void {
    this.router.navigate(['../..', 'my-list'], { relativeTo: this.route });
  }

  private openSnackBar(action: string, success: boolean) {
    const message = success
      ? `SUCCESS: ${action}d '${this.fusionNode.saveName}`
      : `ERROR: Failed to ${action.toLowerCase()} '${this.fusionNode.saveName}`;
    this.snackBar.open(message, 'CLOSE', { duration: 1000 });
  }
}
