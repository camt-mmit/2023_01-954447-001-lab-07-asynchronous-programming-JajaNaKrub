import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { SectionData } from '../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dynamic-section-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-section-form.component.html',
  styleUrls: ['./dynamic-section-form.component.scss'],
})
export class DynamicSectionFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder).nonNullable;
  private readonly detroyRef = inject(DestroyRef);

  @Input() data?: SectionData;
  @Output() readonly dataChange = new EventEmitter<SectionData>();

  protected formGroup!: FormGroup<{
    data: FormArray<FormArray<FormControl<number>>>;
  }>;

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      data: this.fb.array(
        (this.data ?? [[0]]).map((arrs) =>
          this.fb.array(arrs.map((value) => this.fb.control(value))),
        ),
      ),
    });
    this.formGroup.valueChanges
      .pipe(takeUntilDestroyed(this.detroyRef))
      .subscribe(() => {
        this.dataChange.emit(this.formGroup.getRawValue().data);
      });
  }

  protected addSection(): void {
    this.formGroup.controls.data.push(this.fb.array([this.fb.control(0)]));
  }
  protected removeSection(index: number): void {
    this.formGroup.controls.data.removeAt(index);
  }
  protected addInput(formArray: FormArray<FormControl<number>>): void {
    formArray.push(this.fb.control(0));
  }
  protected removeInput(
    formArray: FormArray<FormControl<number>>,
    index: number,
  ): void {
    formArray.removeAt(index);
  }

  protected getResult(formArray: FormArray<FormControl<number>>): number {
    return formArray.controls.reduce(
      (carry, control: FormControl) => carry + control.value,
      0,
    );
  }
}
