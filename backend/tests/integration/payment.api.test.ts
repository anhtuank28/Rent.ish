import "dotenv/config";
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

describe("Payment API Integration Tests (PayOS VietQR)", () => {
  it("should block unauthenticated requests to create-qr", async () => {
    const res = await request(app)
      .post("/api/payment/create-qr")
      .send({
        bookingId: "some-uuid",
        amount: 350000,
      });

    expect(res.status).toBe(401);
  });

  it("should return NOT_FOUND for non-existent orderCode", async () => {
    const res = await request(app)
      .get("/api/payment/status/999999999");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe("NOT_FOUND");
    expect(res.body.data.isPaid).toBe(false);
  });

  it("should handle webhook with invalid body gracefully", async () => {
    const res = await request(app)
      .post("/api/payment/webhook")
      .send({});

    // Phải trả về 400 vì thiếu thông tin hoặc orderCode
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});
