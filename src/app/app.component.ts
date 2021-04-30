import { Component } from '@angular/core';
import { faTrash, faPen, faSave } from '@fortawesome/free-solid-svg-icons';

interface ListItem {
  title: string;
  status: boolean;
  edit: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faTrash = faTrash;
  faPen = faPen;
  faSave = faSave;
  title = "Список задач";
  todoList: ListItem[] = [];
  newItem = "";
  view_table = -1;
  

  addItem() {
    console.log(this.newItem);
    if (this.newItem.trim().length > 0) {
      let add = {
        title: this.newItem,
        status: false,
        edit: false,
      } as ListItem;
      this.todoList.unshift(add);
      this.newItem = "";
    }
  };
  reverseStatus(tIndex: number) {
    let item = this.todoList[tIndex];
    item.status = !item.status;
    this.todoList[tIndex] = item;
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
  ngOnInit() {
    this.getFromLocal();
  };
  ngDoCheck() {
    this.saveToLocal();
  }
}
