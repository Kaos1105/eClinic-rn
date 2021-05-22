export interface IInsertResult {
  id: string | undefined;
  ids: string | undefined;
  result: string | undefined;
  errorDesc: string | undefined;
  attr1: string | undefined;
  attr2: string | undefined;
  attr3: string | undefined;
  attr4: string | undefined;
  attr5: string | undefined;
}

export class InsertResult implements IInsertResult {
  id!: string | undefined;
  ids!: string | undefined;
  result!: string | undefined;
  errorDesc!: string | undefined;
  attr1!: string | undefined;
  attr2!: string | undefined;
  attr3!: string | undefined;
  attr4!: string | undefined;
  attr5!: string | undefined;

  constructor(data?: IInsertResult) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
      }
    }
  }

}
