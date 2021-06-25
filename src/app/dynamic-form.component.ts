import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'dynamic-form',
    templateUrl: './dynamic-form-component.html'
})
export class DynamicFormComponent implements OnInit, OnChanges {

    title = 'dynamic-form-poc';

    @Input() inputObject: any;

    dynamicFormGroup: FormGroup;
    output: any;
    errorMessageForNumber = "";
    errorMessageForText="";


    constructor() { }

    ngOnInit() {
        this.buildFormGroup();
    }

    ngOnChanges() {
        this.buildFormGroup();
    }

    buildFormGroup() {
        let inputControlContainer = {}
        Object.entries(this.inputObject).forEach(([key, obj]) => {
            inputControlContainer[obj.name] = new FormControl('');
        })

        this.dynamicFormGroup = new FormGroup(inputControlContainer);
    }



    submit() {
        let obj = {};
        Object.entries(this.inputObject).forEach((elem, idx) => {
            obj[this.inputObject[idx].name] = this.dynamicFormGroup.get(this.inputObject[idx].name).value;
        });

        this.output = JSON.stringify(obj);
    }


    validate(name: string, inputType: string, validations: []) {
        switch (inputType) {
            case "number":
                this.validateNumber(name, validations);
                break;
            case "text":
                this.validateString(name, validations);
                break
        }
    }

    validateNumber(name: string, validations: []) {
        validations.forEach((val, idx) => {
            switch (val.validationType) {
                case "required":
                    this.errorMessageForNumber = this.dynamicFormGroup.get(name).value == null ? val.errorMessage : "";
                    break;
                case "typemismatch":
                    this.errorMessageForNumber = Number.isNaN(this.dynamicFormGroup.get(name).value) ? val.errorMessage : "";
                    break;
            }
        })
    }

    validateString(name: string, validations: []) {
        validations.forEach((val, idx) => {
            switch (val.validationType) {
                case "minumumlength":
                    this.errorMessageForText = this.dynamicFormGroup.get(name).value.length < 5 ? val.errorMessage : "";
                    break;
                case "maximumlength":
                    this.errorMessageForText = this.dynamicFormGroup.get(name).value.length > 10 ? val.errorMessage : "";
                    break;
            }
        })
    }

    getData(inputValue) {
        let result = [];
        switch (inputValue) {
            case "ICICI BANK":
                result = ["DELHI", "MUMBAI", "CHENNAI", "KOLKATA"];
                break;
            case "HDFC BANK":
                result = ["BANGLORE", "HYDERABAD", "JAIPUR", "INDORE"];
                break;
            case "DELHI":
                result = ["Delhi- address", "Delhi-Pin code"];
                break;
            case "MUMBAI":
                result = ["MUMBAI- address", "MUMBAI-Pin code"];
                break;
            case "CHENNAI":
                result = ["CHENNAI- address", "CHENNAI-Pin code"];
                break;
            case "KOLKATA":
                result = ["KOLKATA- address", "KOLKATA-Pin code"];
                break;
            case "BANGLORE":
                result = ["BANGLORE- address", "BANGLORE-Pin code"];
                break;
            case "HYDERABAD":
                result = ["HYDERABAD- address", "HYDERABAD-Pin code"];
                break;
            case "JAIPUR":
                result = ["JAIPUR- address", "Delhi-Pin code"];
                break;
            case "INDORE":
                result = ["INDORE- address", "INDORE-Pin code"];
                break;
        }
        return result;
    }





}
