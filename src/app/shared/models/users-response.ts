import { User } from './user';
import { Pagination } from './pagination';

export interface UsersResponse {
  users: User[];
  pagination: Pagination;
}
