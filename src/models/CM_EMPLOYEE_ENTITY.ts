export interface ICM_EMPLOYEE_ENTITY {
  emP_ID?: string | undefined;
  emP_CODE?: string | undefined;
  emP_NAME?: string | undefined;
  chuyenkhoA_ID?: string | undefined;
  chuyenkhoA_TEN?: string | undefined;
  phongkhaM_TEN?: string | undefined;
  recorD_STATUS?: string | undefined;
  hinhdaidien?: string | undefined;
  notes?: string | undefined;
  starT_TIME?: moment.Moment | undefined;
  enD_TIME?: moment.Moment | undefined;
  totalCount?: number | undefined;
  tenanT_ID?: string | undefined;
  top?: number | undefined;
  sorting?: string | undefined;
  maxResultCount?: number | undefined;
  skipCount?: number | undefined;
}

export class CM_EMPLOYEE_ENTITY implements ICM_EMPLOYEE_ENTITY {
  emP_ID?: string | undefined;
  emP_CODE?: string | undefined;
  emP_NAME?: string | undefined;
  chuyenkhoA_ID?: string | undefined;
  chuyenkhoA_TEN?: string | undefined;
  phongkhaM_TEN?: string | undefined;
  phongkhaM_TENDAYDU?: string | undefined;
  recorD_STATUS?: string | undefined;
  hinhdaidien?: string | undefined;
  notes?: string | undefined;
  starT_TIME?: moment.Moment | undefined;
  enD_TIME?: moment.Moment | undefined;
  totalCount?: number | undefined;
  tenanT_ID?: string | undefined;
  top?: number | undefined;
  sorting?: string | undefined;
  maxResultCount?: number | undefined;
  skipCount?: number | undefined;

  constructor(data?: ICM_EMPLOYEE_ENTITY) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}

export interface IPagedResultDtoOfCM_EMPLOYEE_ENTITY {
  totalCount: number | undefined;
  items: CM_EMPLOYEE_ENTITY[] | undefined;
}
