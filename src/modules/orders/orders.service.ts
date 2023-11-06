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
        pharmacy: true,
        pharmacyRating: true,
      },
    });

    return orders;
  };

  public getOrderById = async (id: number) => {
    const order = await this.db.customerOrder.findUnique({
      where: {
        id,
      },
    });

    if (!order) return null;

    return order;
  };

  public createOrder = async (orderData: TOrder) => {
    const order = await this.db.customerOrder.create({
      data: {
        ...orderData,
      },
      include: {
        user: true,
        pharmacy: true,
        pharmacyRating: true,
      },
    });

    return order;
  };

  public fulfillOrder = async (id: number) => {
    const order = await this.db.customerOrder.update({
      where: {
        id,
      },
      data: {
        isFulfilled: true,
      },
    });

    return order;
  };
}
