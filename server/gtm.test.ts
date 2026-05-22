import { describe, it, expect } from "vitest";

describe("GTM Configuration", () => {
  it("should have VITE_GTM_ID environment variable set", () => {
    const gtmId = process.env.VITE_GTM_ID;
    expect(gtmId).toBeDefined();
    expect(gtmId).toMatch(/^GTM-[A-Z0-9]+$/);
  });
});
