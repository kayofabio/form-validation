const formValidator = {
    checkFormToSend: (e) => {
        e.preventDefault();

        let send = true;

        let inputs = document.querySelectorAll('.input-field');

        formValidator.clearErrors();

        inputs.forEach(input => {
            let check = formValidator.checkInput(input);
            if (check !== true) {
                send = false;
                let msgError = check;
                formValidator.showError(input, msgError);
            }
        })

        if (send) {
            form.submit();
        }
    },
    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');
        if (rules !== null) {
            let listRules = rules.split('|');
            for (let i in listRules) {
                let listRulesDetails = listRules[i].split('=');
                switch (listRulesDetails[0]) {
                    case 'required':
                        if (input.value === '') {
                            return 'campo obrigátorio'
                        }
                        break;
                    case 'min':
                        if(input.value.length < listRulesDetails[1]) {
                            return `dados inválida(mínimo ${listRulesDetails[1]} caracteres)`;
                        }
                        break;
                    case 'email': 
                        if(input.value !== '') {
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'email inválido'
                            }
                        }
                }
            }
        };

        return true
    },
    showError: (input, msgError) => {
        input.style.borderColor = '#f00';

        let errorElement = document.createElement('p');
        errorElement.classList.add('msg-error');
        errorElement.innerHTML = msgError;

        input.parentElement.insertBefore(errorElement, input.elementSibling);
    },
    clearErrors: () => {

        let inputs = document.querySelectorAll('.input-field');
        inputs.forEach(input => input.style.borderColor = '#fff')

        let errosElements = document.querySelectorAll('.msg-error');
        errosElements.forEach(errorElement => errorElement.remove());
    },
};
const form = document.querySelector('.form-field');
form.addEventListener('submit', formValidator.checkFormToSend);