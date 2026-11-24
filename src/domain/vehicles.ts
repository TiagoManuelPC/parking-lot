export type VehicleType = 'car' | 'disabled' | 'bike' | 'electric' | 'bus' | 'lorry';

export interface VehicleInfo {
  type: VehicleType;
  label: string;
  /** Spaces in its lot (the 2021 capacities). */
  capacity: number;
  icon: string;
}

export const VEHICLE_TYPES: readonly VehicleInfo[] = [
  { type: 'car', label: 'Car', capacity: 100, icon: '🚗' },
  { type: 'disabled', label: 'Disabled', capacity: 20, icon: '♿' },
  { type: 'bike', label: 'Bike', capacity: 20, icon: '🏍️' },
  { type: 'electric', label: 'Electric car', capacity: 15, icon: '⚡' },
  { type: 'bus', label: 'Bus', capacity: 5, icon: '🚌' },
  { type: 'lorry', label: 'Lorry', capacity: 5, icon: '🚚' },
];

export function vehicleInfo(type: VehicleType): VehicleInfo {
  return VEHICLE_TYPES.find((v) => v.type === type)!;
}
