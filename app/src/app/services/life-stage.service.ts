import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LifeStage, LifeStageModel } from '../models/life-stage';

const BASE_URL = 'http://localhost:3000/lifeStages'; // Define base URL in a separate config file

@Injectable()
export class LifeStageService {
  constructor(private http: HttpClient) {}

  getLifeStages() {
    return this.http.get<Array<LifeStage>>(`${BASE_URL}`);
  }

  createLifeStage(lifeStage: LifeStageModel) {
    return this.http.post<LifeStage>(`${BASE_URL}`, lifeStage);
  }
}
