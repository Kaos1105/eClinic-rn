import { PagedResultDto } from './pagedResultDto';

export interface responseResult<T> {
    result: PagedResultDto<T>,
    success: boolean | null,
    error: string | null,
}
