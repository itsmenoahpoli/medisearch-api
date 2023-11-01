import { BaseService } from "~/modules/base.service";
import { TUserAddress } from "~/modules/customers/customers.dto";

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

  public addCustomerAddress = async (addressData: TUserAddress) => {
    const address = await this.db.userAddress.create({
      data: {
        ...addressData,
        coords: JSON.stringify(addressData.coords),
      },
    });

    return address;
  };

  public deleteCustomerAddress = async (addressId: number) => {
    const address = await this.db.userAddress.delete({
      where: {
        id: addressId,
      },
    });

    return address;
  };
}
