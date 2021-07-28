// https://www.lambdatest.com/blog/automation-testing-with-selenium-javascript/

const { element } = require("prop-types");
const {By,Key,Builder} = require("selenium-webdriver");
require("chromedriver");

const sleep = t => new Promise(s => setTimeout(s, t));

var uuid = require("uuid");
var uuid_string = uuid.v4().substring(0,8);

let companyName = uuid_string
let emailAddress = `${companyName}@mail.com`
let password = "Password1234@@@@"  // fake tmp password

let sample_jpeg_path = "/Users/hkmac/Desktop/equitize-frontend/src/tests/sample_files/sample.jpeg"
let sample_mp4_path = "/Users/hkmac/Desktop/equitize-frontend/src/tests/sample_files/sample.mp4"
let sample_pdf_path = "/Users/hkmac/Desktop/equitize-frontend/src/tests/sample_files/sample.pdf"
let sample_input_string = "Sample Input String"

const today = new Date()
let ytd = new Date(today)
ytd.setDate(ytd.getDate() - 1)
let tmr = new Date(today)
tmr.setDate(tmr.getDate() + 1)
let date_iso_ytd = ytd.toISOString().split("T")[0]
let datestring_ytd = date_iso_ytd.substring(8,10) + '-' + date_iso_ytd.substring(5,7) + '-' + date_iso_ytd.substring(0,4)
let date_iso_tmr = tmr.toISOString().split("T")[0]
let datestring_tmr = date_iso_tmr.substring(8,10) + '-' + date_iso_tmr.substring(5,7) + '-' + date_iso_tmr.substring(0,4)

it('Testing to see if frontpage works', async () => {

    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000");
    await sleep(3000)

    console.log(process.env.NODE_ENV, process.env.ADMIN_PASSWORD_FOR_TOKEN, process.env.GENERATE_SOURCEMAP)
    console.log(datestring_ytd, datestring_tmr)

    var title = await driver.getTitle();
    console.log('Title is:', title);
    console.log('uuid is', uuid_string)
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

    var elements = await driver.findElements(By.className("bg-custom-gray"));
    for (let idx in elements){
        await elements[idx].click();
        await sleep(2000)
        await driver.findElement(By.xpath("//button[contains(text(),'" + "Confirm" +"')]")).click();
        await sleep(2000)
    }

    await driver.findElement(By.partialLinkText("Submit")).click();
    await sleep(2000)

    // token faulty, await new version
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
    await sleep(500)

    await driver.findElement(By.css("textarea[placeholder='Short Description of your Business']")).sendKeys(sample_input_string);
    await sleep(500)

    await driver.findElement(By.css('input[type="search"]')).click();
    await sleep(1000)
    await driver.findElement(By.css('svg[fill="currentColor"]')).click();
    await sleep(1000)
    await driver.findElement(By.css("textarea[placeholder='Zil address']")).click();
    await sleep(2000)

    // campaign setup tab
    await driver.findElement(By.xpath("//button[contains(text(),'" + "Campaign Setup" +"')]")).click();
    await sleep(2000)
    await driver.findElement(By.css('input[accept="video/*"]')).sendKeys(sample_mp4_path);
    await sleep(1000)
    await driver.findElement(By.css('input[accept=".jpg, .pdf"]')).sendKeys(sample_pdf_path);
    await sleep(1000)
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
    await driver.findElement(By.css('input[type="Date"]')).sendKeys(datestring_tmr);
    await sleep(500)
    await driver.findElement(By.css('textarea[placeholder="Description"]')).sendKeys(sample_input_string);
    await sleep(500)
    await driver.findElement(By.css('div[role="slider"]')).sendKeys(Key.RIGHT);
    await driver.findElement(By.css('div[role="slider"]')).sendKeys(Key.RIGHT);
    await driver.findElement(By.css('div[role="slider"]')).sendKeys(Key.RIGHT);
    await driver.findElement(By.css('div[role="slider"]')).sendKeys(Key.RIGHT);
    await driver.findElement(By.css('div[role="slider"]')).sendKeys(Key.RIGHT);
    await sleep(500)
    await driver.findElement(By.xpath('//button[contains(text(),"Submit")]')).click()
    await sleep(1000)

    await driver.findElement(By.xpath('//p[contains(text(),"×")]')).click()
    await sleep(1000)

    await driver.findElement(By.xpath('//p[contains(text(),"ZOOM")]')).click()
    await sleep(1000)
    await driver.findElement(By.css('input[type="Date"]')).sendKeys(datestring_tmr);
    await sleep(1000)
    var elements = await driver.findElements(By.css('input[type="Time"]'));
    for (let idx in elements){
        await elements[idx].sendKeys("12:00PM");
        await sleep(1000)
    }
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
    await driver.findElement(By.xpath('//button[contains(text(),"Submit")]')).click();
    await sleep(2000)
    await driver.findElement(By.xpath('//button[contains(text(),"Sign Out")]')).click();
    await sleep(2000)

    // procedure to approve startup 
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
      "removePerms": "startupUnverified",
      "addPerms": "startupVerified"
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
      
    await sleep(5000)

    await driver.findElement(By.xpath('//a[contains(text(),"Login")]')).click();
    await sleep(2000)

    await driver.findElement(By.css('img[alt="Log in as Startup"]')).click();
    await sleep(2000)

    await driver.findElement(By.css('input[placeholder="Email Address"]')).sendKeys(emailAddress);
    await sleep(500)
    await driver.findElement(By.css('input[placeholder="Password"]')).sendKeys(password);
    await sleep(1000)
    await driver.findElement(By.xpath('//button[contains(text(),"Log In")]')).click();
    await sleep(3000)

    await driver.findElement(By.xpath("//button[contains(text(),'" + "Campaign Setup" +"')]")).click();
    await sleep(2000)

    await driver.findElement(By.xpath("//button[contains(text(),'" + "View campaign preview" +"')]")).click();
    await sleep(2000)

    await driver.findElement(By.css('input[type="Date"]')).sendKeys(datestring_ytd);
    await sleep(1000)
    await driver.findElement(By.css('input[type="Time"]')).sendKeys("00:01AM");
    await sleep(1000)
    await driver.findElement(By.xpath('//button[contains(text(),"Update")]')).click();
    await sleep(2000)

    await sleep(120000)

    //It is always a safe practice to quit the browser after execution
    await driver.quit();
}, 360000)
