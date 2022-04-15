/* eslint-disable @typescript-eslint/no-explicit-any */
export const createTable = (pg:any) => {
    pg.schema.hasTable('sessions').then(function(exists: any) {
        if (!exists) {
          return pg.schema.createTable('sessions', function(t:any) {
            t.increments('id').primary();
            t.string('last_harmony', 3);
            t.string('last_octave', 3);
            t.string('last_note', 3);
            t.string('initial', 3);
            t.string('current_key', 50);
            t.string('current_mode', 50);
            t
            .integer('user_id')
            .unsigned()
            .index()
            .references('id')
            .inTable('users')
            .onDelete('SET NULL');
          });
        }
      });

    pg.schema.hasTable('users').then(function(exists: any) {
    if (!exists) {
        return pg.schema.createTable('users', function(t:any) {
        t.increments('id').primary();
        t.string('user_name', 100);
        t.string('email', 100);
        });
    }
    });

  console.log('tables created')
}
