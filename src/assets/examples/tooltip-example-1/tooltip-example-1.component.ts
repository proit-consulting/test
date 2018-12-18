import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'example-tooltip-1',
  templateUrl: './tooltip-example-1.component.html',
  styleUrls: ['./tooltip-example-1.component.scss']
})
export class TooltipExample1Component {
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
}
