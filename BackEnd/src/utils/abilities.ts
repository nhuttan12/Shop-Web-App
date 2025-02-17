import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { User } from '../entities/User.js';

// type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';
// type Subjects = 'all' | 'User' | 'Product';

export type AppAbility = ReturnType<typeof createMongoAbility>;

export function defineAbilitiesFor(user: User): AppAbility {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
  if (user.role.name === 'admin') {
    //admin can mange all permissions
    can('manage', 'all');
  }else if(user.role.name==='mod'){
    //mod can manage products and read users
    can('manage', 'Product');
    can('read', 'User');
    //mod cannot delete and update users
    cannot('delete', 'User');
    cannot('update', 'User');
  } else {
    //user can read and update information of the user
    can('read', 'User', { id: user.id });
    can('update', 'User', { id: user.id });

    //user can read information of all products
    can('read', 'Product');
  }

  return build();
}
