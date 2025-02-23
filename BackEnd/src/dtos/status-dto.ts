import { Expose } from "class-transformer";

export class StatusDTO {
  @Expose()
  id!: number;
  
  @Expose()
  name!: string;
}