import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { JWTService } from "~/services";

type TErrorResult = {
  isError: boolean;
  errors:
    | Array<{
        [type: string]: string;
      }>
    | unknown;
};

export class BaseController {
  protected jwtService: JWTService;

  constructor() {
    this.jwtService = new JWTService();
  }

  protected validateRequestBody = async <T extends ClassConstructor<any>>(dto: T, obj: object): Promise<TErrorResult> => {
    const transformedClass = plainToClass(dto, obj);
    const errors = await validate(transformedClass);

    if (errors.length > 0) {
      return {
        isError: true,
        errors: errors.map((err) => ({
          field: err.property,
          errors: err.constraints,
        })),
      };
    }

    return {
      isError: false,
      errors: undefined,
    };
  };

  protected getAuthUser = (headerVal: string) => {
    return this.jwtService.decodeToken(headerVal.split(" ")[1]);
  };
}
