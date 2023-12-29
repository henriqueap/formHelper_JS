/** 
 * Class CpfInput																							
 * A JavaScript class which encapsulates the functionality of validating and masking 
 * a brazilian CPF number input. It includes methods for each task and binds them 
 * to the instance in the constructor.
 * 
 * @author Henrique Emanuel de Araújo Pereira.
 * @powered_by BLACKBOX AI.
 * @date 2023-12-22.
*/

/**
 * @class CpfInput
 * @classdesc Manages a CPF input field, adding event listeners and masking the 
 * input.
 */
class CpfInput {
	/**
	 * Constructor, initializes event listeners for the input element.
	 * @param {string} inputID - The input element id.
	 */
	constructor(inputID) {
    this.el_cpf = document.getElementById(inputID);
		
		// Event listeners
		this.el_cpf.addEventListener('blur', this.validate.bind(this));
		this.el_cpf.addEventListener('focus', this.clearInvalid.bind(this));
		this.el_cpf.addEventListener('keyup', this.applyMask.bind(this));
	}
	
	/**
	 *  Method called, when a key is released inside the CPF input field to apply 
	 *  a mask to the input value.
	 */
	applyMask() {
		this.el_cpf.value = this.cpfMask(this.el_cpf.value);
	}

	/**
	 * Method called, when the CPF input field gains focus, to clear 'is-invalid' 
	 * class.
	 */
	clearInvalid() {
		this.el_cpf.classList.remove('is-invalid');
	}

		/**
	 * Method to apply a brazilian CPF number mask to a input value.
	 * @param {string} cpf  - The CPF number to be formatted.
	 * @returns {string} - The formatted CPF number.
	 */
	cpfMask(cpf) {
		if (!cpf) return ""
		if (!cpf) return ""
		cpf = cpf.replace(/\D/g, '')
		cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})/, "$1.$2.$3")
		cpf = cpf.replace(/(\d)(\d{2})$/, "$1-$2")
		return cpf
	}

	/**
	 * Method to validate a brazilian CPF number
	 * @param {string} cpf - The CPF number to be validated.
	 * @returns {boolean} - True if validated or false otherwise 
	 */
	validaCPF(cpf) {
		var add = 0;
		var rev = 0;
		cpf = cpf.replace(/[^\d]+/g, '');
		if (cpf == '') return false;
		// Elimina CPFs invalidos conhecidos	
		if (cpf.length != 11 ||
			cpf == "00000000000" ||
			cpf == "11111111111" ||
			cpf == "22222222222" ||
			cpf == "33333333333" ||
			cpf == "44444444444" ||
			cpf == "55555555555" ||
			cpf == "66666666666" ||
			cpf == "77777777777" ||
			cpf == "88888888888" ||
			cpf == "99999999999")
			return false;
		// Valida 1o digito	
		add = 0;
		for (let i = 0; i < 9; i++)
			add += parseInt(cpf.charAt(i)) * (10 - i);
		rev = 11 - (add % 11);
		if (rev == 10 || rev == 11)
			rev = 0;
		if (rev != parseInt(cpf.charAt(9)))
			return false;
		// Valida 2o digito	
		add = 0;
		for (let i = 0; i < 10; i++)
			add += parseInt(cpf.charAt(i)) * (11 - i);
		rev = 11 - (add % 11);
		if (rev == 10 || rev == 11)
			rev = 0;
		if (rev != parseInt(cpf.charAt(10)))
			return false;
		return true;
	}

	/**
	 * Method called, when the CPF input field loses focus, to check if the input 
	 * value is valid aplying 'is-invalid' class if not valid.
	 */
	validate() {
		if (this.validaCPF(this.el_cpf.value) === false) {
		 this.el_cpf.classList.add('is-invalid');
		}
	}
}

// Calling the class CpfInput constructor to all class cpf inputs na DOM
document.querySelectorAll('.cpf').forEach(function(input) {
	new CpfInput(input.id);
});