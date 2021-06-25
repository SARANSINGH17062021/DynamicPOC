import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  title = 'app component';

  inputObject = [
    {
      "employee": [
        { "name": "empID", "type": "number", "label": "Employee ID", "validations":[{"validationType":"required", "errorMessage":"required"}, {"validationType":"typemismatch", "errorMessage":"not a valid number"}] },
        { "name": "empName", "type": "text", "label": "Employee Name",  "validations":[{"validationType":"minumumlength", "errorMessage":"min 5 character required"}, {"validationType":"maximumlength", "errorMessage":"maximum 10 character allowed"}]} ,
        { "name": "empDOJ", "type": "date", "label": "Date Of Joining" },
        { "name": "empDeptt", "type": "select", "options": ["HR", "IT", "ACCOUNT", "DEVELOPENT"], "label": "Department" },
        { "name": "empPic", "type": "image", "label": "Employee Picture" }
      ]
    },
    {
      "department": [
        { "name": "depttId", "type": "number", "label": "Department ID" },
        { "name": "depttName", "type": "text", "label": "Department Name" },
        { "name": "empCount", "type": "number", "label": "Employees Count" },
        { "name": "depttHead", "type": "text", "label": "Department Head" }
      ]
    },
    {
      "account": [
        { "name": "accNumber", "type": "number", "label": "Account Number" },
        { "name": "accHolderName", "type": "text", "label": "Account Holder" },
        { "name": "accBank", "type": "select", "options": ["ICICI BANK", "HDFC BANK"], "label": "Bank name" },
        { "name": "accBankBranch", "type": "select", "options": [], "label": "Bank Branch", "dependsOn":"accBank" },
        { "name": "accBankBranchDetails", "type": "select", "options": [], "dependsOn":"accBankBranch", "label":"Branch Details" }
      ]
    }
  ]


  modelArray = ["employee", "department", "account"];
  selectedModelKey = "employee";
  selectedModel = {}

  constructor() { }
  ngOnInit() { }

  updateSelectedModel(event) {
    this.selectedModelKey = event.target.value;
  }

  getModelObject(modelKey) {
    this.inputObject.forEach((model, index) => {
      for (const key in model) {
        if (key == modelKey) {
          this.selectedModel = model[key];
        }
      }
    })

    return this.selectedModel;
  }

}
