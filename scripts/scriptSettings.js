/**
 * Author: infinity
 * Name: Script Settings
 * Description: Allows the user to enable/disable scripts from a settings menu.
 */

scripts = ["smartAutoHeal", "smartLesserGrit", "dailyStats", "raidInfo"]; //, "raidShareGroup"];

settings = getSettings();

watchForSettingsMenu();

function buildSettingsMenu() {
	const settingsView = document.getElementById("settings");
	if (settingsView === null) return;

	const fieldset = document.createElement("fieldset");
	fieldset.style.borderRadius = "5px";
	fieldset.style.backgroundColor = "#252525";
	fieldset.style.padding = "20px";
	fieldset.style.borderColor = "#a0725f";

	const legend = document.createElement("legend");
	legend.innerText = "Scripts";
	legend.style.fontSize = "36px";
	legend.style.fontWeight = "bold";

	const checkboxContainer = document.createElement("div");

	fieldset.appendChild(legend);
	fieldset.appendChild(checkboxContainer);
	settingsView.appendChild(fieldset);

	Object.entries(settings).forEach(([key, value]) => {
		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.checked = value;
		checkbox.style.marginRight = "10px";
		checkbox.style.width = "20px";
		checkbox.style.height = "20px";
		checkbox.addEventListener("change", () => {
			settings[key] = checkbox.checked;
			saveSettings();
			console.log(settings);
		});

		const label = document.createElement("label");
		label.appendChild(checkbox);
		label.appendChild(document.createTextNode(key.replace(/([A-Z])/g, " $1")));
		label.style.marginBottom = "10px";
		label.style.textTransform = "capitalize";
		label.style.fontSize = "24px";
		label.style.display = "block";

		checkboxContainer.appendChild(label);
	});
}

function watchForSettingsMenu() {
	const tabObserver = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			mutation.addedNodes.forEach((node) => {
				if (node instanceof Element && node.classList.contains("modal-shell")) {
					buildSettingsMenu();
				}
			});
		});
	});

	tabObserver.observe(document.getElementById("game-view"), {
		childList: true,
		subtree: true,
	});
}

function getSettings() {
	if (localStorage.getItem("scriptSettings") === null) {
		const scriptsObject = scripts.reduce((acc, curr) => {
			acc[curr] = false;
			return acc;
		}, {});
		localStorage.setItem("scriptSettings", JSON.stringify(scriptsObject));
	} else {
		const savedSettings = JSON.parse(localStorage.getItem("scriptSettings"));
		const newScripts = scripts.filter(
			(script) => savedSettings[script] === undefined
		);
		if (newScripts.length > 0) {
			newScripts.forEach((script) => {
				savedSettings[script] = false;
			});
			localStorage.setItem("scriptSettings", JSON.stringify(savedSettings));
		}
	}
	return JSON.parse(localStorage.getItem("scriptSettings"));
}

function saveSettings() {
	localStorage.setItem("scriptSettings", JSON.stringify(settings));
}
