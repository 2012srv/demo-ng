import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  items: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        name: 'Dashboard', link: 'dashboard', icon: 'pi pi-th-large'
      },
      {
        name: 'Billing Details', link: 'billing-details', icon: 'pi pi-file'
      },
      {
        name: 'User Story', link: 'user-story', icon: 'pi pi-inbox'
      },
      {
        name: 'Configuration', icon: 'pi pi-cog', children: [
          {
            name: 'Networks', link: 'configuration/networks', icon: 'pi pi-desktop'
          },
          {
            name: 'Squads', link: 'configuration/squads', icon: 'pi pi-users'
          }
        ]
      },
      {
        name: 'Admin', icon: 'pi pi-cog', children: [
          {
            name: 'Users', link: 'admin/users', icon: 'pi pi-desktop'
          },
          {
            name: 'Roles', link: 'admin/roles', icon: 'pi pi-users'
          }
        ]
      }
    ]
  }

}
