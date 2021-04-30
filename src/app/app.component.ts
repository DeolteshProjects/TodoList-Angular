import { Component } from '@angular/core';

interface ListItem {
  title: string;
  status: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Список задач";
  todoList: ListItem[] = [];
  newItem = "";
  view_table = -1;
  errorMessage = "";


  addItem() {
    console.log(this.newItem);
    if (this.newItem.trim().length > 0) {
      if (!this.findItem()) {
        let add = {
          title: this.newItem,
          status: false
        } as ListItem;
        this.todoList.unshift(add);
        this.newItem = "";
      } else {
        this.errorMessage = "Задача уже присутствует в списке."
      }
    }
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
    console.log(data);
    if (data.length > 0) {
      this.todoList = JSON.parse(data);
    }
    console.log(this.todoList);
  };
  findItem() {
    let result = this.todoList.filter((row) => row.title == this.newItem);
    return (result.length > 0);
  };
  closeAlert() {
    this.errorMessage = "";
  };
  ngOnInit() {
    this.getFromLocal();
  };
  ngDoCheck() {
    this.saveToLocal();
  }
}
