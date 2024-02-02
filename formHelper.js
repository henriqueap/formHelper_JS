/** 
 * Form Helper JS 																								
 * A JavaScript file to help apply masks and validate brazilian form inputs
 * @author Henrique Emanuel de Araújo Pereira.
 * @powered_by BLACKBOX AI.
 * @date 2023-12-22.
*/

// Including the brazilian form inputs classes
document.write("<script src='/js/cepInput.js' type='text/javascript'></script>");
document.write("<script src='/js/cnpjInput.js' type='text/javascript'></script>");
document.write("<script src='/js/cpfInput.js' type='text/javascript'></script>");
document.write("<script src='/js/phoneInput.js' type='text/javascript'></script>");

// Add extintor button config
document.getElementById("addExtintor").addEventListener('click', function(event) {
	event.preventDefault();
		
	let divInputs = document.getElementById('extintoresInputs');
	let n = divInputs.childElementCount + 1;
	
	let divExtintor = document.createElement('div');
  divExtintor.className = 'row';
	divInputs.appendChild(divExtintor);


  for (let i = 1; i <= 4; i++) {
		let div = document.createElement('div');
  	div.className = 'col-sm-3';
    
    let label = document.createElement('label');
		label.className = 'form-label';
		label.name = "ext" + n +"Label";
		label.id = "ext" + n +"Label";
		switch (i) {
			case 1:
				label.textContent = 'Localização: ';
				label.htmlFor = "ext" + n +"Local";
				break;
			case 2:
				label.textContent = 'Ag. Extintor: ';
				label.htmlFor = "ext" + n +"Agente";
			break;
			case 3:
				label.textContent = 'Quantidade: ';
				label.htmlFor = "ext" + n +"Qde";
				break;
			case 4:
				label.textContent = 'Cap. Extintora: ';
				label.htmlFor = "ext" + n +"Cap";
			break;
		}

    let input = document.createElement('input');
    input.type = 'text';
		input.className = 'form-control'
		switch (i) {
			case 1:
				input.name = "ext" + n +"Local";
				input.id = "ext" + n +"Local";
				break;
			case 2:
				input.name = "ext" + n +"Agente";
				input.id = "ext" + n +"Agente";
			break;
			case 3:
				input.name = "ext" + n +"Qde";
				input.id = "ext" + n +"Qde";
				break;
			case 4:
				input.name = "ext" + n +"Cap";
				input.id = "ext" + n +"Cap";
			break;
		}
		
		divExtintor.appendChild(div).appendChild(label);
    divExtintor.appendChild(div).appendChild(input);
  }
})

document.getElementById("delExtintor").addEventListener('click', function(event) {
	event.preventDefault();
	document.getElementById('extintoresInputs').removeChild(document.getElementById('extintoresInputs').lastChild);
})