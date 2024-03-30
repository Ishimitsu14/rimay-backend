import 'reflect-metadata';

import {
  FieldTypeRegistry,
  fieldTypesMetadataKey,
} from 'packages/prisma-to-graphql-model';

export function RelationField(isArray: boolean = false) {
  return function (target: any, key: string) {
    const fieldTypes: FieldTypeRegistry =
      Reflect.getMetadata(fieldTypesMetadataKey, target) || new Map();

    fieldTypes.set(key, {
      type: Reflect.getMetadata('design:type', target, key),
      isRelation: true,
      isArray,
    });

    Reflect.defineMetadata(fieldTypesMetadataKey, fieldTypes, target);
  };
}
