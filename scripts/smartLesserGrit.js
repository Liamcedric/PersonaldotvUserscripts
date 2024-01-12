/**
 * Author: infinity
 * Name: Lesser Draught Grit Auto
 * Description: Automatically uses Lesser Grit pots for you.
 */

if (JSON.parse(localStorage.getItem("scriptSettings"))?.smartLesserGrit) main();

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
		"https://api.dragonsofthevoid.com/api/usable/consume/u.lesser-draught-of-grit",
		{ headers: { authorization: this.localStorage.token } }
	)
		.then((res) => res.json())
		.then((data) => {
			if (data.success) {
				secondsUntilNextPot = 7200;
			} else {
				try {
					secondsUntilNextPot = parseInt(data.errorMsg.match(/\d+/)[0]);
				} catch (err) {
					secondsUntilNextPot = 60;
				}
			}
		});

	return secondsUntilNextPot;
}
