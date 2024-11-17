import * as migration_20241116_230558 from './20241116_230558';
import * as migration_20241117_001451 from './20241117_001451';

export const migrations = [
  {
    up: migration_20241116_230558.up,
    down: migration_20241116_230558.down,
    name: '20241116_230558',
  },
  {
    up: migration_20241117_001451.up,
    down: migration_20241117_001451.down,
    name: '20241117_001451'
  },
];
