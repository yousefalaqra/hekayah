import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand, Feed } from '../models/feeds';

const BASE_URL = 'http://localhost:3000/feeds'; // Define base URL in a separate config file

@Injectable()
export class FeedService {
  constructor(private http: HttpClient) {}

  getAllFeeds() {
    return this.http.get<Array<Feed>>(`${BASE_URL}`);
  }

  getFeedById(feedId: string) {
    return this.http.get<Feed>(`${BASE_URL}/${feedId}`);
  }

  getFeedsBrands() {
    return this.http.get<Array<Brand>>(`${BASE_URL}/brands`);
  }

  createFeedsBrands(name: string) {
    return this.http.post<Brand>(`${BASE_URL}/brands`, {name: name});
  }
}
