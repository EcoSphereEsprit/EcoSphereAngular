import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    ngOnInit() {
        this.model = [
        
            {
                label: 'Notes',
                icon: 'pi pi-th-large',
                items: [
                    {
                        label: 'Notes',
                        icon: 'pi pi-fw pi-comment',
                        items: [
                            {
                                label: 'Prof-Seances',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/seances/list']
                            },
                            {
                                label: 'Admin/Prof-Criteres',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/apps/criteres/list']
                            },
                            {
                                label: 'Etduiant-List',
                                icon: 'pi pi-fw pi-pencil',
                                routerLink: ['/apps/notes/list']
                            }
                        ]
                    },
                    {
                        label: 'Document',
                        icon: 'pi pi-fw pi-comment',
                        items: [
                            {
                                label: 'Prof-Assignments',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/assignment/list']
                            },
                            {
                                label: 'Etudiant-Documents',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/apps/documents/list']
                            }
                        ]
                    }]}]}}
