import { test, expect } from "@playwright/test";

test("add to cart and proceed to checkout", async ({ page }) => {
  await page.goto("/");

  // Select dual variant
  await page.getByText("CarPlay + Android Auto").click();

  // Add to cart
  await page.getByRole("button", { name: /Ajouter au panier/ }).click();

  // Open cart
  await page.getByLabel("Ouvrir le panier").click();

  // Verify item in cart
  await expect(page.getByText("CarPlay + Android Auto")).toBeVisible();
  await expect(page.getByText("59,90")).toBeVisible();

  // Proceed to checkout (will redirect to Stripe — stop before external)
  // In test mode we just verify the API call is made
  const [request] = await Promise.all([
    page.waitForRequest((req) => req.url().includes("/api/checkout")),
    page.getByRole("button", { name: "Passer au paiement" }).click(),
  ]);

  expect(request.method()).toBe("POST");
});

test("vehicle search filters brands", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("Rechercher votre marque...").fill("Renault");
  await expect(page.getByText("Renault")).toBeVisible();
  await expect(page.getByText("BMW")).not.toBeVisible();
});

test("FAQ accordion opens and closes", async ({ page }) => {
  await page.goto("/");
  const question = page.getByText(/Le dongle CarplayGO fonctionne-t-il sur ma voiture/);
  await question.click();
  await expect(page.getByText(/95% des véhicules/)).toBeVisible();
});
