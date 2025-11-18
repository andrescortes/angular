import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';

interface FeatureNode {
  name: string;
  icon: string;
  url?: string;
  children?: FeatureNode[];
}

@Component({
  selector: 'app-sidenav',
  imports: [
    MatListModule,
    MatIconModule,
    MatDividerModule,
    RouterLink,
    MatTreeModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrls: [ './sidenav.component.css' ]
})
export class SidenavComponent {
  nodeUrls: FeatureNode[] = [
    {
      name: 'Users',
      icon: 'person_4',
      children: [
        {
          name: 'User List',
          url: '/main/users',
          icon: 'list'
        },
        {
          name: 'Add User',
          url: '/main/users/add',
          icon: 'person_add'
        },
        {
          name: 'Edit User',
          url: '/main/users/edit/1',
          icon: 'edit'
        }
      ]
    },
    {
      name: 'Settings',
      icon: 'settings',
      children: [
        {
          name: 'Profile',
          url: '/main/settings/profile',
          icon: 'person'
        },
        {
          name: 'Security',
          url: '/main/settings/security',
          icon: 'security'
        }
      ]
    }
  ];
  childrenAccessor = (node: FeatureNode) => node.children ?? [];

  hasChild = (_: number, node: FeatureNode) => !!node.children && node.children.length > 0;
}
