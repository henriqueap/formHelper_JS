/** 
 * Class PhoneInput																							
 * A JavaScript class which encapsulates the functionality of validating and masking 
 * a brazilian phone number input. It includes methods for each task and binds them 
 * to the instance in the constructor.
 * 
 * @author Henrique Emanuel de Araújo Pereira.
 * @powered_by BLACKBOX AI.
 * @date 2023-12-22.
*/

/**
 * @class PhoneInput
 * @classdesc Manages a telephone input field, adding event listeners and masking the 
 * input.
 */
class PhoneInput {
	/**
	 * Constructor, initializes event listeners for the input element.
	 * @param {string} inputID - The input element id.
	 */
	constructor(inputID) {
    this.el_phone = document.getElementById(inputID);
		
		// Event listeners
		this.el_phone.addEventListener('blur', this.validate.bind(this));
		this.el_phone.addEventListener('focus', this.clearInvalid.bind(this));
		this.el_phone.addEventListener('keyup', this.applyMask.bind(this));
	}
	
	/**
	 *  Method called, when a key is released inside the phone input field to apply 
	 *  a mask to the input value.
	 */
	applyMask() {
		this.el_phone.value = this.phoneMask(this.el_phone.value);
	}

	/**
	 * Method called, when the phone input field gains focus, to clear 'is-invalid' 
	 * class.
	 */
	clearInvalid() {
		this.el_phone.classList.remove('is-invalid');
	}

		/**
	 * Method to apply a brazilian telephone number mask to a phone input value.
	 * @param {string} phone  - The phone number to be formatted.
	 * @returns {string} - The formatted phone number.
	 */
	phoneMask(phone) {
		if (!phone) return ""
		phone = phone.replace(/\D/g, '')
		phone = phone.replace(/(\d{2})(\d)/, "($1) $2")
		phone = phone.replace(/(\d)(\d{4})$/, "$1-$2")
		return phone
	}

	/**
	 * Method called, when the phone input field loses focus, to check if the input 
	 * value is valid aplying 'is-invalid' class if not valid.
	 */
	validate() {
		if (this.el_phone.value.length < 14) {
		 this.el_phone.classList.add('is-invalid');
		}
	}
}

// Calling the class PhoneInput constructor to all class cep inputs na DOM
document.querySelectorAll('.phone').forEach(function(foneInput) {
	new PhoneInput(foneInput.id);
});