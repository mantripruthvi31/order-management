import { Component, inject, OnInit, signal } from '@angular/core';
import {
  Form,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Order } from '../models/order';
import { CommonModule } from '@angular/common';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { seasonalFruits } from '../data/seasonalFruits';

export type OrderForm = {
  orderNumber: FormControl<string | null>;
  customerName: FormControl<string | null>;
  productName: FormControl<string | null>;
  quantity: FormControl<number | null>;
  price: FormControl<number | null>;
};

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, OrderDetailComponent],
  templateUrl: './master.component.html',
  styleUrl: './master.component.scss',
})
export class MasterComponent implements OnInit {
  private readonly formBuilder = inject(NonNullableFormBuilder);

  public orderForm!: FormGroup<OrderForm>;

  public orders: Order[] = [];
  public orderNumber!: string;
  public fruitsOptions = seasonalFruits;
  public showOrderForm = false;
  public showOrderItemForm = false;

  public ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      orderNumber: this.formBuilder.control<string | null>(null, [
        Validators.required,
      ]),
      customerName: this.formBuilder.control<string | null>(null, [
        Validators.required,
      ]),
      productName: this.formBuilder.control<string | null>(null, [
        Validators.required,
      ]),
      quantity: this.formBuilder.control<number | null>(null, [
        Validators.required,
      ]),
      price: this.formBuilder.control<number | null>(null, [
        Validators.required,
      ]),
    });
  }

  public generateOrderNumber(): string {
    const timestamp = Date.now();
    return `US-${timestamp}`;
  }

  public createOrder(): void {
    this.orderNumber = this.generateOrderNumber();
    this.orderForm.controls.orderNumber.setValue(this.orderNumber);
    this.showOrderForm = true;
  }

  public onProductChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    console.log(target.value);

    if (target.value) {
      this.showOrderItemForm = true;
    }
  }

  public reset(): void {
    this.orderForm.reset();
  }

  public save(): void {
    const order = this.orderForm.value as Order;

    order.productName =
      seasonalFruits.find((fruit) => fruit.id === +order.productName)?.name ??
      '';

    this.orders.push(order);
    this.orderForm.reset();
    this.showOrderForm = false;
  }
}
