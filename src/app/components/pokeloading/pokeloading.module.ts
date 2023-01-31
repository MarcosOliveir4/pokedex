import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { pokeloadingComponent } from './pokeloading.component';

@NgModule({
  declarations: [pokeloadingComponent],
  imports: [CommonModule],
  exports: [pokeloadingComponent],
})
export class PokeloadingModule {}
