function addDefaultItems(){
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => {
        json.forEach(element => {
            let li = document.createElement("li");
            let inputValue = element.title;
            let t = document.createTextNode(inputValue);
            li.appendChild(t);
            
            let span = document.createElement("SPAN");
            let txt = document.createTextNode("\u00D7");
            span.className = "close";
            span.onclick = function() {
                let li = this.parentElement;
                li.style.display = "none";
            }
            span.appendChild(txt);
            li.appendChild(span);

            document.getElementById("myUL").appendChild(li);
        });
    })

}

addDefaultItems()

function newElement() {
  let li = document.createElement("li");
  let inputValue = document.getElementById("myInput").value;
  let t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  span.onclick = function() {
    let li = this.parentElement;
    li.style.display = "none";
  }
  li.appendChild(span);
}

let list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);