/**
 * Author: infinity
 * Name: Greater Draught Grit Auto
 * Description: Automatically uses Lesser Grit pots for you.
 */

if (JSON.parse(localStorage.getItem("scriptSettings"))?.smartGreatererGrit) main();

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
		"https://api.dragonsofthevoid.com/api/usable/consume/u.greater-draught-of-grit",
		{ headers: { authorization: this.localStorage.token } }
	)
		.then((res) => res.json())
		.then((data) => {
			if (data.success) {
				secondsUntilNextPot = 1800;
			} else {
				let match = data.errorMsg.match(/\d+/);
				secondsUntilNextPot = match ? parseInt(match[0]) : 60;
			}
		});

	return secondsUntilNextPot;
}
