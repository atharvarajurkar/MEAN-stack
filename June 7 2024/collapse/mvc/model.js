import {View} from './view.js';

// * ~~~~~~~~~~~~~~~~~~~~~~~~ Model ~~~~~~~~~~~~~~~~~~~~~~~~
export const Model = ((view) => {
	const formElement = document.querySelector(view.domstr.form)
	class Form {
		name = "";
		phone = "";
		email = "";
		address = "";
		
		constructor(name,phone,email,address) {
			this.name = name
			this.phone = phone
			this.email = email
			this.address = address
		}

		get name() {
			return this.name;
		}

		set name(name){
			this.name = name
		}

		get phone() {
			return this.phone;
		}

		set phone(phone){
			this.phone = phone
		}

		get email() {
			return this.email;
		}

		set email(email){
			this.email = email
		}

		get address() {
			return this.address;
		}

		set address(address){
			this.address = address
		}

		// set todolist(newtodos) {
		// 	this.#todolist = [...newtodos];

		// 	const ele = document.querySelector(view.domstr.todolist);
		// 	const tmp = view.createTmp(this.#todolist);
		// 	view.render(ele, tmp);
		// }
	}

	const createForm = (formData)=>{
		let form = new Form(formData.name,formData.phone,formData.email,formData.address)
		let template = view.createTmp(form)
		view.render(formElement,template)
	}

	return {
		Form,
		createForm,
	};
})(View);