import { Component, Input, OnInit } from '@angular/core';
import { FusionNode } from '../../../models/fusion-node';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

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

  constructor() {}

  ngOnInit(): void {
    this.dataSource.data = this.fusionNode.fusionComponents;
  }

  hasChild = (_: number, node: FusionNode) => !!node.fusionComponents?.length;
}
