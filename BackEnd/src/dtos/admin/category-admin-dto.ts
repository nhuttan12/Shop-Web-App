import { Expose } from "class-transformer";
import { StatusDTO } from "../status-dto.js";

export class CategoryAdminDTO{
  @Expose()
  id!: number;
  
  @Expose()
  name!: string;
  
  @Expose()
  status!: StatusDTO;
}