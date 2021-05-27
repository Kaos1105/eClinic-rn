export interface IDM_CHUYENKHOA_ENTITY {
  chuyenkhoA_ID?: string | undefined;
  chuyenkhoA_CODE?: string | undefined;
  chuyenkhoA_TEN?: string | undefined;
  mota?: string | undefined;
  logo?: string | undefined;
  notes?: string | undefined;
  recorD_STATUS?: string | undefined;
  tenanT_ID?: string | undefined;
  totalCount?: number | undefined;
  top?: number | undefined;
  sorting?: string | undefined;
  maxResultCount?: number | undefined;
  skipCount?: number | undefined;
}

export class DM_CHUYENKHOA_ENTITY implements IDM_CHUYENKHOA_ENTITY {
  chuyenkhoA_ID?: string | undefined;
  chuyenkhoA_CODE?: string | undefined;
  chuyenkhoA_TEN?: string | undefined;
  mota?: string | undefined;
  logo?: string | undefined;
  notes?: string | undefined;
  recorD_STATUS?: string | undefined;
  tenanT_ID?: string | undefined;
  totalCount?: number | undefined;
  top?: number | undefined;
  sorting?: string | undefined;
  maxResultCount?: number | undefined;
  skipCount?: number | undefined;

  constructor(data?: IDM_CHUYENKHOA_ENTITY) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}

export interface IPagedResultDtoOfDM_CHUYENKHOA_ENTITY {
  totalCount: number | undefined;
  items: DM_CHUYENKHOA_ENTITY[] | undefined;
}
