import {ILongFactory} from "./txSchemas";
import {parse, serialize} from "./index";

export function parseJSON<LONG = string>(str: string, lf?: ILongFactory<LONG>) {
  const safeStr = str.replace(/(".+?"[ \t\n]*:[ \t\n]*)(\d{15,})/gm, '$1"$2"');
  let tx = JSON.parse(safeStr);

  //ToDo: rewrite. Now simply serializes and then parses with long  factory to get right long types
  return lf ? convert(tx, lf) : tx
}

export function stringify(tx: any): string {

}


function convert<T, R = string>(tx: any, toLf: ILongFactory<T>, fromLf?: ILongFactory<R>) {
  return parse(serialize(tx, fromLf), toLf)
}