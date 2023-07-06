import { Component } from "@angular/core";
//import { NgForm } from "@angular/forms";
import { Product } from "../model/product.model";
import { Model } from "../model/repository.model"
import { Message } from "../messages/message.model"
import { MessageService } from "../messages/message.service";
import { MODES, SharedState, StateUpdate } from "./sharedState.service";
//import { FormControl, NgForm } from "@angular/forms";
//import { NgForm, FormControl, Validators } from "@angular/forms"
import { FormControl, NgForm, Validators, FormGroup } from "@angular/forms";
import { Status } from "../model/status.model"
//import { LimitValidator } from "../validation/limit";
import { LimitValidator } from "../validation/limit";


@Component({
    selector: "paForm",
    templateUrl: "form.component.html",
    styleUrls: ["form.component.css"]
})

export class FormComponent {
    temp:any;
    product: Product = new Product();
    status: Status = new Status();
    editing: boolean = false;
    constructor(private model: Model, private state: SharedState,
        private messageService: MessageService) {
        this.state.changes.subscribe((upd) => this.handleStateChange(upd))
        this.messageService.reportMessage(new Message("Creating New Product"));
       
    }
    // this.temp = this.model.getStatus();
    productForm: FormGroup = new FormGroup({
        invoiceDate: new FormControl("", {
            validators: [
                Validators.required,
            ],
            updateOn: "change"
        }),
        invoiceStatus: new FormControl("", { validators: Validators.required }),
        /*  invoiceAmount: new FormControl("", {
             validators: [Validators.required, Validators.pattern("^[0-9]*$")]
         }) */

        invoiceAmount: new FormControl("", {
            validators: [
                Validators.required, Validators.pattern("^[0-9]*$"),
                LimitValidator.Limit(300)
            ]
        }),
    });



    handleStateChange(newState: StateUpdate) {
        this.editing = newState.mode == MODES.EDIT;
        if (this.editing && newState.id) {
            Object.assign(this.product, this.model.getProduct(newState.id)
                ?? new Product());
            this.messageService.reportMessage(
                new Message(`Editing ${'Product'}`));
            //  this.invoiceDateField.setValue(this.product.invoiceDate);
            //  this.invoiceStatusField.setValue(this.product.invoiceStatus);
        } else {
            this.product = new Product();
            this.messageService.reportMessage(new Message("Creating New Product"));
            //  this.invoiceDateField.setValue("");
            //  this.invoiceStatusField.setValue("")
        }

        this.productForm.reset(this.product);
        this.temp = this.model.getStatus()
        console.log(this.temp)
        

       /*  for(let J=0; this.sr.length ;J++){
            console.log(this.sr[J].statusName)
            this.temp.push(this.sr[J].statusName)
        } */
      //  console.log(StrT)

    }
    submitForm() {
        if (this.productForm.valid) {
            Object.assign(this.product, this.productForm.value);
            this.model.saveProduct(this.product);
            this.product = new Product();
            this.productForm.reset();
        }
    }
    resetForm() {
        this.editing = true;
        this.product = new Product();
        this.productForm.reset();
    }
}