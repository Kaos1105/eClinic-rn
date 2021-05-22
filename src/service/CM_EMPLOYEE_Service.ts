import { responseResult } from './dto/responseResult';
// import { requests } from '../baseAxios';
import { PagedResultDto } from './dto/pagedResultDto';
import { CM_EMPLOYEE_ENTITY } from '../models/CM_EMPLOYEE_ENTITY';
import http from './httpService';

class EmployeeServiceProxy {
  // public async cM_EMPLOYEE_Search(input: CM_EMPLOYEE_ENTITY | null | undefined): Promise<responseResult<CM_EMPLOYEE_ENTITY>> {
  //     //return requests.post('/Employee/CM_EMPLOYEE_Search', { params: input });
  //     return requests.post('/Employee/CM_EMPLOYEE_Search', { params: input });
  // }

  // public async cM_EMPLOYEE_Search(input: CM_EMPLOYEE_ENTITY | null | undefined): Promise<PagedResultDto<CM_EMPLOYEE_ENTITY>> {
  //     let result = await http.post('api/Employee/CM_EMPLOYEE_Search', { params: input });
  //     console.log(result.data.result);
  //     return result.data.result;
  // }

  public async cM_EMPLOYEE_Search(
    input: CM_EMPLOYEE_ENTITY | null | undefined
  ): Promise<responseResult<CM_EMPLOYEE_ENTITY>> {
    let result = await http.post('api/Employee/CM_EMPLOYEE_Search', { params: input });
    console.log(result.data);
    return result.data;
  }
}

export default new EmployeeServiceProxy();
