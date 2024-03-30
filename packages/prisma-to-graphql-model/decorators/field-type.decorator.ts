import 'reflect-metadata';

import {
  FieldTypeRegistry,
  fieldTypesMetadataKey,
} from 'packages/prisma-to-graphql-model';

export function FieldType(fn: () => any) {
  return function (target: any, key: string) {
    const fieldTypes: FieldTypeRegistry =
      Reflect.getMetadata(fieldTypesMetadataKey, target) || new Map();

    fieldTypes.set(key, { type: fn });

    Reflect.defineMetadata(fieldTypesMetadataKey, fieldTypes, target);
  };
}
