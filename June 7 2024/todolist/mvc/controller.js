import { View } from "./view.js";
import { Model } from "./model.js";

// * ~~~~~~~~~~~~~~~~~~~~~~~~ Controller ~~~~~~~~~~~~~~~~~~~~~~~~
export const Controller = ((view, model) => {

	// const addTodo = () => {
	// 	todoinput.addEventListener("keyup", (e) => {
	// 		if (e.code === "Enter" && e.target.value.trim() !== "") {
	// 			const todo = new model.Todo(e.target.value.trim());
	// 			model.addTodo(todo).then((newtodo) => {
	// 				state.todolist = [newtodo, ...state.todolist];
	// 			});
    //     e.target.value = "";
	// 		}
	// 	});
	// };

	// const deleteTodo = () => {
	// 	todolistContainer.addEventListener("click", (e) => {
	// 		if ("." + e.target.className === view.domstr.deletBtn) {
	// 			state.todolist = state.todolist.filter(
	// 				(todo) => +todo.id !== +e.target.id
	// 			);
	// 			model.deleteTodo(e.target.id);
	// 		}
	// 	});
	// };

	const init = () => {
		model.createForm({
			name:"Atharva",
			phone:"abc",
			email:"hello@email.com",
			address:"Chicago 77088, IL, USA"
		})
	};

	const bootstrap = () => {
		init();
	};

	return { bootstrap };
})(View, Model);
