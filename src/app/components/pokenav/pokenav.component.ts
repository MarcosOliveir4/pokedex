import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pokenav',
  templateUrl: 'pokenav.component.html',
  styleUrls: ['pokenav.component.scss'],
})
export class PokenavComponent {
  public inputValue = '';
  @Input() loading = false;
  @Output() pokeInput = new EventEmitter<string>();

  public buscarItem(): void {
    this.pokeInput.emit(this.inputValue);
  }
}
