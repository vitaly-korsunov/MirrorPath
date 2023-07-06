import { Injectable, Inject, InjectionToken } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "./product.model";
import { Status } from "./status.model";
import {HttpHeaders} from '@angular/common/http'
export const REST_URL = new InjectionToken("rest_url");
@Injectable()
export class RestDataSource {

    httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    })};

    constructor(private http: HttpClient,
        @Inject(REST_URL) private url: string) { }
    getData(): Observable<Product[]> {
        return this.http.get<Product[]>(this.url);  //https://localhost:7288/api/Invoices
      // return this.http.get<Product[]>('https://localhost:7288/api/Invoices'); 
    }
    saveProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(this.url, product);
    }
    updateProduct(product: Product): Observable<Product> {
        console.log(product);
        console.log(`${this.url}/${product.id}`)
        return this.http.put<Product>(`${this.url}/${product.id}`, product);
      
     // return this.http.put<Product>('https://localhost:7288/api/Invoices/'+ product.id, product);
    }
    deleteProduct(id: number): Observable<Product> {
        return this.http.delete<Product>(`${this.url}/${id}`);
    }

    getStatus(): Observable<Status[]> {
      //  return this.http.get<Status[]>(this.url); // https://localhost:7288/api/Invoices
       return this.http.get<Status[]>('https://localhost:7288/api/Statuses'); 
     }
}