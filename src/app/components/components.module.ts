import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PokecardModule } from './pokecard/pokecard.module';

@NgModule({
  imports: [CommonModule, PokecardModule],
  exports: [PokecardModule],
})
export class ComponentModule {}
