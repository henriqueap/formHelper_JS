/** 
 * Class CnpjInput																							
 * A JavaScript class which encapsulates the functionality of validating and masking 
 * a brazilian CNPJ number input. It includes methods for each task and binds them 
 * to the instance in the constructor.
 * 
 * @author Henrique Emanuel de Araújo Pereira.
 * @powered_by BLACKBOX AI.
 * @date 2023-12-22.
*/

/**
 * @class CnpjInput
 * @classdesc Manages a CNPJ input field, adding event listeners and masking the 
 * input.
 */
class CnpjInput {
	/**
	 * Constructor, initializes event listeners for the input element.
	 * @param {string} inputID - The input element id.
	 */
	constructor(inputID) {
    this.el_cnpj = document.getElementById(inputID);
		
		// Event listeners
		this.el_cnpj.addEventListener('blur', this.validate.bind(this));
		this.el_cnpj.addEventListener('focus', this.clearInvalid.bind(this));
		this.el_cnpj.addEventListener('keyup', this.applyMask.bind(this));
	}
	
	/**
	 *  Method called, when a key is released inside the CNPJ input field to apply 
	 *  a mask to the input value.
	 */
	applyMask() {
		this.el_cnpj.value = this.cnpjMask(this.el_cnpj.value);
	}

	/**
	 * Method called, when the CNPJ input field gains focus, to clear 'is-invalid' 
	 * class.
	 */
	clearInvalid() {
		this.el_cnpj.classList.remove('is-invalid');
	}

		/**
	 * Method to apply a brazilian CNPJ number mask to a input value.
	 * @param {string} cnpj  - The CNPJ number to be formatted.
	 * @returns {string} - The formatted CNPJ number.
	 */
	cnpjMask(cnpj) {
		if (!cnpj) return ""
		cnpj = cnpj.replace(/\D/g, '')
		cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, "$1.$2.$3/$4")
		cnpj = cnpj.replace(/(\d)(\d{2})$/, "$1-$2")
		return cnpj
	}

	/**
	 * Method to validate a brazilian CNPJ number
	 * @param {string} cnpj - The CNPJ number to be validated.
	 * @returns {boolean} - True if validated or false otherwise 
	 */
	validaCNPJ(cnpj) {
		cnpj = cnpj.replace(/[^\d]+/g, '');

		if (cnpj.length != 14)
			return false;

		var tamanhoTotal = cnpj.length - 2
		var cnpjSemDigitos = cnpj.substring(0, tamanhoTotal);
		var digitosVerificadores = cnpj.substring(tamanhoTotal);
		var resultado = 0;
		var soma = 0;
		var pos = tamanhoTotal - 7;
		for (let i = tamanhoTotal; i >= 1; i--) {
			soma += cnpjSemDigitos.charAt(tamanhoTotal - i) * pos--;
			if (pos < 2)
				pos = 9;
		}
		resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
		if (resultado != digitosVerificadores.charAt(0))
			return false;

		tamanhoTotal = tamanhoTotal + 1;
		cnpjSemDigitos = cnpj.substring(0, tamanhoTotal);
		soma = 0;
		pos = tamanhoTotal - 7;
		for (let i = tamanhoTotal; i >= 1; i--) {
			soma += cnpjSemDigitos.charAt(tamanhoTotal - i) * pos--;
			if (pos < 2)
				pos = 9;
		}

		resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
		if (resultado != digitosVerificadores.charAt(1))
			return false;

		return true;
	}

	/**
	 * Method called, when the CNPJ input field loses focus, to check if the input 
	 * value is valid aplying 'is-invalid' class if not valid.
	 */
	validate() {
		if (this.validaCNPJ(this.el_cnpj.value) === false) {
		 this.el_cnpj.classList.add('is-invalid');
		}
	}
}

// Calling the class CnpjInput constructor to all class cnpj inputs na DOM
document.querySelectorAll('.cnpj').forEach(function(input) {
	new CnpjInput(input.id);
});