import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'form-add',
    templateUrl: './form-add.component.html',
})
export class FormAddComponent {
    @Input() errorMessage!: string;
    newItem: string = "";
    placeholder: string = "Введите текст задачи";

    @Output('addItem') addItem = new EventEmitter();
    @Output() closeAlert = new EventEmitter();

    addingItem() {
        this.addItem.emit(this.newItem);
        this.newItem = "";
    }
}