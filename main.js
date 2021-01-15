const axios = require("axios");
const cheerio = require("cheerio");
// const url = "https://www.facebook.com/watch/RayDiazOfficial/";
const url = "https://www.facebook.com/100044422149853/videos/690885384936179";

fetchData(url).then((res) => {
	const html = res.data;
	const $ = cheerio.load(html);
	const statsTable = $("#u_0_1j._53j5");
	console.log("statsTable: ", statsTable);
	statsTable.each(function () {
		let title = $(this).find("source").attr("src");
		// let title = $(this).find("span").text();
		console.log("title:", title);
	});
});

async function fetchData(url) {
	console.log("Crawling data...");
	// make http call to url
	let response = await axios(url).catch((err) => console.log("err: ", err));

	if (response.status !== 200) {
		console.log("Error occurred while fetching data");
		return;
	}
	return response;
}
