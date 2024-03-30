import {
  FieldTypeRegistry,
  fieldTypesMetadataKey,
} from 'packages/prisma-to-graphql-model';

export function getFieldTypeByKey(
  target: any,
  key: string,
): { type: () => any; isRelation?: boolean; isArray?: boolean } | undefined {
  const fieldTypes: FieldTypeRegistry = Reflect.getMetadata(
    fieldTypesMetadataKey,
    target,
  );
  return fieldTypes ? fieldTypes.get(key) : undefined;
}
