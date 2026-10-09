import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, switchMap } from 'rxjs';

import { ArmyUnit, UnitComposition, UnitStats, UnitWeapon, UnitWeaponGroups } from '../models/army-unit';

const fallbackUnits: ArmyUnit[] = [
  { id: 'intercessors', name: 'Intercessors', faction: 'Imperium', role: 'Troops', points: 90, abilities: ['Objective Secured', 'Bolt Rifle', 'Tactical Flexibility'], source: 'Fallback' },
  { id: 'hellblasters', name: 'Hellblasters', faction: 'Imperium', role: 'Elite', points: 115, abilities: ['Plasma Incinerator', 'Target Priority', 'Unyielding'], source: 'Fallback' },
  { id: 'captain-gravis', name: 'Captain in Gravis Armour', faction: 'Imperium', role: 'Character', points: 130, abilities: ['Leader', 'Master of the Legion', 'Storm Bolter'], source: 'Fallback' },
  { id: 'chaos-raptors', name: 'Chaos Raptors', faction: 'Chaos', role: 'Fast Attack', points: 100, abilities: ['Warp-Driven Fury', 'Jump Pack Assault', 'Lethal Ambush'], source: 'Fallback' },
  { id: 'terminators', name: 'Terminator Squad', faction: 'Imperium', role: 'Elite', points: 165, abilities: ['Bulky but Brutal', 'Teleport Strike', 'Crushing Strength'], source: 'Fallback' },
  { id: 'vanguard', name: 'Vanguard Veterans', faction: 'Imperium', role: 'Elite', points: 120, abilities: ['Adeptus Astartes', 'Close Combat Experts', 'Murderous Charge'], source: 'Fallback' },
  { id: 'space-marines', name: 'Space Marines', faction: 'Imperium', role: 'Troops', points: 85, abilities: ['Combat Doctrine', 'Bolt Rounds', 'Relentless Advance'], source: 'Fallback' },
  { id: 'sorcerer', name: 'Chaos Sorcerer', faction: 'Chaos', role: 'Character', points: 110, abilities: ['Tzeentch Magic', 'Warp Fire', 'Blessed by Change'], source: 'Fallback' },
  { id: 'squig-hoppers', name: 'Squig Hoppers', faction: 'Orks', role: 'Fast Attack', points: 75, abilities: ['Wild Charge', 'Squig Bombs', 'Unpredictable'], source: 'Fallback' },
  { id: 'brood-hunters', name: 'Brood Hunters', faction: 'Tyranids', role: 'Troops', points: 95, abilities: ['Feeding Frenzy', 'Swarm', 'Synapse'], source: 'Fallback' }
];

export interface ArmyFaction {
  name: string;
  factionType: string;
  unitCount: number;
}

@Injectable({ providedIn: 'root' })
export class UnitCatalogService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = 'https://openhammer-api-production.up.railway.app';

  loadFactions(): Observable<ArmyFaction[]> {
    return this.http.get<ApiFactionRecord[]>(`${this.apiBaseUrl}/v1/10e/factions`).pipe(
      map((factions) => factions
        .map((faction) => ({
          name: faction.name,
          factionType: faction.faction_type,
          unitCount: faction.unit_count
        }))
        .sort((first, second) => first.name.localeCompare(second.name))),
      catchError(() => of(this.getFallbackFactions()))
    );
  }

  loadUnits(faction: string): Observable<ArmyUnit[]> {
    const url = `${this.apiBaseUrl}/v1/10e/factions/${encodeURIComponent(faction)}/units`;
    return this.http.get<ApiUnitRecord[]>(url, { params: { limit: 500, offset: 0 } }).pipe(
      map((units) => units.map((unit, index) => this.mapUnit(unit, index))),
      catchError(() => of(fallbackUnits.filter((unit) => unit.faction === faction)))
    );
  }

  loadUnitDetails(ids: string[]): Observable<ArmyUnit[]> {
    if (ids.length === 0) {
      return of([]);
    }

    return this.http.get<ApiUnitBulkResponse>(`${this.apiBaseUrl}/v1/10e/bulk/units/by-ids`, {
      params: { ids: ids.join(',') }
    }).pipe(
      map((response) => response.units.map((unit, index) => this.mapUnit(unit, index))),
      catchError(() => of([]))
    );
  }

  private mapUnit(unit: ApiUnitRecord, index: number): ArmyUnit {
    const abilities = (unit.abilities ?? [])
      .map((ability) => {
        const name = typeof ability.name === 'string' ? ability.name : '';
        const description = typeof ability.description === 'string' ? ability.description : '';
        return name ? (description ? `${name}: ${description}` : name) : description;
      })
      .filter(Boolean);
    const specialRules = (unit.special_rules ?? []).filter((rule): rule is string => typeof rule === 'string');
    const keywords = (unit.keywords ?? []).filter((keyword): keyword is string => typeof keyword === 'string');
    const basePoints = typeof unit.points === 'object' && unit.points !== null
      ? Number(unit.points.base ?? 0)
      : Number(unit.points ?? 0);

    return {
      id: String(unit.id ?? unit.name ?? index),
      name: String(unit.name ?? 'Unknown Unit'),
      faction: String(unit.faction ?? unit.faction_type ?? 'Unknown Faction'),
      role: String(unit.role ?? unit.type ?? unit.faction_type ?? 'Unknown Role'),
      points: Number.isFinite(basePoints) ? basePoints : 0,
      stats: this.mapStats(unit.stats),
      composition: this.mapComposition(unit.composition),
      invulnerableSave: unit.invuln_save == null ? undefined : String(unit.invuln_save),
      weapons: this.mapWeapons(unit.weapons),
      abilities,
      specialRules,
      keywords,
      source: 'OpenHammer'
    };
  }

  private mapComposition(composition?: ApiUnitComposition | null): UnitComposition | undefined {
    if (!composition) {
      return undefined;
    }

    return {
      minModels: composition.min_models,
      maxModels: composition.max_models
    };
  }

  private mapWeapons(weapons?: ApiUnitWeaponGroups | null): UnitWeaponGroups {
    const mapWeapon = (weapon: ApiWeaponRecord): UnitWeapon => ({
      name: String(weapon.name ?? 'Unknown weapon'),
      range: String(weapon.Range ?? '-'),
      attacks: String(weapon.A ?? '-'),
      skill: String(weapon.BS ?? weapon.WS ?? '-'),
      strength: String(weapon.S ?? '-'),
      ap: String(weapon.AP ?? '-'),
      damage: String(weapon.D ?? '-'),
      keywords: String(weapon.Keywords ?? '-')
    });

    return {
      ranged: (weapons?.ranged ?? []).map(mapWeapon),
      melee: (weapons?.melee ?? []).map(mapWeapon)
    };
  }

  private mapStats(stats?: ApiUnitStats | null): UnitStats | undefined {
    if (!stats) {
      return undefined;
    }

    const mapped: UnitStats = {
      movement: stats.M == null ? undefined : String(stats.M),
      toughness: stats.T == null ? undefined : String(stats.T),
      save: stats.SV == null ? undefined : String(stats.SV),
      wounds: stats.W == null ? undefined : String(stats.W),
      leadership: stats.LD == null ? undefined : String(stats.LD),
      objectiveControl: stats.OC == null ? undefined : String(stats.OC)
    };

    return Object.values(mapped).some(Boolean) ? mapped : undefined;
  }

  private getFallbackFactions(): ArmyFaction[] {
    const counts = new Map<string, number>();
    for (const unit of fallbackUnits) {
      counts.set(unit.faction, (counts.get(unit.faction) ?? 0) + 1);
    }

    return Array.from(counts, ([name, unitCount]) => ({ name, factionType: name, unitCount }));
  }
}

interface ApiFactionRecord {
  name: string;
  faction_type: string;
  unit_count: number;
}

interface ApiUnitRecord {
  id?: string;
  name?: string;
  faction?: string;
  faction_type?: string;
  type?: string;
  role?: string;
  points?: number | { base?: number };
  stats?: ApiUnitStats;
  composition?: ApiUnitComposition;
  invuln_save?: string | number | null;
  weapons?: ApiUnitWeaponGroups;
  abilities?: Array<{ name?: string; description?: string }>;
  special_rules?: unknown[];
  keywords?: unknown[];
}

interface ApiUnitBulkResponse {
  units: ApiUnitRecord[];
}

interface ApiUnitComposition {
  min_models?: number | null;
  max_models?: number | null;
}

interface ApiUnitWeaponGroups {
  ranged?: ApiWeaponRecord[];
  melee?: ApiWeaponRecord[];
}

interface ApiWeaponRecord {
  name?: string;
  Range?: string | number | null;
  A?: string | number | null;
  BS?: string | number | null;
  WS?: string | number | null;
  S?: string | number | null;
  AP?: string | number | null;
  D?: string | number | null;
  Keywords?: string | null;
}

interface ApiUnitStats {
  M?: string | number | null;
  T?: string | number | null;
  SV?: string | number | null;
  W?: string | number | null;
  LD?: string | number | null;
  OC?: string | number | null;
}