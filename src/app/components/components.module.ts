import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PokecardModule } from './pokecard/pokecard.module';
import { PokeloadingModule } from './pokeloading/pokeloading.module';

@NgModule({
  imports: [CommonModule, PokecardModule, PokeloadingModule],
  exports: [PokecardModule, PokeloadingModule],
})
export class ComponentModule {}
