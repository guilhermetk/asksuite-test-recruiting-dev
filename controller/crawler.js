const puppeteer = require('puppeteer');


startCrawler = async function (checkinDate, checkoutDate) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://book.omnibees.com/hotelresults?CheckIn=23092022&CheckOut=24092022&Code=AMIGODODANIEL&NRooms=1&_askSI=d34b1c89-78d2-45f3-81ac-4af2c3edb220&ad=2&ag=-&c=2983&ch=0&diff=false&group_code=&lang=pt-BR&loyality_card=&utm_source=asksuite&q=5461#show-more-hotel-button');
    const feedHandle = await page.$("#hotels_grid");
    const response = await page.evaluate(() => {
        const roomsFound = [];

        const topRoomsDiv = document.querySelector('#hotels_grid');
        const subRoomsDiv = topRoomsDiv.getElementsByClassName('roomrate');

        for (let index = 0; index < subRoomsDiv.length; index++) {

            const roomDiv = subRoomsDiv[index].getElementsByClassName('rate_plan')[0];
            const price = roomDiv.getElementsByClassName('price-total')[0].innerText;

            const descriptionDiv = subRoomsDiv[index].getElementsByClassName('desciption')[0];
            const roomName = descriptionDiv.getElementsByClassName('hotel_name')[0].innerText;
            const roomDescription = descriptionDiv.getElementsByClassName('description')[0].innerText;

            const images = subRoomsDiv[index].getElementsByClassName('image-fotorama');

            const urls = [];

            for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
                const element = images[imageIndex];
                const url = element.getAttribute("data-src");
                console.log(url);
                urls.push(url);
            }

            roomsFound.push({price: price, name: roomName, description : roomDescription, images: urls});
        }
        return roomsFound;
    });

    //await browser.close();
    return response;
};

module.exports = startCrawler;