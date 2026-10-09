import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, input, Output, signal } from '@angular/core';

import { ArmyFaction } from '../../models/army-faction';
import { ArmyUnit } from '../../models/army-unit';

@Component({
  selector: 'app-unit-roster',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './unit-roster.html',
  styleUrl: './unit-roster.css'
})
export class UnitRosterComponent {
  readonly units = input<ArmyUnit[]>([]);
  readonly searchTerm = input('');
  readonly factions = input<ArmyFaction[]>([]);
  readonly selectedFaction = input('');
  readonly loading = input(false);

  @Output() searchChanged = new EventEmitter<string>();
  @Output() addUnit = new EventEmitter<ArmyUnit>();
  @Output() factionSelected = new EventEmitter<string>();

  readonly searchValue = signal('');

  filteredUnits = computed(() => {
    const query = this.searchValue() || this.searchTerm();
    const trimmed = query.trim().toLowerCase();
    const source = this.units();

    if (!trimmed) {
      return source;
    }

    const normalizedQuery = this.normalizeSearchToken(trimmed);

    return source.filter((unit) => {
      const searchText = [
        unit.name,
        unit.faction,
        unit.role,
        unit.abilities.join(' '),
        ...(unit.specialRules ?? []),
        ...(unit.keywords ?? []),
        ...(unit.weapons?.ranged.map((weapon) => `${weapon.name} ${weapon.keywords}`) ?? []),
        ...(unit.weapons?.melee.map((weapon) => `${weapon.name} ${weapon.keywords}`) ?? []),
        unit.source ?? ''
      ]
        .map((value) => this.normalizeSearchToken(value))
        .join(' ');

      return searchText.includes(normalizedQuery);
    });
  });

  onSearchChange(value: string): void {
    this.searchValue.set(value);
    this.searchChanged.emit(value);
  }

  setFactionFilter(faction: string): void {
    this.searchValue.set('');
    this.factionSelected.emit(faction);
  }

  private normalizeSearchToken(value: string): string {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  addToArmy(unit: ArmyUnit): void {
    this.addUnit.emit(unit);
  }
}
