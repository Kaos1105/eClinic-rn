import { EC_BOOKING_ENTITY } from 'models/EC_BOOKING_ENTITY';
import { CommonResult } from 'models/CommonResult';
import { InsertResult } from 'models/InsertResult';
import http from './httpService';

class EC_BOOKING_Service {
  public async eC_LichHen_Search(
    input: EC_BOOKING_ENTITY | null | undefined
  ): Promise<EC_BOOKING_ENTITY[]> {
    let result = await http.post('/api/LichHen/EC_LichHen_Search', input);
    return result.data.result;
  }

  public async eC_LichHen_Ins(input: EC_BOOKING_ENTITY | null | undefined): Promise<InsertResult> {
    let result = await http.post('/api/LichHen/EC_LichHen_Ins', input);
    return result.data.result;
  }

  public async eC_LichHen_Upd(input: EC_BOOKING_ENTITY | null | undefined): Promise<InsertResult> {
    let result = await http.post('/api/LichHen/EC_LichHen_Upd', input);
    return result.data.result;
  }

  public async eC_LichHen_ById(id: string | null | undefined): Promise<EC_BOOKING_ENTITY> {
    let params = {
      id: id,
    };
    let result = await http.get('/api/LichHen/EC_LichHen_ById', { params: params });
    return result.data.result;
  }

  public async eC_LichHen_Del(id: string | null | undefined): Promise<CommonResult> {
    let params = {
      id: id,
    };
    let result = await http.delete('/api/LichHen/EC_LichHen_Del', { params: params });
    return result.data.result;
  }
}

export default new EC_BOOKING_Service();
