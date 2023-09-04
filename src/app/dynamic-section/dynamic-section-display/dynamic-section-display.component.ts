import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputData, SectionData } from '../models';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dynamic-section-display',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dynamic-section-display.component.html',
  styleUrls: ['./dynamic-section-display.component.scss'],
})
export class DynamicSectionDisplayComponent {
  @Input() data?: SectionData;

  protected getResult(section: InputData): number {
    return section.reduce((carry, value) => carry + value, 0);
  }
}
