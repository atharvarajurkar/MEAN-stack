// * ~~~~~~~~~~~~~~~~~~~~~~~~ View ~~~~~~~~~~~~~~~~~~~~~~~~
export const View = (() => {
	const domstr = {
		form: "#form"
	};

	const createTmp = (formData) => {
		let tmp = `
		<form>
		<div><label for="name">name</label><input type="text" name="name" id="name" value="${formData.name}" required></div>
		<div><label for="phone">phone</label><input type="text" pattern="[1-9]{1}[0-9]{9}" name="phone" id="phone" value="${formData.phone}" required></div>
		<div><label for="email">email</label><input type="email" pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$" name="email" id="email" value="${formData.email}" required></div>
		<div><label for="address">address</label><input type="text" name="address" id="address" value="${formData.address}" required></div>
		<input type="submit">
		</form>
		`
		// <button type="button">Submit</button>
		return tmp;
	};

	const render = (ele, tmp) => {
		ele.innerHTML = tmp;
	};

	return {
		render,
		domstr,
		createTmp,
	};
})();