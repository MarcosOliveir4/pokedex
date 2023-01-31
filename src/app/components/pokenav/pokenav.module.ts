import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokenavComponent } from './pokenav.component';

@NgModule({
  declarations: [PokenavComponent],
  imports: [CommonModule, FormsModule],
  exports: [PokenavComponent],
})
export class PokenavModule {}
