export interface ArmyUnit {
  id?: string;
  name: string;
  faction: string;
  role: string;
  points: number;
  stats?: UnitStats;
  composition?: UnitComposition;
  invulnerableSave?: string;
  weapons?: UnitWeaponGroups;
  abilities: string[];
  specialRules?: string[];
  keywords?: string[];
  source: string;
}

export interface UnitStats {
  movement?: string;
  toughness?: string;
  save?: string;
  wounds?: string;
  leadership?: string;
  objectiveControl?: string;
}

export interface UnitComposition {
  minModels?: number | null;
  maxModels?: number | null;
}

export interface UnitWeaponGroups {
  ranged: UnitWeapon[];
  melee: UnitWeapon[];
}

export interface UnitWeapon {
  name: string;
  range: string;
  attacks: string;
  skill: string;
  strength: string;
  ap: string;
  damage: string;
  keywords: string;
}

export interface ArmyList {
  id: string;
  name: string;
  units: ArmyUnit[];
}
