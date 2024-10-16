/**
 * Author: infinity
 * Name: Smart Auto Heal
 * Description: Automatically uses hp pots for you.
 */

if (JSON.parse(localStorage.getItem("scriptSettings"))?.smartAutoHeal) main();

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
		"https://api.dragonsofthevoid.com/api/usable/consume/u.healing-potion",
		{ headers: { authorization: this.localStorage.token } }
	)
		.then((res) => res.json())
		.then((data) => {
			if (data.success) {
				secondsUntilNextPot = 300;
				console.log("Health Pot Used");
			} else {
				let match = data.errorMsg.match(/\d+/);
				secondsUntilNextPot = match ? parseInt(match[0]) : 60;
			}
		});

	return secondsUntilNextPot;
}
