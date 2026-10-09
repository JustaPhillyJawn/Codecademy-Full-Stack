export interface ApiFactionRecord {
  name: string;
  faction_type: string;
  unit_count: number;
}

export interface ApiUnitRecord {
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

export interface ApiUnitBulkResponse {
  units: ApiUnitRecord[];
}

export interface ApiUnitComposition {
  min_models?: number | null;
  max_models?: number | null;
}

export interface ApiUnitWeaponGroups {
  ranged?: ApiWeaponRecord[];
  melee?: ApiWeaponRecord[];
}

export interface ApiWeaponRecord {
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

export interface ApiUnitStats {
  M?: string | number | null;
  T?: string | number | null;
  SV?: string | number | null;
  W?: string | number | null;
  LD?: string | number | null;
  OC?: string | number | null;
}
