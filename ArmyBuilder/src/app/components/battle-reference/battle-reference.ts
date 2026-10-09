import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, input, Output } from '@angular/core';

import { ArmyList, ArmyUnit } from '../../models/army-unit';

@Component({
  selector: 'app-battle-reference',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './battle-reference.html',
  styleUrl: './battle-reference.css'
})
export class BattleReferenceComponent {
  readonly lists = input<ArmyList[]>([]);
  readonly selectedListId = input('');
  readonly units = input<ArmyUnit[]>([]);
  readonly loading = input(false);

  @Output() listSelected = new EventEmitter<string>();

  readonly selectedList = computed(() =>
    this.lists().find((list) => list.id === this.selectedListId())
  );

  readonly totalPoints = computed(() =>
    this.units().reduce((total, unit) => total + unit.points, 0)
  );

  listPoints(list: ArmyList): number {
    return list.units.reduce((total, unit) => total + unit.points, 0);
  }

  compositionLabel(unit: ArmyUnit): string {
    const min = unit.composition?.minModels;
    const max = unit.composition?.maxModels;

    if (min == null && max == null) {
      return '';
    }
    if (min != null && max != null && min === max) {
      return `${min} ${min === 1 ? 'model' : 'models'}`;
    }
    if (min != null && max != null) {
      return `${min}-${max} models`;
    }
    return min != null ? `At least ${min} models` : `Up to ${max} models`;
  }
}