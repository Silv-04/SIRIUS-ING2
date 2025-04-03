const { Builder, By, until } = require('selenium-webdriver');

const driver = new Builder().forBrowser('chrome').build();

(async function sobriete() {

    try {
        for (let i = 0; i < 1000; i++) {
            await driver.get('http://localhost:3000/episaine');

            let clientButton = await driver.wait(until.elementLocated(By.id('client-button')), 5000);
            await clientButton.click();

            let getRecipesButtonStep1 = await driver.wait(until.elementLocated(By.id('get-recipes')), 5000);
            await getRecipesButtonStep1.click();

            let customerNumberInput = await driver.wait(until.elementLocated(By.id('customer-number')), 5000);
            await customerNumberInput.sendKeys('222222');

            let validateButton = await driver.findElement(By.id('validateCustomerId'));
            await validateButton.click();

            let getRecipesButtonStep2 = await driver.wait(until.elementLocated(By.id('get-recipes-button')), 5000);
            await getRecipesButtonStep2.click();

            let numberOfDaysInput = await driver.wait(until.elementLocated(By.id('number-of-days')), 5000);
            await numberOfDaysInput.sendKeys('7');

            let sortRecipesSelect = await driver.wait(until.elementLocated(By.id('sort-recipes')), 5000);
            await sortRecipesSelect.click();

            let option = await driver.wait(until.elementLocated(By.xpath("(//option)[2]")), 5000);
            await option.click();

            let generateButton = await driver.wait(until.elementLocated(By.id('generate-recipes')), 5000);

            await generateButton.click();
            await driver.sleep(5000);
            console.log(i);
        }
    }
    catch (error) {
        console.error("Erreur selenium :", error);
    }
})();