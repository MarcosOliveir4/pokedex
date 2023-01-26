import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { PokecardComponent } from './pokecard.component';

@NgModule({
  declarations: [PokecardComponent],
  imports: [CommonModule, PipesModule],
  exports: [PokecardComponent],
})
export class PokecardModule {}
