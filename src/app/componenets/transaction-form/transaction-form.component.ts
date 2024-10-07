import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css'
})
export class TransactionFormComponent {
  @Input() isVisible = false;
  @Input() transaction: any;
  @Output() cancel = new EventEmitter<void>();
  @Output() submit = new EventEmitter<any>();

  form: FormGroup;

  get title(): string {
    return this.isProcessing() && 'Process Transaction' || 'Add Transaction';
  }

  isProcessing(): boolean {
    return !!this.transaction;
  }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      amount: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      description: ['', [Validators.required]],
      account: ['', [Validators.required]],
      paymentMethod: ['', [Validators.required]],
    });
  }

  ngOnChanges(): void {
    console.log('onchange called')
    if (this.isProcessing()) {
      this.form.disable()
    }

    if (this.transaction) {
      this.form.patchValue({
        amount: this.transaction.amount,
        currency: this.transaction.currency,
        description: this.transaction.description,
        account: this.transaction.account.id,
        paymentMethod: this.transaction.paymentMethod.id,
      });
    }
  }

  onCancel(): void {
    this.form.reset();
    this.form.enable()
    this.cancel.emit();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    }
  }
}
