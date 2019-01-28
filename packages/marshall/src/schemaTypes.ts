export enum DATA_FIELD_TYPE {
  INTEGER = 'integer',
  BOOLEAN = 'boolean',
  STRING = 'string',
  BINARY = 'binary'
}

export type TSchema = TObject | TArray | TAnyOf | TDataTxItem | TPrimitive;

export type TObjectField = [string, TSchema];

export type TObject = {
  type: 'object';
  //Objects sometimes are needed to be serialized with length
  withLength?: boolean;
  optional?: boolean;
  schema: TObjectField[];
}
export type TArray = {
  type: 'array';
  items: TSchema;
  toBytes?: any;
  fromBytes?: any;
}

export type TAnyOf = {
  type: 'anyOf';
  toBytes?: any;
  fromBytes?: any;
  discriminatorField?: string;
  valueField?: string;
  items: Map<string, TSchema>;
}

export type TPrimitive = {
  type?: 'primitive';
  toBytes: (...args: any) => any;
  fromBytes: (bytes: Uint8Array, start?: number) => any;
}

//Data tx field serializes differently. It has type AFTER key field!!!
export type TDataTxItem = {
  type: 'dataTxField';
  items: Map<DATA_FIELD_TYPE, TSchema>;
}

