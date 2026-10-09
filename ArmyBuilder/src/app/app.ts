import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { ArmyListComponent } from './components/army-list/army-list';
import { BattleReferenceComponent } from './components/battle-reference/battle-reference';
import { UnitRosterComponent } from './components/unit-roster/unit-roster';
import { ArmyList, ArmyUnit } from './models/army-unit';
import { ArmyListService } from './services/army-list.service';
import { AuthService } from './services/auth.service';
import { ArmyFaction, UnitCatalogService } from './services/unit-catalog.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UnitRosterComponent, ArmyListComponent, BattleReferenceComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly armyListService = inject(ArmyListService);
  private readonly authService = inject(AuthService);
  private readonly unitCatalogService = inject(UnitCatalogService);

  protected readonly searchTerm = signal('');
  protected readonly availableUnits = signal<ArmyUnit[]>([]);
  protected readonly factions = signal<ArmyFaction[]>([]);
  protected readonly selectedFaction = signal('');
  protected readonly isLoadingUnits = signal(false);
  protected readonly referenceUnits = signal<ArmyUnit[]>([]);
  protected readonly isLoadingReference = signal(false);
  protected readonly activeView = signal<'builder' | 'reference'>('builder');
  protected readonly armyList = signal<ArmyUnit[]>([]);
  protected readonly armyLists = signal<ArmyList[]>([]);
  protected readonly selectedListId = signal('');
  protected readonly isSignedIn = signal(false);
  protected readonly userLabel = signal('Anonymous Operative');
  protected readonly authError = signal('');
  private referenceLoadId = 0;

  protected readonly selectedListName = computed(() => {
    const active = this.armyLists().find((list) => list.id === this.selectedListId());
    return active?.name ?? 'No active list';
  });

  protected readonly listNames = computed(() => this.armyLists().map((list) => list.name));

  protected readonly totalPoints = computed(() =>
    this.armyList().reduce((total, unit) => total + (unit.points ?? 0), 0)
  );

  async ngOnInit(): Promise<void> {
    await this.authService.initializeUser();
    this.syncAuthState();

    const remoteLists = await this.armyListService.loadUserListsFromFirestore();
    const lists = remoteLists.length > 0 ? remoteLists : this.armyListService.loadLists();

    this.armyLists.set(lists);
    this.armyListService.persistLists(lists);

    const active = this.armyListService.getActiveList();
    this.selectedListId.set(active?.id ?? '');
    this.armyListService.setActiveListId(active?.id ?? '');

    this.loadFactions();
    this.loadArmyList();
  }

  protected async handleAuthToggle(): Promise<void> {
    this.authError.set('');

    if (this.isSignedIn()) {
      await this.authService.signOut();
      this.syncAuthState();
      this.armyLists.set(this.armyListService.loadLists());
      this.loadArmyList();
      return;
    }

    try {
      await this.authService.signIn();
    } catch (error) {
      this.authError.set(this.authService.getSignInErrorMessage(error));
      this.syncAuthState();
      return;
    }

    this.syncAuthState();

    const remoteLists = await this.armyListService.loadUserListsFromFirestore();
    const lists = remoteLists.length > 0 ? remoteLists : this.armyListService.loadLists();
    this.armyLists.set(lists);
    this.armyListService.persistLists(lists);
    const active = this.armyListService.getActiveList();
    this.selectedListId.set(active?.id ?? '');
    this.armyListService.setActiveListId(active?.id ?? '');
    this.loadArmyList();
  }

  protected onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }

  protected showBuilder(): void {
    this.activeView.set('builder');
  }

  protected showBattleReference(): void {
    this.activeView.set('reference');
    this.loadReferenceUnits();
  }

  protected selectReferenceList(listId: string): void {
    const selected = this.armyLists().find((list) => list.id === listId);
    if (!selected) {
      return;
    }

    this.selectList(selected.name);
    this.loadReferenceUnits();
  }

  protected loadFactionUnits(faction: string): void {
    if (this.selectedFaction() === faction) {
      this.selectedFaction.set('');
      this.availableUnits.set([]);
      this.isLoadingUnits.set(false);
      return;
    }

    this.selectedFaction.set(faction);
    this.availableUnits.set([]);
    this.isLoadingUnits.set(true);
    this.unitCatalogService.loadUnits(faction).subscribe((units) => {
      if (this.selectedFaction() !== faction) {
        return;
      }

      this.availableUnits.set(units);
      this.isLoadingUnits.set(false);
    });
  }

  protected addToArmy(unit: ArmyUnit): void {
    this.armyListService.addUnitToList(this.selectedListId(), unit);
    this.loadArmyList();
  }

  protected createNewList(name: string): void {
    const created = this.armyListService.createList(name);
    this.selectedListId.set(created.id);
    this.armyLists.set(this.armyListService.loadLists());
    this.loadArmyList();
  }

  protected renameSelectedList(name: string): void {
    const trimmed = name.trim();
    if (!trimmed) {
      return;
    }

    this.armyListService.renameList(this.selectedListId(), trimmed);
    this.armyLists.set(this.armyListService.loadLists());
    this.loadArmyList();
  }

  protected selectList(listName: string): void {
    const selected = this.armyLists().find((list) => list.name === listName);
    if (!selected) {
      return;
    }

    this.selectedListId.set(selected.id);
    this.armyListService.setActiveListId(selected.id);
    this.loadArmyList();
  }

  protected removeUnitFromList(index: number): void {
    this.armyListService.removeUnitFromList(this.selectedListId(), index);
    this.loadArmyList();
  }

  protected deleteSelectedList(): void {
    const currentId = this.selectedListId();
    if (!currentId) {
      return;
    }

    const remaining = this.armyListService.deleteList(currentId);
    this.armyLists.set(remaining);

    if (remaining.length === 0) {
      this.selectedListId.set('');
      this.armyListService.setActiveListId('');
      this.armyList.set([]);
      return;
    }

    const nextActive = remaining[0];
    this.selectedListId.set(nextActive.id);
    this.armyListService.setActiveListId(nextActive.id);
    this.loadArmyList();
  }

  private syncAuthState(): void {
    this.isSignedIn.set(this.authService.isAuthenticated());
    this.userLabel.set(this.authService.getDisplayUserLabel());
  }

  private loadFactions(): void {
    this.unitCatalogService.loadFactions().subscribe((factions) => {
      this.factions.set(factions);
    });
  }

  private loadArmyList(): void {
    const current = this.armyListService.getActiveList();
    this.armyList.set(current?.units ?? []);
    this.armyLists.set(this.armyListService.loadLists());
  }

  private loadReferenceUnits(): void {
    const savedUnits = this.armyLists().find((list) => list.id === this.selectedListId())?.units ?? [];
    const unitIds = Array.from(new Set(savedUnits.map((unit) => unit.id).filter((id): id is string => Boolean(id))));
    const requestId = ++this.referenceLoadId;

    if (unitIds.length === 0) {
      this.referenceUnits.set(savedUnits);
      this.isLoadingReference.set(false);
      return;
    }

    this.isLoadingReference.set(true);
    this.unitCatalogService.loadUnitDetails(unitIds).subscribe((details) => {
      if (requestId !== this.referenceLoadId) {
        return;
      }

      const detailsById = new Map(details.map((unit): [string, ArmyUnit] => [unit.id ?? '', unit]));
      this.referenceUnits.set(savedUnits.map((unit) => ({
        ...unit,
        ...(detailsById.get(unit.id ?? '') ?? {})
      })));
      this.isLoadingReference.set(false);
    });
  }
}
