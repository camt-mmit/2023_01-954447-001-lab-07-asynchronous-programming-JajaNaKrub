import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDataService } from '../../services/profile-data.service';
import { Profile } from '../../models';
import { ProfileFormComponent } from '../../profile-form/profile-form.component';

@Component({
  selector: 'app-profile-form-page',
  standalone: true,
  templateUrl: './profile-form-page.component.html',
  styleUrls: ['./profile-form-page.component.scss'],
  imports: [CommonModule, ProfileFormComponent],
})
export class ProfileFormPageComponent {
  private readonly profileData = inject(ProfileDataService);

  protected readonly data$ = this.profileData
    .getData()
    .then((value) => value ?? ('undefined' as const));

  protected async save(data: Profile): Promise<void> {
    await this.profileData.setData(data);
  }
}
