export const fieldTypesMetadataKey = Symbol('fieldTypes');

export type FieldTypeRegistry = Map<
  string,
  { type: () => any; isRelation?: boolean; isArray?: boolean }
>;
