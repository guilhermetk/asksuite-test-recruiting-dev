const puppeteer = require('puppeteer')

const crawl = async (checkinDate, checkoutDate) => {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage();
    const hotels = await scrapeHotels(page, checkinDate, checkoutDate);
    await browser.close();
    return hotels;
}

async function scrapeHotels(page, checkinDate, checkoutDate) {
    await page.goto(`https://book.omnibees.com/chainresults?CheckIn=${checkinDate}&CheckOut=${checkoutDate}&Code=AMIGODODANIEL&NRooms=1&_askSI=d34b1c89-78d2-45f3-81ac-4af2c3edb220&ad=2&ag=-&c=2983&ch=0&diff=false&group_code=&lang=pt-BR&loyality_card=&utm_source=asksuite`);
    await page.waitForSelector('#hotels_grid');
    const hotels = await page.evaluate(() => {
        const hotelsArr = [];
        document.querySelectorAll('.roomrate').forEach(hotel => {
            const noRoomAvailable = hotel.getElementsByClassName('no-rooms-error-new');
            if (noRoomAvailable && noRoomAvailable.length === 0) {
                const hotelId = hotel.getAttribute('data-hotel-id');
                const hotelName = hotel.getElementsByClassName('hotel_name')[0].innerText;
                const hotelDescription = hotel.getElementsByClassName('hotel-description')[0].innerText;
                const basePrice = Array.from(hotel.querySelectorAll('.roomrate-price')).map(element => element.innerText).join('');
                hotelsArr.push({ hotelId, hotelName, hotelDescription, basePrice });
            }
        });
        return hotelsArr;
    });
    for (hotel of hotels) {
        hotel.rooms = await scrapeRoom(page, checkinDate, checkoutDate, hotel.hotelId);
    }
    return hotels;
}

async function scrapeRoom(page, checkinDate, checkoutDate, hotelId) {
    await page.goto(`https://book.omnibees.com/hotelresults?CheckIn=${checkinDate}&CheckOut=${checkoutDate}&Code=AMIGODODANIEL&NRooms=1&_askSI=d34b1c89-78d2-45f3-81ac-4af2c3edb220&ad=2&ag=-&c=2983&ch=0&diff=false&group_code=&lang=pt-BR&loyality_card=&utm_source=asksuite&q=${hotelId}#show-more-hotel-button`);
    await page.waitForSelector('#hotels_grid');
    const rooms = await page.evaluate(function () {
        const roomsFound = [];
        const hotelsGridDiv = document.querySelector('#hotels_grid');
        const roomRateDivs = hotelsGridDiv.getElementsByClassName('roomrate');
        for (const roomRate of roomRateDivs) {
            const roomDiv = roomRate.getElementsByClassName('rate_plan')[0];
            if (roomDiv) {
                const roomId = roomDiv.getAttribute('data-room-id');
                const priceDiv = roomDiv.getElementsByClassName('price-total');
                let price;
                if (priceDiv) {
                    price = priceDiv[0].innerText;
                }
                const descriptionDiv = roomRate.getElementsByClassName('desciption')[0];
                const roomName = descriptionDiv.getElementsByClassName('hotel_name')[0].innerText;
                const images = roomRate.getElementsByClassName('image-fotorama');
                const urls = [];
                for (const image of images) {
                    const url = image.getAttribute('data-src');
                    urls.push(url);
                }
                roomsFound.push({ roomId, price, name: roomName, images: urls });
            }
        }
        return roomsFound;
    });
    for (room of rooms) {
        room.description = await scrapeRoomDescription(page, hotel.hotelId, room.roomId);
    }
    return rooms;
}

async function scrapeRoomDescription(page, hotelId, roomId) {
    await page.goto(`https://book.omnibees.com/hotel/${hotelId}/room/${roomId}`);
    await page.waitForSelector('#hotel-info');
    return await page.evaluate(() => {
        const roomDescription = document.querySelector('#hotel-info').innerText;
        return roomDescription;
    });
}

module.exports = crawl;