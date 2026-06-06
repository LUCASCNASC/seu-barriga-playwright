import { test, expect } from "./globalCommands";
import { MovimentationPage } from "./pages/movimentation/MovimentationPage";
import { fakerPT_BR as faker } from "@faker-js/faker";
import messagesAccount from "./pages/account/messagesAccount.json";

test.describe("New Movimentation", () => {
    test.beforeEach(async ({ page, loginMainUser }) => {
        await loginMainUser();
        const movimentationPage = new MovimentationPage(page);
        await movimentationPage.goto();
    });
    test("create new movimentation and delete it", async ({ page }) => {
        const movimentationPage = new MovimentationPage(page);
        
    });
});