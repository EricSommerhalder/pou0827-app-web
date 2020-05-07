import { Injectable } from '@angular/core';
import { SparqlPrep} from '../classes/sparql-prep';

@Injectable({
  providedIn: 'root'
})

export class GravsearchTemplatesService {

  constructor(private sparqlPrep: SparqlPrep) { }

  physical_copy_query(params: {[index: string]: string}): string {
    const result = this.sparqlPrep.compile(`
    PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
    PREFIX pou: <{{ ontology }}/ontology/0827/pou/simple/v2#>
    CONSTRUCT {
      ?physicalCopy knora-api:isMainResource true .
      ?physicalCopy pou:fileName ?fileName .
    } WHERE {
      ?physicalCopy a knora-api:Resource .
      ?physicalCopy a pou:PhysicalCopy .
      ?physicalCopy pou:fileName ?fileName .
      FILTER regex(?fileName, "{{ file_name }}", "i") .
    }
    `, params);
    return result;
  }
}
