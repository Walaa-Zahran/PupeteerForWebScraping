const fs=require('fs');
const puppeteer=require('puppeteer');
async function run(){
  const browser=await puppeteer.launch();
  const page=await browser.newPage();
  await page.goto('https://traversymedia.com/');
//   const courses=await page.evaluate(()=>Array.from(document.querySelectorAll('#courses .card'),(e)=>({
//   title:e.querySelector('.card-body h3').innerText,
//   level:e.querySelector('.card-body .level').innerText,
//   url:e.querySelector('.card-footer a').href,
//   promo:e.querySelector('.card-footer .promo-code .promo').innerText,
// })));
const courses=await page.$$eval('#courses .card',(elements)=>
  elements.map((e)=>({
  title: e.querySelector('.card-body h3').innerText,
  level: e.querySelector('.card-body .level').innerText,
  url: e.querySelector('.card-footer a').href,
  promo: e.querySelector('.card-footer .promo-code .promo').innerText,

}))
);
  console.log(courses);
  //save data to json file
  fs.writeFile('courses.json',JSON.stringify(courses),(err)=>{
    if(err) throw err;
    console.log('File saved');
  });
  await browser.close();
}
run();