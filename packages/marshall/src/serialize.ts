import {BYTE, LEN, SHORT, TSerializer} from "./serializePrimitives";
import {concat} from "./libs/utils";
import {ILongFactory, TSchema, txFields} from "./txSchemas";

// FixMe: currently longfactory does nothing. Maybe we should remove ot Altogether
export const serializerFromSchema = <LONG = string | number>(schema: TSchema, lf?: ILongFactory<LONG>): TSerializer<any> => (obj: any) => {
  let result = Uint8Array.from([]);

  let serializer: TSerializer<any>,
    itemBytes: Uint8Array;

  if (schema.type === 'array') {
    serializer = serializerFromSchema(schema.items, lf);
    itemBytes = concat(...obj.map((item: any) => serializer((item))));
    result = concat(result, SHORT(obj.length), itemBytes);
  }
  else if (schema.type === 'object') {
    let objBytes = Uint8Array.from([])
    schema.schema.forEach(field => {
      serializer = serializerFromSchema(field, lf);
      itemBytes = serializer(obj[field.name]);
      objBytes = concat(objBytes, itemBytes);
    });
    if (schema.withLength) result = concat(result, SHORT(objBytes.length))
    result = concat(result, objBytes)
  }
  else if (schema.type === 'anyOf') {
    const type = obj[schema.discriminatorField || 'type'];
    const typeSchema = schema.items.get(type);
    if (typeSchema == null) {
      throw new Error(`Serializer Error: Unknown anyOf type: ${schema.discriminatorField}.${type}`)
    }
    const typeCode = [...schema.items.values()].findIndex(schema => schema === typeSchema);
    serializer = serializerFromSchema(typeSchema, lf);
    itemBytes = serializer(obj[schema.valueField || 'value']);
    result = concat(result, BYTE(typeCode), itemBytes);
  }
  else if (schema.type === 'primitive' || schema.type === undefined) {
    result = concat(result, schema.toBytes(obj));
  }
  else if (schema.type === 'dataTxField') {
    const keyBytes = txFields.stringField('').toBytes(obj.key);
    const type = obj.type;
    const typeSchema = schema.items.get(type);
    if (typeSchema == null) {
      throw new Error(`Serializer Error: Unknown dataTxField type: ${type}`)
    }
    const typeCode = [...schema.items.values()].findIndex(schema => schema === typeSchema);
    serializer = serializerFromSchema(typeSchema, lf);
    itemBytes = serializer(obj.value);
    result = concat(result, keyBytes, BYTE(typeCode), itemBytes)
  } else {
    throw new Error(`Serializer Error: Unknown schema type: ${schema!.type}`)
  }

  return result
};