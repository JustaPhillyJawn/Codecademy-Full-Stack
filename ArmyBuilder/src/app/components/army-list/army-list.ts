import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { ArmyUnit } from '../../models/army-unit';

@Component({
  selector: 'app-army-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './army-list.html',
  styleUrl: './army-list.css'
})
export class ArmyListComponent implements OnChanges {
  @Input() armyList: ArmyUnit[] = [];
  @Input() totalPoints = 0;
  @Input() listName = 'Crusade List 1';
  @Input() listNames: string[] = [];
  @Input() selectedListId = '';
  listNameDraft = '';

  @Output() createList = new EventEmitter<string>();
  @Output() renameList = new EventEmitter<string>();
  @Output() selectList = new EventEmitter<string>();
  @Output() removeUnit = new EventEmitter<number>();
  @Output() deleteList = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listName']) {
      this.listNameDraft = this.listName === 'No active list' ? '' : this.listName;
    }
  }

  createNamedList(): void {
    this.createList.emit(this.listNameDraft.trim());
  }

  renameSelectedList(): void {
    this.renameList.emit(this.listNameDraft);
  }
}
