import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Person } from './Person.model';

@Component({
  selector: 'app-y',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})


export class YComponent implements OnInit ,OnDestroy {
  dtOptions: DataTables.Settings = {};
  persons: Person[] = [];

  saleData = [
    { name: "Mobiles", value: 105000 },
    { name: "Laptop", value: 55000 },
    { name: "AC", value: 15000 },
    { name: "Headset", value: 150000 },
    { name: "Fridge", value: 20000 }
  ];

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.httpClient.get<Person[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe(data => {
        this.persons=data
        // this.persons = (data as any).data;
        console.log("hhhhhhhhhhhhhhhh " +this.persons[1]['title']);

        // Calling the DT trigger to manually render the table
        this.dtTrigger.next(data);
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}


