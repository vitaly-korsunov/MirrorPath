import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { StaticDataSource } from "./static.datasource";
import { Status } from "./status.model";
import { Observable } from "rxjs";
import { RestDataSource } from "./rest.datasource";
@Injectable()
export class Model {
    private products: Product[];
    private statuses: Status[];
    private locator = (p: Product, id?: number) => p.id == id;
    // constructor(private dataSource: StaticDataSource) {
    constructor(private dataSource: RestDataSource) {
        this.products = new Array<Product>();
        this.statuses = new Array<Status>();
        this.dataSource.getData().subscribe(data => this.products = data);
        this.dataSource.getStatus().subscribe(status => this.statuses = status);
        //  this.dataSource.getData().forEach(p => this.products.push(p));
        //   this.dataSource.getStatus().forEach(s => this.statuses.push(s))
    }
    getProducts(): Product[] {
        return this.products;
    }
    getProduct(id: number): Product | undefined {
        return this.products.find(p => this.locator(p, id));
    }
    saveProduct(product: Product) {
        if (product.id == 0 || product.id == null) {
            this.dataSource.saveProduct(product)
                .subscribe(p => this.products.push(p));
        } else {
            this.dataSource.updateProduct(product).subscribe(p => {
                let index = this.products
                    .findIndex(item => this.locator(item, p.id));
                this.products.splice(index, 1, p);
            });
        }
    }
    deleteProduct(id: number) {
        this.dataSource.deleteProduct(id).subscribe(() => {
            let index = this.products.findIndex(p => this.locator(p, id));
            if (index > -1) {
                this.products.splice(index, 1);
            }
        });
    }
    /* private generateID(): number {
        let candidate = 100;
        while (this.getProduct(candidate) != null) {
            candidate++;
        }
        return candidate;
    } */



    getStatus(): Status[] {
        console.log('testStatus')
        return this.statuses;
    }
}
