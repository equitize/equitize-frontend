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

    await driver.findElement(By.css('img[alt="Register as Startup"]')).click();
    await sleep(500)

    await driver.findElement(By.css('input[placeholder="Company Name"]')).sendKeys(companyName);
    await sleep(500)

    await driver.findElement(By.css('input[placeholder="Email Address"]')).sendKeys(emailAddress);
    await sleep(500)

    await driver.findElement(By.css('input[placeholder="Password"]')).sendKeys(password);
    await sleep(1000)

    await driver.findElement(By.xpath("//button[contains(text(),'" + "Sign Up" +"')]")).click();
    await sleep(2000)

    await sleep(5000)

    let elements = await driver.findElements(By.className("bg-custom-gray"));
    for (let idx in elements){
        await elements[idx].click();
        await sleep(2000)
        await driver.findElement(By.xpath("//button[contains(text(),'" + "Confirm" +"')]")).click();
        await sleep(2000)
    }

    await driver.findElement(By.partialLinkText("Submit")).click();
    await sleep(2000)

    // token faulty, await new version
    // await driver.findElement(By.css("input[id='capTable']")).sendKeys(sample_pdf_path);
    // await sleep(1000)

    // await driver.findElement(By.css("input[id='acraDocuments']")).sendKeys(sample_pdf_path);
    // await sleep(1000)

    // await driver.findElement(By.css("input[id='bankInfo']")).sendKeys(sample_pdf_path);
    // await sleep(1000)

    // await driver.findElement(By.css("input[id='idProof']")).sendKeys(sample_pdf_path);
    // await sleep(1000)

    // await driver.findElement(By.css("input[id='profilePhoto']")).sendKeys(sample_jpeg_path);
    // await sleep(1000)

    await driver.findElement(By.css("textarea[placeholder='Zil address']")).sendKeys(sample_input_string);
    await sleep(500)

    await driver.findElement(By.css("textarea[placeholder='Short Description of your Business']")).sendKeys(sample_input_string);
    await sleep(500)

    await driver.findElement(By.css('input[type="search"]')).click();
    await sleep(1000)
    await driver.findElement(By.css('svg[fill="currentColor"]')).click();
    await sleep(1000)
    await driver.findElement(By.css("textarea[placeholder='Zil address']")).click();
    await sleep(1000)

    // campaign setup tab

    // input[accept="video/*"]
    // input[accept=".jpg, .pdf"]
    await driver.findElement(By.xpath("//button[contains(text(),'" + "Campaign Setup" +"')]")).click();
    await sleep(2000)
    await driver.findElement(By.css("textarea[placeholder='Campaign Description']")).sendKeys(sample_input_string);
    await sleep(2000)

    
    await driver.findElement(By.xpath('//p[contains(text(),"SET UP PROPOSED CAMPAIGN MILESTONES")]')).click()
    await sleep(1000)

    await driver.findElement(By.css('img[alt="Edit Details"]')).click();
    await sleep(500)
    await driver.findElement(By.css('input[value="500000"]')).sendKeys(Key.UP);
    await sleep(500)
    await driver.findElement(By.css('input[value="10"]')).sendKeys(Key.BACK_SPACE);
    await sleep(500)
    await driver.findElement(By.css('input[value="10"]')).sendKeys("5");
    await sleep(500)
    await driver.findElement(By.css('input[value="10"]')).sendKeys(Key.ENTER);
    await sleep(500)
    await driver.findElement(By.xpath('//button[contains(text(),"Submit")]')).click()
    await sleep(1000)

    await driver.findElement(By.xpath('//p[contains(text(),"+ ADD NEW MILESTONE")]')).click()
    await sleep(500)
    await driver.findElement(By.css('input[placeholder="Milestone Title"]')).sendKeys(sample_input_string);
    await sleep(500)
    await driver.findElement(By.css('input[type="Date"]')).sendKeys("09-09-2021");
    await sleep(500)
    await driver.findElement(By.css('textarea[placeholder="Description"]')).sendKeys(sample_input_string);
    await sleep(500)
    await driver.findElement(By.xpath('//button[contains(text(),"Submit")]')).click()
    await sleep(1000)

    await driver.findElement(By.xpath('//p[contains(text(),"×")]')).click()
    await sleep(1000)

    await driver.findElement(By.xpath('//p[contains(text(),"ZOOM")]')).click()
    await sleep(1000)
    // TBC    
    await driver.findElement(By.xpath('//button[contains(text(),"Submit")]')).click()
    await sleep(1000)
    
    // search for commerical champion tab
    await driver.findElement(By.xpath("//button[contains(text(),'" + "Search for Commercial Champion" +"')]")).click();
    await sleep(2000)
    await driver.findElement(By.css('img[alt="Not Selected"]')).click();
    await sleep(2000)

    // apply for design sprints tab
    await driver.findElement(By.xpath("//button[contains(text(),'" + "Apply for Design Sprints" +"')]")).click();
    await sleep(2000)
    await driver.findElement(By.xpath("//p[contains(text(),'" + "15th May" +"')]")).click();
    await sleep(2000)

    await sleep(20000)

    //It is always a safe practice to quit the browser after execution
    await driver.quit();
}, 180000)
