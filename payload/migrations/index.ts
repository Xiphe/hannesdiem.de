import * as migration_20250115_201743 from './20250115_201743';
import * as migration_20250121_011808 from './20250121_011808';
import * as migration_20250121_173315 from './20250121_173315';

export const migrations = [
  {
    up: migration_20250115_201743.up,
    down: migration_20250115_201743.down,
    name: '20250115_201743',
  },
  {
    up: migration_20250121_011808.up,
    down: migration_20250121_011808.down,
    name: '20250121_011808',
  },
  {
    up: migration_20250121_173315.up,
    down: migration_20250121_173315.down,
    name: '20250121_173315'
  },
];
