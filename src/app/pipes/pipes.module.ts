import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PositionPipe } from './position.pipe';

@NgModule({
  declarations: [PositionPipe],
  imports: [CommonModule],
  exports: [PositionPipe],
})
export class PipesModule {}
