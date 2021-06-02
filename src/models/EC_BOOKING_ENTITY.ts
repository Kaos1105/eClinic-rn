export interface IEC_BOOKING_ENTITY {
  bookinG_ID?: string | undefined;
  ngaybookto?: moment.Moment | undefined;
  ngaybookfrom?: moment.Moment | undefined;
  lydodenkham?: string | undefined;
  bacsykhaM_ID?: string | undefined;
  ghichu?: string | undefined;
  huy?: string | undefined;
  thoigianhuy?: moment.Moment | undefined;
  lydohuy?: string | undefined;
  benhnhaN_CODE?: string | undefined;
  nghenghieP_ID?: string | undefined;
  tinhthanH_ID?: string | undefined;
  benhnhaN_ID?: string | undefined;
  hovaten?: string | undefined;
  gioitinh?: string | undefined;
  diach?: string | undefined;
  quanhuyeN_ID?: string | undefined;
  thoigiantiepnhan?: moment.Moment | undefined;
  ngaysinh?: moment.Moment | undefined;
  dienthoai?: string | undefined;
  email?: string | undefined;
  recorD_STATUS?: string | undefined;
  tenanT_ID?: string | undefined;
  trangthai?: string | undefined;
  tenBacSi?: string | undefined;
  thoiGianDen?: string | undefined;
  thoiGianDi?: string | undefined;
  trangthaI_NAME?: string | undefined;
  top?: number | undefined;
  sorting?: string | undefined;
  maxResultCount?: number | undefined;
  skipCount?: number | undefined;
}

export class EC_BOOKING_ENTITY implements IEC_BOOKING_ENTITY {
  bookinG_ID?: string | undefined;
  ngaybookto?: moment.Moment | undefined;
  ngaybookfrom?: moment.Moment | undefined;
  lydodenkham?: string | undefined;
  bacsykhaM_ID?: string | undefined;
  ghichu?: string | undefined;
  huy?: string | undefined;
  thoigianhuy?: moment.Moment | undefined;
  lydohuy?: string | undefined;
  benhnhaN_CODE?: string | undefined;
  nghenghieP_ID?: string | undefined;
  tinhthanH_ID?: string | undefined;
  benhnhaN_ID?: string | undefined;
  hovaten?: string | undefined;
  gioitinh?: string | undefined;
  diach?: string | undefined;
  quanhuyeN_ID?: string | undefined;
  thoigiantiepnhan?: moment.Moment | undefined;
  ngaysinh?: moment.Moment | undefined;
  dienthoai?: string | undefined;
  email?: string | undefined;
  recorD_STATUS?: string | undefined;
  tenanT_ID?: string | undefined;
  trangthai?: string | undefined;
  tenBacSi?: string | undefined;
  thoiGianDen?: string | undefined;
  thoiGianDi?: string | undefined;
  trangthaI_NAME?: string | undefined;
  top?: number | undefined;
  sorting?: string | undefined;
  maxResultCount?: number | undefined;
  skipCount?: number | undefined;

  constructor(data?: IEC_BOOKING_ENTITY) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}
