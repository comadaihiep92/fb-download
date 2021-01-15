const puppeteer = require("puppeteer");

(async () => {
	// Mở trình duyệt mới và tới trang của kenh14
	let url = "https://www.facebook.com/watch/?v=3777269989018733/";
	let splitUrl = url.split("?v=");
	let linkUrl = splitUrl[0];
	let splitId = splitUrl[1].split("/")[0];
	let finalUrl = linkUrl + "?v=" + splitId;
	console.log("finalUrl: ", finalUrl);
	// let url = "https://www.facebook.com/Bestcutflim/videos/3777269989018733/";
	// let splitId = url.split("videos/")[1].split("/")[0];
	console.log("splitId: ", splitId);
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto(`view-source:${finalUrl}`);

	const html = await page.content();
	let getIndexHtml = html.indexOf(`videoID:${splitId}`);

	console.log("getIndexHtml: ", getIndexHtml);
	let videoOrThumb = "playable_url_quality_hd";
	let getIndex = html.indexOf(videoOrThumb);
	let getString = html.slice(
		getIndex + (videoOrThumb == "playable_url_quality_hd" ? 26 : 24),
		getIndex + 350,
	);
	let splitString = getString.split(",");
	let linkVideo = splitString[0].split('"')[0];
	let decode = linkVideo.split("\\");
	let finalLink = "";
	decode.forEach((element) => {
		finalLink += element;
	});
	console.log("finalLink: ", finalLink);
	// Chạy đoạn JavaScript trong hàm này, đưa kết quả vào biến article
	// const articles = await page.evaluate(() => {
	// 	let titleLinks = document.querySelectorAll("h3.knswli-title > a");
	// 	titleLinks = [...titleLinks];
	// 	let articles = titleLinks.map((link) => ({
	// 		title: link.getAttribute("title"),
	// 		url: link.getAttribute("href"),
	// 	}));
	// 	return articles;
	// });

	// // In ra kết quả và đóng trình duyệt
	// console.log(articles);
	// await browser.close();
})();
