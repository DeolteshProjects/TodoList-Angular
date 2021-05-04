import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faTrash, faPen, faSave } from '@fortawesome/free-solid-svg-icons';
import { ListItem } from '../models/list';

@Component({
    selector: 'task-list',
    templateUrl: './task-list.component.html',
})
export class TaskListComponent {
    @Input() task!: ListItem;
    view_item = true;
    edit = false;
    faTrash = faTrash;
    faPen = faPen;
    faSave = faSave;

    @Output() removeItem = new EventEmitter();

    reverseStatus() {
        this.task.status = !this.task.status;
    };
}