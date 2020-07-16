import { Component, Input, OnInit } from '@angular/core';
import { FusionNode } from '../../../models/fusion-node';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ViewTreeItemDialogComponent } from '../../components/view-tree-item-dialog/view-tree-item-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'my-list-fusion-tree',
  templateUrl: './fusion-tree.component.html',
  styleUrls: ['./fusion-tree.component.css'],
})
export class FusionTreeComponent implements OnInit {
  @Input('fusionNode') fusionNode: FusionNode;
  treeControl = new NestedTreeControl<FusionNode>(
    (node) => node.fusionComponents,
  );
  dataSource = new MatTreeNestedDataSource<FusionNode>();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource.data = this.fusionNode.fusionComponents;
  }

  viewFusionItem(fusionItem: FusionNode): void {
    this.dialog.open(ViewTreeItemDialogComponent, {
      data: fusionItem,
      width: '400px',
    });
  }

  hasChild = (_: number, node: FusionNode) => !!node.fusionComponents?.length;
}
