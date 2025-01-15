import * as migration_20250115_201743 from './20250115_201743';

export const migrations = [
  {
    up: migration_20250115_201743.up,
    down: migration_20250115_201743.down,
    name: '20250115_201743'
  },
];
