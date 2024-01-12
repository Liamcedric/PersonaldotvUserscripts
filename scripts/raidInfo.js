/**
 * Author: infinity
 * Name: Raid Info
 * Description: Displays weakness+resist info for raids.
 */

if (JSON.parse(localStorage.getItem("scriptSettings"))?.raidInfo) main();

async function main() {
	raidData = await getRaidData();
	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			mutation.addedNodes.forEach((node) => {
				if (
					node instanceof Element &&
					node.querySelector(".raid-container .boss-name-container span")
				) {
					displayRaidInfo(
						node.querySelector(".raid-container .boss-name-container")
					);
				}
			});
		});
	});
	observer.observe(document.querySelector("#game-view"), {
		childList: true,
		subtree: true,
	});
}

async function getRaidData() {
	return fetch("https://api.dragonsofthevoid.com/api/data/raids", {
		headers: {
			authorization: this.localStorage.token,
		},
	})
		.then((r) => r.json())
		.then((result) => {
			return result;
		});
}

function displayRaidInfo(bossNameContainer) {
	const raidInfo = Object.values(raidData).find(
		(r) => r.name === bossNameContainer.firstChild.textContent
	);

	if (!bossNameContainer.nextSibling.querySelector(".misc")) {
		const newMiscElement = document.createElement("div");
		newMiscElement.classList.add("misc");
		newMiscElement.setAttribute("data-v-624c6570", "");
		newMiscElement.setAttribute("style", "white-space: pre-line;");
		bossNameContainer.nextSibling.appendChild(newMiscElement);
	}

	const racesText = document.querySelector(".misc");
	racesText.style.whiteSpace = "pre-line";
	racesText.textContent = `${raidInfo.races.join(
		", "
	)}\nweak: ${raidInfo.weakness.join(", ")}\nresist: ${raidInfo.resist.join(
		", "
	)}`;
}
