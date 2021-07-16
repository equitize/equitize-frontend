// https://medium.com/@oyetoketoby80/automating-your-front-end-application-testing-with-selenium-8e9d51f0f73c

const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

console.log("check")
console.log(driver)

driver.get('http://localhost:3000').then(function () {
    console.log("check")
    driver.findElement(webdriver.By.className('p-4')).sendKeys('Build App\n').then(function () {
        driver.getPageSource().then(source => {
            if (source.includes("Register")) {
                console.log("Test Passed!")
            } else {
                console.log("Test Failed!")
            }
        })
        console.log("check")
    });
});

it('Testing to see if Jest works', () => {
    expect(1).toBe(1)
})