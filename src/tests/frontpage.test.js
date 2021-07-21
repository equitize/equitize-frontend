// https://www.lambdatest.com/blog/automation-testing-with-selenium-javascript/

const sleep = t => new Promise(s => setTimeout(s, t));

const {By,Key,Builder} = require("selenium-webdriver");
require("chromedriver");

it('Testing to see if frontpage works', async () => {

    // var searchString = "Automation testing with Selenium";

    //To wait for browser to build and launch properly
    let driver = await new Builder().forBrowser("chrome").build();

    //To fetch http://google.com from the browser with our code.
    await driver.get("http://localhost:3000");
        
    // //To send a search query by passing the value in searchString.
    // await driver.findElement(By.name("q")).sendKeys(searchString,Key.RETURN);
    sleep(1000);

    //Verify the page title and print it
    var title = await driver.getTitle();
    console.log('Title is:',title);
    expect(title).toContain("Equitize")

    sleep(1000);

    //It is always a safe practice to quit the browser after execution
    await driver.quit();
}, 20000)
