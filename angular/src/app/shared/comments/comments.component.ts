import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.sass']
})
export class CommentsComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({});
  @Output() newComment = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Init Form for trend's voting
   * @return void
   */
  public initForm(){
    this.form = this.formBuilder.group({
      content: ['',
        [
          Validators.required,
          Validators.minLength(1),
        ]
      ],
    });
  }

  addComment(valueInput: any){
    this.newComment.emit(valueInput.content);
  }

}
