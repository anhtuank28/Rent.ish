import "dotenv/config";
import { describe, it, expect } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../../src/app.js";

describe("Upload API Integration Tests", () => {
  const secret = process.env["JWT_ACCESS_SECRET"] || "rentish-access-secret-dev-only-change-in-production";

  const adminToken = jwt.sign(
    { userId: "admin-test-id", role: "ADMIN" },
    secret,
    { expiresIn: "1h" }
  );

  const customerToken = jwt.sign(
    { userId: "customer-test-id", role: "CUSTOMER" },
    secret,
    { expiresIn: "1h" }
  );

  it("should block unauthenticated upload requests", async () => {
    const res = await request(app)
      .post("/api/upload")
      .attach("images", Buffer.from("fake-image"), "test.jpg");

    expect(res.status).toBe(401);
  });

  it("should block non-admin users from uploading", async () => {
    const res = await request(app)
      .post("/api/upload")
      .set("Authorization", `Bearer ${customerToken}`)
      .attach("images", Buffer.from("fake-image"), "test.jpg");

    expect(res.status).toBe(403);
  });

  it("should reject invalid file types (e.g. text file)", async () => {
    const res = await request(app)
      .post("/api/upload")
      .set("Authorization", `Bearer ${adminToken}`)
      .attach("images", Buffer.from("plain text content"), "document.txt");

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("should upload image successfully for admin", async () => {
    // 1x1 transparent PNG buffer
    const pngBuffer = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      "base64"
    );

    const res = await request(app)
      .post("/api/upload")
      .set("Authorization", `Bearer ${adminToken}`)
      .attach("images", pngBuffer, "test-product.png");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.urls).toBeInstanceOf(Array);
    expect(res.body.data.urls.length).toBe(1);
    expect(typeof res.body.data.urls[0]).toBe("string");
  });
});
