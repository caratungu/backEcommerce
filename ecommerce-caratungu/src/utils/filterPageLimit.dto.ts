import { IsNumberString, Min, ValidateIf } from "class-validator";

export class FilterPageLimitDto {
    /**
   *Debe indicar la página que se quiere consultar.
   *@example 1
   */
  @IsNumberString()
  @ValidateIf(o => Number(o.numberField) > 0)
  @Min(1)
  page?: number = 1;

  /**
   *Debe indicar la cantidad de elementos que desea ver en cada página.
   *@example 5
   */
  @IsNumberString()
  @ValidateIf(o => Number(o.numberField) > 0)
  @Min(1)
  limit?: number = 5;
}