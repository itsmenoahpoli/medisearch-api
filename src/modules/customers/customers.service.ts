import { BaseService } from "~/modules/base.service";

export class CustomersService extends BaseService {
  constructor() {
    super();
  }

  public getCustomerAddresses = async (userId: number) => {
    const addresses = await this.db.userAddress.findMany({
      where: {
        userId,
      },
    });

    return addresses;
  };
}
