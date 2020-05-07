import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {KnoraService} from './services/knora.service';
import {ReadResource, ReadValue} from '@knora/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit  {
  @ViewChild('searchTerm', {static: false})
  private searchTerm: ElementRef;
  title = 'test-app';

  searchres: Array<ReadResource> = [];

  resdata: ReadResource = new ReadResource();
  properties: Array<[string, string]> = [];

  constructor(public knoraService: KnoraService) { }

  getResource(iri: string) {
    this.knoraService.getResource(iri).subscribe((resdata: ReadResource) => {
      this.resdata = resdata;
      for (const name in resdata.properties) {
        if (resdata.properties.hasOwnProperty(name)) {
          this.properties.push([name, resdata.properties[name][0].strval]);
        }
      }
    });
  }

  searchEvent(): void {
    const params = {
      file_name: this.searchTerm.nativeElement.value
    };
    this.knoraService.gravsearchQuery('physical_copy_query', params).subscribe((searchres: Array<ReadResource>) => {
      console.log('RESDATA:: ', searchres);
      this.searchres = searchres;
    });
  }

  ngOnInit() {
    this.getResource('http://rdfh.ch/0827/-4TPtUytS3SW1hjUNSQu3Q');
    this.searchEvent();
  }
}

