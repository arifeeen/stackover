import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FetchJsonService } from '../fetch-json.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  constructor(private fb: FormBuilder, private fetchService: FetchJsonService, private router: Router) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      fromdate: '',
      todate: '',
      order: '',
      min: '',
      max: '',
      sort: '',
      q: '',
      accepted: '',
      answers: '',
      body: '',
      closed: '',
      migrated: '',
      notice: '',
      nottagged: '',
      tagged: '',
      title: '',
      user: '',
      url: '',
      views: '',
      wiki: ''

    })

  }

  onSearch() {
    // console.log('form value', this.searchForm.value);
    const searchObject = this.filterEmptyFields(this.searchForm.value);
    this.fetchService.getSearchResults(searchObject).subscribe(result => {
      // console.log('final result', result);
      result.total = this.fetchService.totalResults;
      this.router.navigate(['../list'], {state: result});
    });
  }

  filterEmptyFields(data: any): any {  
    let fields = {};
    Object.keys(data).forEach(key =>  data[key] != '' ? fields[key] = data[key] : key);

    return fields;   
}

}
