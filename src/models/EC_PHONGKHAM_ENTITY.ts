export interface IEC_PHONGKHAM_ENTITY {
  phongkhaM_ID?: string | undefined;
  phongkhaM_TENTAT?: string | undefined;
  chuyenkhoA_ID?: string | undefined;
  chuyenkhoA_TEN?: string | undefined;
  phongkhaM_TENDAYDU?: string | undefined;
  khauhieu?: string | undefined;
  bacsy?: string | undefined;
  dienthoaibacsy?: string | undefined;
  gioithieu?: string | undefined;
  dienthoai?: string | undefined;
  hotline?: string | undefined;
  email?: string | undefined;
  website?: string | undefined;
  facebook?: string | undefined;
  diachI_1?: string | undefined;
  diachI_2?: string | undefined;
  diachI_3?: string | undefined;
  hinhdaidien?: string | undefined;
  recorD_STATUS?: string | undefined;
  tenanT_ID?: string | undefined;
  totalCount?: number | undefined;
  top?: number | undefined;
  sorting?: string | undefined;
  maxResultCount?: number | undefined;
  skipCount?: number | undefined;
}

export class EC_PHONGKHAM_ENTITY implements IEC_PHONGKHAM_ENTITY {
  phongkhaM_TENTAT?: string | undefined;
  phongkhaM_ID?: string | undefined;
  chuyenkhoA_ID?: string | undefined;
  chuyenkhoA_TEN?: string | undefined;
  phongkhaM_TENDAYDU?: string | undefined;
  khauhieu?: string | undefined;
  bacsy?: string | undefined;
  dienthoaibacsy?: string | undefined;
  gioithieu?: string | undefined;
  dienthoai?: string | undefined;
  hotline?: string | undefined;
  email?: string | undefined;
  website?: string | undefined;
  facebook?: string | undefined;
  diachI_1?: string | undefined;
  diachI_2?: string | undefined;
  diachI_3?: string | undefined;
  hinhdaidien?: string | undefined;
  recorD_STATUS?: string | undefined;
  tenanT_ID?: string | undefined;
  totalCount?: number | undefined;
  top?: number | undefined;
  sorting?: string | undefined;
  maxResultCount?: number | undefined;
  skipCount?: number | undefined;

  constructor(data?: IEC_PHONGKHAM_ENTITY) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}

export interface IPagedResultDtoOfEC_PHONGKHAM_ENTITY {
  totalCount: number | undefined;
  items: EC_PHONGKHAM_ENTITY[] | undefined;
}
