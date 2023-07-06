import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import{Status} from "./status.model";
@Injectable()
export class StaticDataSource {
    private data: Product[];
    private status: Status[];
    constructor() {
        this.data = new Array<Product>(
            new Product(1, new Date(),56 ,"Active" ),
            new Product(2, new Date(), 77,"Active" ),
            new Product(3, new Date(), 44,"Non Active" ),
            new Product(4, new Date(), 45,"Un Known" ),
            new Product(5, new Date(), 90,"Non Active" ));
 
            this.status = new Array<Status>(
                new Status(1,"Active"),
                new Status(2,"Non Active"),
            )
    }
    getData(): Product[] {
        return this.data;
    }

    getStatus(): Status[] {
        return this.status;
    }
}