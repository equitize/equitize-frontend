// https://www.lambdatest.com/blog/automation-testing-with-selenium-javascript/

const { element } = require("prop-types");
const {By,Key,Builder} = require("selenium-webdriver");
require("chromedriver");

const sleep = t => new Promise(s => setTimeout(s, t));

var uuid = require("uuid");
var uuid_string = uuid.v4();

let companyName = uuid_string
let emailAddress = `${companyName}@mail.com`
let password = "Password1234@@@@"

let sample_jpeg_path = "/Users/hkmac/Desktop/equitize-frontend/src/tests/sample_files/sample.jpeg"
let sample_mp4_path = "/Users/hkmac/Desktop/equitize-frontend/src/tests/sample_files/sample.mp4"
let sample_pdf_path = "/Users/hkmac/Desktop/equitize-frontend/src/tests/sample_files/sample.pdf"
let sample_input_string = "Sample Input String"

it('Testing to see if frontpage works', async () => {

    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000");
    await sleep(2000)
        
    var title = await driver.getTitle();
    console.log('Title is:',title);
    expect(title).toContain("Equitize")

    await driver.findElement(By.partialLinkText("Register")).click();
    await sleep(2000)
    
    await driver.findElement(By.css("img[alt='Register as Retail Investor']")).click();
    await sleep(1000)

    await sleep(2000)

    await driver.findElement(By.css("input[placeholder='First Name']")).sendKeys(uuid_string);
    await sleep(500)

    await driver.findElement(By.css("input[placeholder='Last Name']")).sendKeys(uuid_string);
    await sleep(500)

    await driver.findElement(By.css("input[placeholder='Email Address']")).sendKeys(emailAddress);
    await sleep(500)

    await driver.findElement(By.css("input[placeholder='Password']")).sendKeys(password);
    await sleep(1000)

    await driver.findElement(By.xpath("//button[contains(text(),'" + "Sign Up" +"')]")).click();
    await sleep(2000)

    await sleep(2000)
    await sleep(2000)

    await driver.findElement(By.css('input[name="age"]')).sendKeys(Key.UP);
    await sleep(2000)

    await driver.findElement(By.xpath('//select[@name="gender"]/option[2]')).click();
    await sleep(2000)

    await driver.findElement(By.css('input[type="search"]')).click();
    await sleep(2000)
    await driver.findElement(By.css('svg[fill="currentColor"]')).click();
    await sleep(2000)
    await driver.findElement(By.css('input[name="age"]')).click();  // click somewhere
    await sleep(2000)

    await driver.findElement(By.xpath("//button[contains(text(),'" + "Next" +"')]")).click();
    await sleep(12000)

    //It is always a safe practice to quit the browser after execution
    await driver.quit();
}, 180000)
