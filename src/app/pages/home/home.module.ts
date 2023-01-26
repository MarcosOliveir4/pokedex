import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentModule } from 'src/app/components/components.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, ComponentModule],
})
export class HomeModule {}
