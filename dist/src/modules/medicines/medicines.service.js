"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicinesService = void 0;
const base_service_1 = require("../../modules/base.service");
const string_util_1 = require("../../utilities/string.util");
class MedicinesService extends base_service_1.BaseService {
    constructor() {
        super();
    }
    getMedicines = async () => {
        const medicines = await this.db.medicine.findMany({
            orderBy: [{ id: "desc" }],
        });
        return medicines;
    };
    getMedicineById = async (id) => {
        const medicine = await this.db.medicine.findUnique({
            where: { id },
        });
        if (!medicine)
            return null;
        return medicine;
    };
    getMedicineByItemNumber = async (itemNumber) => {
        const medicine = await this.db.medicine.findUnique({
            where: {
                itemNumber,
            },
        });
        if (!medicine)
            return null;
        return medicine;
    };
    updateMedicineById = async (medicineData, id) => {
        const medicine = await this.db.medicine.update({
            where: { id },
            data: {
                ...medicineData,
                nameSlug: (0, string_util_1.slugify)(medicineData.name),
                expirationDate: this.convertDateToISO(medicineData.expirationDate),
                reservationDate: this.convertDateToISO(medicineData.reservationDate),
            },
        });
        return medicine;
    };
    deleteMedicineById = async (id) => {
        const medicine = await this.db.medicine.update({
            where: { id },
            data: {
                deletedAt: this.convertDateToISO(this.dateNow()),
            },
        });
        return medicine;
    };
    forceDeleteMedicineById = async (id) => {
        const medicine = await this.db.medicine.delete({
            where: { id },
        });
        return medicine;
    };
    createMedicine = async (medicineData) => {
        const medicine = await this.db.medicine.create({
            data: {
                ...medicineData,
                nameSlug: (0, string_util_1.slugify)(medicineData.name),
                expirationDate: this.convertDateToISO(medicineData.expirationDate),
                reservationDate: this.convertDateToISO(medicineData.reservationDate),
            },
        });
        return medicine;
    };
}
exports.MedicinesService = MedicinesService;
