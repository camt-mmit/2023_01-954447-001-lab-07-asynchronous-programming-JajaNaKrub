import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionDataService } from '../../services/section-data.service';
import { DynamicSectionDisplayComponent } from '../../dynamic-section-display/dynamic-section-display.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dynamic-section-display-page',
  standalone: true,
  imports: [CommonModule, DynamicSectionDisplayComponent, RouterOutlet],
  templateUrl: './dynamic-section-display-page.component.html',
  styleUrls: ['./dynamic-section-display-page.component.scss'],
})
export class DynamicSectionDisplayPageComponent {
  private dataService = inject(SectionDataService);

  protected readonly data$ = this.dataService
    .getData()
    .then((value) => value ?? ('undefined' as const));
}
