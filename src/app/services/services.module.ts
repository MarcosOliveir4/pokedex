import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PokeapiService } from './pokeapi.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [PokeapiService],
})
export class ServicesModule {}
