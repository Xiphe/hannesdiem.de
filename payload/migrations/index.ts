import * as migration_20241116_230558 from './20241116_230558';
import * as migration_20241117_001451 from './20241117_001451';
import * as migration_20241117_023654 from './20241117_023654';
import * as migration_20241228_181349 from './20241228_181349';
import * as migration_20241230_000126 from './20241230_000126';

export const migrations = [
  {
    up: migration_20241116_230558.up,
    down: migration_20241116_230558.down,
    name: '20241116_230558',
  },
  {
    up: migration_20241117_001451.up,
    down: migration_20241117_001451.down,
    name: '20241117_001451',
  },
  {
    up: migration_20241117_023654.up,
    down: migration_20241117_023654.down,
    name: '20241117_023654',
  },
  {
    up: migration_20241228_181349.up,
    down: migration_20241228_181349.down,
    name: '20241228_181349',
  },
  {
    up: migration_20241230_000126.up,
    down: migration_20241230_000126.down,
    name: '20241230_000126'
  },
];
