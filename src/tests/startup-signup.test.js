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
    await sleep(3000)
        
    var title = await driver.getTitle();
    console.log('Title is:',title);
    expect(title).toContain("Equitize")

    await driver.findElement(By.partialLinkText("Register")).click();
    await sleep(3000)

    await driver.findElement(By.css("img[alt='Register as Startup']")).click();
    await sleep(1000)

    await driver.findElement(By.css("input[placeholder='Company Name']")).sendKeys(companyName);
    await sleep(1000)

    await driver.findElement(By.css("input[placeholder='Email Address']")).sendKeys(emailAddress);
    await sleep(1000)

    await driver.findElement(By.css("input[placeholder='Password']")).sendKeys(password);
    await sleep(2000)

    for (let attemptCount in [...Array(2).keys()]){
        try {
            // await driver.findElement(By.partialLinkText("Sign Up")).click();
            // await sleep(2000)
            await driver.findElement(By.css("input[placeholder='Company Name']")).sendKeys(Key.ENTER);
            await sleep(1000)
            await driver.findElement(By.css("input[placeholder='Email Address']")).sendKeys(Key.ENTER);
            await sleep(1000)
            await driver.findElement(By.css("input[placeholder='Password']")).sendKeys(Key.ENTER);
            await sleep(1000)
          } catch {
          continue
        }
        break
    }

    await sleep(5000)
    let elements = await driver.findElements(By.className("bg-custom-gray"));

    for (let idx in elements){
        await elements[idx].click();
        await sleep(2000)
        await driver.findElement(By.className("test-confirm")).click();
        await sleep(2000)
    }

    await driver.findElement(By.partialLinkText("Submit")).click();
    await sleep(2000)


    await driver.findElement(By.css("input[id='capTable']")).sendKeys(sample_pdf_path);
    await sleep(1000)

    await driver.findElement(By.css("input[id='acraDocuments']")).sendKeys(sample_pdf_path);
    await sleep(1000)

    await driver.findElement(By.css("input[id='bankInfo']")).sendKeys(sample_pdf_path);
    await sleep(1000)

    await driver.findElement(By.css("input[id='idProof']")).sendKeys(sample_pdf_path);
    await sleep(1000)

    await driver.findElement(By.css("input[id='profilePhoto']")).sendKeys(sample_jpeg_path);
    await sleep(1000)

    await driver.findElement(By.css("textarea[placeholder='Zil address']")).sendKeys(sample_input_string);
    await sleep(2000)

    await driver.findElement(By.css("textarea[placeholder='Short Description of your Business']")).sendKeys(sample_input_string);
    await sleep(2000)

    // await driver.findElement(By.css("input[type='search']")).click();
    // await sleep(2000)

    // not interactable 
    // await driver.findElement(By.css("svg[stroke='currentColor']")).findElement(By.css("path")).click();
    // await sleep(2000)

    await driver.findElement(By.className("self-end bg-secondary")).click();
    await sleep(2000)

    await driver.findElement(By.className("bg-transparent text-black h-6 w-6")).click();
    await sleep(2000)

    
    await driver.findElement(By.xpath("//button[contains(text(),'" + "Campaign Setup" +"')]")).click();
    await sleep(2000)

    // await driver.findElement(By.css("input[id='capTable']")).sendKeys("/Users/hkmac/Desktop/equitize-frontend/src/tests/sample_files/sample.jpeg");
    // await sleep(2000)
    // await 
    // await sleep(2000)

    // 
    // `${__dirname}/../src/tests/sample_files/sample.jpeg`

    // await driver.findElement(By.linkText("Confirm")).click();
    // await sleep(2000)

    // await driver.findElement(By.partialLinkText("Campaign Process Guide")).click();
    // await sleep(2000)

    // await driver.findElement(By.linkText("Confirm")).click();
    // await sleep(2000)

    // await driver.findElement(By.partialLinkText("Terms and Conditions")).click();
    // await sleep(2000)

    // await driver.findElement(By.linkText("Confirm")).click();
    await sleep(200000)

    //It is always a safe practice to quit the browser after execution
    await driver.quit();
}, 180000)
