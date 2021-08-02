// https://www.lambdatest.com/blog/automation-testing-with-selenium-javascript/

const { element } = require("prop-types");
const {By,Key,Builder} = require("selenium-webdriver");
require("chromedriver");

const sleep = t => new Promise(s => setTimeout(s, t));

var uuid = require("uuid");
var uuid_string = uuid.v4().substring(0,8);

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
    console.log('Title is:', title);
    console.log('uuid is', uuid_string);
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

    await sleep(3000)

    for (const _ of Array(5).keys()) {
      try{
        await driver.findElement(By.css('input[name="age"]')).sendKeys(Key.UP);
        await sleep(500)
      } catch(error){}
    }
    await driver.findElement(By.xpath('//select[@name="gender"]/option[2]')).click();
    await sleep(2000)
    await driver.findElement(By.css('input[type="search"]')).click();
    await sleep(2000)
    await driver.findElement(By.css('svg[fill="currentColor"]')).click();
    await sleep(2000)
    await driver.findElement(By.css('input[name="age"]')).click();  // click somewhere
    await sleep(2000)

    await driver.findElement(By.xpath("//button[contains(text(),'" + "Next" +"')]")).click();
    await sleep(2000)

    // check disclosure documents
    var elements = await driver.findElements(By.className("bg-custom-gray"));
    for (let idx in elements){
        await elements[idx].click();
        await sleep(2000)
        await driver.findElement(By.xpath("//button[contains(text(),'" + "Confirm" +"')]")).click();
        await sleep(2000)
    }

    await driver.findElement(By.xpath('//button[contains(text(), "Submit")]')).click();
    await sleep(2000)

    await driver.findElement(By.xpath('//button[contains(text(), "Sign Out")]')).click();
    await sleep(2000)


    // procedure to approve retailInvestor 
    // get admin token
    console.log("Approving startup via API")
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "emailAddress": "admin@equitize.xyz",
        "password": process.env.ADMIN_PASSWORD_FOR_TOKEN
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    var response = await fetch("http://localhost:8080/admin/", requestOptions)
    var result = await response.text()
    var result = JSON.parse(result)
    var admin_access_token = result["access_token"]

    // use admin token to make approval
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${admin_access_token}`);
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "email": emailAddress,
      "removePerms": "retailInvestorUnverified",
      "addPerms": "retailInvestorVerified"
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:8080/admin/auth0/kyc/verified", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));


    await driver.findElement(By.xpath('//a[contains(text(),"Login")]')).click();
    await sleep(4000)

    await driver.findElement(By.css('img[alt="Log in Retail Investor"]')).click();
    await sleep(2000)

    await driver.findElement(By.css('input[placeholder="Email Address"]')).sendKeys(emailAddress);
    await sleep(500)
    await driver.findElement(By.css('input[placeholder="Password"]')).sendKeys(password);
    await sleep(1000)
    await driver.findElement(By.xpath('//button[contains(text(),"Log In")]')).click();
    await sleep(3000)

    await sleep(10000)  // wait for startup to finish
    driver.navigate().refresh()

    await sleep(10000)  // wait for startup to finish
    driver.navigate().refresh()

    await sleep(10000)  // wait for startup to finish
    driver.navigate().refresh()

    await sleep(10000)  // wait for startup to finish
    driver.navigate().refresh()

    await sleep(10000)  // wait for startup to finish
    driver.navigate().refresh()

    await sleep(2000)  // wait for startup to finish

    await driver.findElement(By.css('img[alt="Featured Startup Image"]')).click();
    await sleep(2000)
    await driver.findElement(By.xpath('//p[contains(text(),"INVEST")]')).click();
    await sleep(2000)

    for (const _ of Array(200).keys()) {
      await driver.findElement(By.css('div[role="slider"]')).sendKeys(Key.RIGHT);
    }
    await sleep(2000)
    await driver.findElement(By.xpath('//button[contains(text(), "Submit")]')).click();
    await sleep(2000)

    await sleep(300000)  // wait for startup to finish

    //It is always a safe practice to quit the browser after execution
    await driver.quit();
}, 180000)
