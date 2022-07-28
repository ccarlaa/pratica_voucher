import { Request, Response } from "express";
import { createVoucher as createVaucherService, applyVoucher as applyVoucherService} from "../services/voucherService";

async function createVoucher(req: Request, res: Response) {
  const { code, discount } = req.body;
  await createVaucherService(code, discount);

  res.sendStatus(201);
}

async function applyVoucher(req: Request, res: Response) {
  const { code, amount } = req.body;
  const order = await applyVoucherService(code, amount);

  res.send(order);
}

export default {
  applyVoucher,
  createVoucher
}