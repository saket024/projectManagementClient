import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { PickerController } from '@ionic/angular'
import { PickerOptions } from '@ionic/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  employeeName: any;
  employeeEmail: any;
  employeeDesignation: any;
  employeeDetails: any = {}
  taskName: any;
  taskDescription: any;
  taskDeadline: any;
  taskDetails: any = {}

  constructor(private authService: AuthService, private pickerCtrl: PickerController) {

  }
  selectedSegment: string = 'all';
  chosenOne: string;
  ngOnInit() {
  }




  segmentChanged(event: any) {
    // console.log(event.target.value);
    this.selectedSegment = event.target.value
  }
  onSubmit() {
    this.employeeDetails = {
      name: this.employeeName,
      email: this.employeeEmail,
      designation: this.employeeDesignation
    }
    this.authService.createEmployee(this.employeeDetails).subscribe();
  }
  createTask() {
    this.taskDetails = {
      name: this.taskName,
      description: this.taskDescription,
      deadline: this.taskDeadline,
      assignedto: this.chosenOne
    }
    // console.log(this.taskDetails)
    this.authService.createTask(this.taskDetails).subscribe();
  }

  // async showBasicPicker() {
  //   let opts: PickerOptions = {
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel'
  //       },
  //       {
  //         text: 'Done',
  //         role: 'done'
  //       }
  //     ],
  //     columns: [
  //       {
  //         name: 'framework',
  //         options: [
  //           { text: 'Angular', value: 'A' },
  //           { text: 'React', value: 'B' },
  //           { text: 'vue', value: ' C' },
  //         ]
  //       }
  //     ]
  //   };
  //   let picker = await this.pickerCtrl.create(opts);
  //   picker.present();
  //   picker.onDidDismiss().then(async data => {
  //     let col = await picker.getColumn('framework');
  //     console.log(col.options[col.selectedIndex].text)
  //     this.chosenOne = col.options[col.selectedIndex].text
  //   })
  // }
}
// { text: 'Angular', value: 'A' },
            // { text: 'React', value: 'B' },
            // { text: 'vue', value: ' C' },