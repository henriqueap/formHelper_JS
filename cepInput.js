/** 
 * Class CepInput																							
 * A JavaScript class which encapsulates the functionality of validating and masking 
 * a brazilian CEP number input. It includes methods for each task and binds them 
 * to the instance in the constructor.
 * 
 * @author Henrique Emanuel de Araújo Pereira.
 * @powered_by BLACKBOX AI.
 * @date 2023-12-22.
*/

/**
 * @class CepInput
 * @classdesc Manages a CEP input field, adding event listeners and masking the 
 * input.
 */
class CepInput {
	/**
	 * Constructor, initializes event listeners for the input element.
	 * @param {string} inputID - The input element id.
	 */
	constructor(inputID) {
    this.el_cep = document.getElementById(inputID);
		
		// Event listeners
		this.el_cep.addEventListener('blur', this.validate.bind(this));
		this.el_cep.addEventListener('focus', this.clearInvalid.bind(this));
		this.el_cep.addEventListener('keyup', this.applyMask.bind(this));
	}
	
	/**
	 *  Method called, when a key is released inside the CEP input field to apply 
	 *  a mask to the input value.
	 */
	applyMask() {
		this.el_cep.value = this.cepMask(this.el_cep.value);
	}

	/**
	 * Method called, when the CEP input field gains focus, to clear 'is-invalid' 
	 * class.
	 */
	clearInvalid() {
		this.el_cep.classList.remove('is-invalid');
	}

		/**
	 * Method to apply a brazilian CEP number mask to a input value.
	 * @param {string} cep  - The CEP number to be formatted.
	 * @returns {string} cep - The formatted CEP number.
	 */
	cepMask(cep) {
		if (!cep) return ""
		cep = cep.replace(/\D/g, '')
		cep = cep.replace(/(\d)(\d{3})$/, "$1-$2")
		return cep
	}

	/**
	 * Method called, when the CEP input field loses focus, to check if the input 
	 * value is valid aplying 'is-invalid' class if not valid.
	 */
	validate() {
		if (this.el_cep.value.length < 9) {
		 this.el_cep.classList.add('is-invalid');
		}
	}
}

// Calling the class CepInput constructor to all class cep inputs na DOM
document.querySelectorAll('.cep').forEach(function(cepInput) {
	new CepInput(cepInput.id);
});