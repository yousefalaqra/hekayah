import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeedingTime, FeedingTimeModel } from '../models/feeding-time';

const BASE_URL = 'http://localhost:3000/feedingTimes'; // Define base URL in a separate config file

@Injectable()
export class FeedingTimeService {
  constructor(private http: HttpClient) {}

  getFeedingTimes() {
    return this.http.get<Array<FeedingTime>>(`${BASE_URL}`);
  }

  createFeedingTime(feedingTime: FeedingTimeModel) {
    return this.http.post<FeedingTime>(`${BASE_URL}`, feedingTime);
  }
}
