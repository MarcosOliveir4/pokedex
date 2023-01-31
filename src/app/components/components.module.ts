import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PokecardModule } from './pokecard/pokecard.module';
import { PokeloadingModule } from './pokeloading/pokeloading.module';
import { PokenavModule } from './pokenav/pokenav.module';

@NgModule({
  imports: [CommonModule, PokecardModule, PokeloadingModule, PokenavModule],
  exports: [PokecardModule, PokeloadingModule, PokenavModule],
})
export class ComponentModule {}
