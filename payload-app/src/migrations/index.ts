import * as migration_20260629_085539_add_image_column from './20260629_085539_add_image_column';

export const migrations = [
  {
    up: migration_20260629_085539_add_image_column.up,
    down: migration_20260629_085539_add_image_column.down,
    name: '20260629_085539_add_image_column'
  },
];
