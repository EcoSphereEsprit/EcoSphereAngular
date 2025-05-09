import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([

        { path: 'criteres', data: { breadcrumb: 'Apps' }, loadChildren: () => import('../../../gestion-notes/CritereEvaluation/critere-evaluation.module').then(m => m.CriteresModule) },
        { path: 'seances', data: { breadcrumb: 'Apps' },loadChildren: () => import('../../../gestion-notes/seance/seance.module').then(m => m.SeanceModule) },
      
        { path: 'notes', data: { breadcrumb: 'Apps' },loadChildren: () => import('../../../gestion-notes/note/note/note.module').then(m => m.NoteModule) },
        { path: 'assignment', data: { breadcrumb: 'Apps' }, loadChildren: () => import('../../../gestion-document/assignment/assignment/assignment.module').then(m => m.AssignmentModule) },
        { path: 'documents', data: { breadcrumb: 'Apps' }, loadChildren: () => import('../../../gestion-document/document/document/document.module').then(m => m.DocumentModule) },

        //{ path: 'calendar', data: { breadcrumb: 'Calendar' }, loadChildren: () => import('./calendar/calendar.app.module').then(m => m.CalendarAppModule) },
        //{ path: 'tasklist', data: { breadcrumb: 'Task List' }, loadChildren: () => import('./tasklist/tasklist.app.module').then(m => m.TaskListAppModule) },
        //{ path: 'chat', data: { breadcrumb: 'Chat' }, loadChildren: () => import('./chat/chat.app.module').then(m => m.ChatAppModule) },
       // { path: 'files', data: { breadcrumb: 'Files' }, loadChildren: () => import('./file/file.app.module').then(m => m.FileAppModule) },
        //{ path: 'mail', data: { breadcrumb: 'Mail' }, loadChildren: () => import('./mail/mail.app.module').then(m => m.MailAppModule) },
       // { path: 'kanban', data: { breadcrumb: 'Kanban' }, loadChildren: () => import('./kanban/kanban.app.module').then(m => m.KanbanAppModule) },
       // { path: 'blog', data: { breadcrumb: 'Blog' }, loadChildren: () => import('./blog/blog.app.module').then(m => m.BlogAppModule) },
       // { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AppsRoutingModule { }
