import getVoucherByCode from "../../src/repositories/voucherRepository.js"
import createVoucher from "../../src/repositories/voucherRepository.js"
import { createVoucher as newVoucher } from "../../src/services/voucherService.js";

import { faker } from '@faker-js/faker';

import {jest} from '@jest/globals'
import { conflictError } from "../../src/utils/errorUtils.js";

describe("voucherService test suite", () => {
  it("should be always very positive", () => {
    expect("didi").toBe("didi");
  })

  it("should create a new voucher", async() => {
    jest.spyOn(getVoucherByCode, 'getVoucherByCode').mockImplementationOnce(() => {
      return null
    });
    const createVaucherRequest = jest.spyOn(createVoucher, 'createVoucher').mockImplementationOnce(() => {
      return null
    });

    const code = returnCode();
    const discount = returnDiscount(0, 100);

    await newVoucher(code, discount)

    expect(createVaucherRequest).toHaveBeenCalled()
  })

  it("should return conflict", async() => {
    const vaucher = { id: 1, code: "TEST", discount: 10, used: false }
    jest.spyOn(getVoucherByCode, 'getVoucherByCode').mockResolvedValueOnce(vaucher);

    expect(newVoucher(vaucher.code, vaucher.discount)).rejects.toEqual(conflictError("Voucher already exist."))
  })
})

function returnCode() {
  return faker.datatype.uuid()
}

function returnDiscount(max: number, min: number) {
  return Math.random() * (max - min) + min;
}