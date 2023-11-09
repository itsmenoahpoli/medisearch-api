import { BaseService } from "~/modules/base.service";
import { TOrder, TOrderCartContentItem } from "./orders.dto";

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
      include: {
        pharmacy: true,
        pharmacyRating: true,
      },
    });

    if (!order) return null;

    let cartContent = order.cartContent as TOrderCartContentItem[];
    let orderMedicines: any = [];

    const getThisOrderMedicines = cartContent.map(async (content, idx) => {
      const medicine = await this.db.medicine.findUnique({
        where: {
          id: content.medicineId,
        },
      });

      return { ...medicine, ...content };
    });

    orderMedicines = await Promise.all(getThisOrderMedicines);

    return { ...order, orderMedicines };
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
