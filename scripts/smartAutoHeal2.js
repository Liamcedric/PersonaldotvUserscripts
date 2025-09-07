/**
 * Author: infinity
 * Name: Smart Auto Heal
 * Description: Automatically uses hp pots for you.
 */

if (JSON.parse(localStorage.getItem("scriptSettings"))?.smartAutoHeal2) main();

function main() {
	usePotWithCooldown();
}

async function usePotWithCooldown() {
	let cooldown = await usePot();
	setTimeout(usePotWithCooldown, (cooldown + 1) * 1000);
}

async function usePot() {
	let secondsUntilNextPot;
	await fetch(
		"https://api.dragonsofthevoid.com/api/usable/consume/u.gipantan-health-potion",
		{ headers: { authorization: this.localStorage.token } }
	)
		.then((res) => res.json())
		.then((data) => {
			if (data.success) {
				secondsUntilNextPot = 480;
				console.log("45 Health Pot Used");
			} else {
				let match = data.errorMsg.match(/\d+/);
				secondsUntilNextPot = match ? parseInt(match[0]) : 60;
			}
		});

	return secondsUntilNextPot;
}
