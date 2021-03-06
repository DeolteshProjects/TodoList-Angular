import { Component } from '@angular/core';
import { ListItem } from './models/list';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Список задач";
  todoList: ListItem[] = [];
  newItem = "";
  errorMessage = "";

  addItem(newItem: string) {
    this.newItem = newItem;
    this.closeAlert();
    if (this.newItem.trim().length > 0) {
      this.newItem = newItem;
      if (!this.findItem()) {
        let add = {
          title: newItem,
          status: false
        } as ListItem;
        this.todoList.unshift(add);
      } else {
        this.errorMessage = "Задача уже присутствует в списке."
      }
    }
  };

  findItem() {
    let result = this.todoList.filter((row) => row.title == this.newItem);
    return (result.length > 0);
  };

  resortArray() {
    this.todoList.sort((prev, next) => ((prev.status) ? 1 : -1) - ((next.status) ? 1 : -1));
  };

  removeItem(tIndex: number) {
    this.todoList.splice(tIndex, 1);
  };

  saveToLocal() {
    this.resortArray();
    localStorage.setItem('task', JSON.stringify(this.todoList));
  };

  getFromLocal() {
    let data = localStorage.getItem('task') ?? "";
    if (data.length > 0) {
      this.todoList = JSON.parse(data);
    }
  };

  closeAlert() {
    this.errorMessage = "";
  };

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todoList, event.previousIndex, event.currentIndex);
  };

  ngOnInit() {
    this.getFromLocal();
  };

  ngDoCheck() {
    this.saveToLocal();
  }
}
