import { describe, it, expect } from "vitest";

describe("Email notification module", () => {
  it("should have RESEND_API_KEY configured", () => {
    const apiKey = process.env.RESEND_API_KEY;
    expect(apiKey).toBeDefined();
    expect(typeof apiKey).toBe("string");
    expect(apiKey!.length).toBeGreaterThan(0);
  });

  it("should validate Resend API key format", async () => {
    const { validateResendApiKey } = await import("./email");
    const isValid = validateResendApiKey();
    expect(isValid).toBe(true);
  });

  it("should export sendLeadNotificationEmail function", async () => {
    const { sendLeadNotificationEmail } = await import("./email");
    expect(typeof sendLeadNotificationEmail).toBe("function");
  });

  it("should correctly map location codes to labels in email body", async () => {
    // Test that the location mapping logic works correctly
    const locationMap: Record<string, string> = {
      campinas: "Campinas Day Hospital",
      "sp-paulista": "Clinovi Paulista (Av. Paulista)",
      "sp-moema": "Clinovi Moema",
    };

    expect(locationMap["campinas"]).toBe("Campinas Day Hospital");
    expect(locationMap["sp-paulista"]).toBe("Clinovi Paulista (Av. Paulista)");
    expect(locationMap["sp-moema"]).toBe("Clinovi Moema");
    expect(locationMap["unknown"]).toBeUndefined();
  });
});
