import { BaseService } from "~/modules/base.service";
import { TOrder } from "./orders.dto";

export class OrdersService extends BaseService {
  constructor() {
    super();
  }

  public getOrders = async () => {
    const orders = await this.db.customerOrder.findMany({
      include: {
        user: true,
        pharmacyRating: true,
      },
    });

    return orders;
  };

  public getOrderById = async (id: number) => {
    const orders = await this.db.customerOrder.findMany();

    return orders;
  };

  public createOrder = async (orderData: TOrder) => {
    const order = await this.db.customerOrder.create({
      data: {
        ...orderData,
      },
      include: {
        pharmacy: true,
        user: true,
      },
    });

    return order;
  };
}
