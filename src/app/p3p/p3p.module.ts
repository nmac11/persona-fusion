import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { P3PComponent } from './p3p.component';
import { P3PRoutingModule } from './p3p-routing.module';
import { CompendiumService } from './services/compendium.service';
import { ListComponent } from './components/list/list.component';

@NgModule({
  declarations: [P3PComponent, ListComponent],
  imports: [CommonModule, P3PRoutingModule],
  providers: [CompendiumService],
})
export class P3PModule {}
