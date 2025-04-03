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
        
        let generateButton = await driver.wait(until.elementLocated(By.id('get-projection-button')), 5000);
        await generateButton.click();

        let weightValueInput = await driver.wait(until.elementLocated(By.id('weight-value')), 5000);
        await weightValueInput.sendKeys('68');

        let validateButton2 = await driver.findElement(By.id('validate-projection'));
            await validateButton2.click().then(
                await driver.sleep(25000).then(console.log(i))
            );
        }
    }
    catch (error) {
        console.error("Erreur selenium :", error);
    }
})();