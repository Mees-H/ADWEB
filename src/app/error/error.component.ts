import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {uniq} from "../uniq.pipe";

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    uniq
  ],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  @Input() public errorMessages: string[] = [];
}
