import { getFieldTypeByKey } from '@packages/prisma-to-graphql-model/utils';

export class BaseModel {
  constructor(data: object) {
    this._resolveData(data);
  }

  protected _resolveData(data: object) {
    Object.keys(data).forEach((key) => {
      const fieldInfo = getFieldTypeByKey(this, key);

      if (fieldInfo) {
        if (fieldInfo.isRelation) {
          this._resolveRelation(
            key,
            data[key],
            fieldInfo.type,
            fieldInfo.isArray,
          );
        } else {
          this._resolveField(key, data[key], fieldInfo.type());
        }
      } else {
        this[key] = data[key];
      }
    });
  }

  protected _resolveDateType(key: string, value: string) {
    if (value && typeof value === 'string') {
      this[key] = new Date(value);
    }
  }

  protected _resolveField(key: string, value: any, type: any) {
    if (type === Date) {
      this._resolveDateType(key, value);
    } else {
      this[key] = value;
    }
  }

  protected _resolveRelation(
    key: string,
    value: any,
    type: any,
    isArray: boolean,
  ) {
    if (isArray) {
      this._resolveArrayEntity(key, value, type);
    } else {
      this._resolveObjectEntity(key, value, type);
    }
  }

  protected _resolveArrayEntity(key: string, entities: object[], type: any) {
    const Model = type;
    if (Model) {
      this[key] = entities.map((item) => new Model(item));
    }
  }

  protected _resolveObjectEntity(key: string, entity: object, type: any) {
    const Model = type;
    if (Model) {
      this[key] = new Model(entity);
    }
  }
}
