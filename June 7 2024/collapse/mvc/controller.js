import { View } from "./view.js";
import { Model } from "./model.js";

// * ~~~~~~~~~~~~~~~~~~~~~~~~ Controller ~~~~~~~~~~~~~~~~~~~~~~~~
export const Controller = ((view, model) => {
	let collapsibleList = document.getElementsByClassName("collapsible");
	let multipleCheckbox = document.querySelector("#multipleCheckbox");
	let multiple = false
	const init = () => {
		for (let i = 0; i < collapsibleList.length; i++) {
			collapsibleList[i].addEventListener("click", function (event) {
				let content = this.parentElement.nextElementSibling;
				if (content.style.display === "block") {
					content.style.display = "none";
					this.innerHTML = "Expand"
				} else {
					content.style.display = "block";
					this.innerHTML = "Collapse"
				}
				if(!multiple){
					let filtered = [...collapsibleList].filter((_,index)=>index!==i)
					filtered.forEach(ele=>{
						let content = ele.parentElement.nextElementSibling
						content.style.display = "none";
						ele.innerHTML = "Expand"
					})
				}
			});
		}

		multipleCheckbox.addEventListener('change', function (event) {
			if (this.checked) {
				multiple = true
			} else {
				multiple = false
			}
		});

	};

	const bootstrap = () => {
		init();
	};

	return { bootstrap };
})(View, Model);
