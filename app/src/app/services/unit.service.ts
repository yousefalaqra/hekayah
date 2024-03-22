import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Unit, UnitModel } from '../models/unit';

const BASE_URL = 'http://localhost:3000/units'; // Define base URL in a separate config file

@Injectable()
export class UnitService {
  constructor(private http: HttpClient) {}

  getUnits() {
    return this.http.get<Array<Unit>>(`${BASE_URL}`);
  }

  createUnit(unit: UnitModel) {
    return this.http.post<Unit>(`${BASE_URL}`, unit);
  }
}
