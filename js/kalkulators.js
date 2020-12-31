/**
 * Select DOM nodes
 */
const   form = document.querySelector('#calculator'),
        // Input nodes
        sum = document.querySelector('#sum'),
        percent = document.querySelector('#percent'),
        term = document.querySelector('#term'),
        // Result nodes
        monthly = document.querySelector('#monthly'),
        total = document.querySelector('#total'),
        // Error nodes
        sumError = sum.nextElementSibling.querySelector('p'),
        percentError = percent.nextElementSibling.querySelector('p'),
        termError = term.nextElementSibling.querySelector('p');


// Prevent default browser validation
form.noValidate = true;

/**
 * Set Event listeners
 */
form.addEventListener('submit', function(event){
    event.preventDefault();
    validate();
});
for (let input of form.elements) {
    // Skip if type submit
    if (input.type.toLowerCase() === 'submit') continue;

    input.addEventListener('input', calculate);

    input.addEventListener('focus', function(){
        input.wasActive = true; // Lai sekotu līdzi kuri lauki tika aktivizēti. Attiecīgi pēc kāda skaita var izvadīt kļūdas.
    });
}
/**
 * Payment object
 */
var payment = {
    // Formula
    monthly: function()
    {
        let gpl = percent.value/1200;
        return ( sum.value * gpl ) / ( 1 - Math.pow(1+gpl, term.value*-1));
    },
    total: function()
    {
        return this.monthly() * term.value;
    }
};
/**
 * Atgriež cik formas lauki bija iezīmēti.
 */
function activated()
{
    let count = 0;
    for (let input of form.elements) {
        if (input.wasActive) count++;
    }
    return count;
}

/**
 * Pārbauda un izvada kļūdas.
 */
function validate()
{
    // Sum required.
    if (sum.validity.valueMissing) {
        sum.setCustomValidity("Lūdzu, ievadiet summu.");
        sumError.innerText = sum.validationMessage;
    
    // Sum underflow.
    } else if (sum.validity.rangeUnderflow) {
        sum.setCustomValidity("Minimālā aizņēmuma summa ir 100 \u20AC.");
        sumError.innerText = sum.validationMessage;
    
    // Sum overflow.
    } else if (sum.validity.rangeOverflow) {
    sum.setCustomValidity("Maksimālā aizņēmuma summa ir 1000000 \u20AC.");
    sumError.innerText = sum.validationMessage;
    // Reset sum errors.
    } else {
        sum.setCustomValidity('');
        sumError.innerText = "";
    }
    // Percent required
    if (percent.validity.valueMissing) {
        percent.setCustomValidity("Lūdzu, izvēlieties procentu likmi.");
        percentError.innerText = percent.validationMessage;
    // Reset percent errors.
    } else {
        sum.setCustomValidity('');
        percentError.innerText = "";
    }

    // Term required
    if (term.validity.valueMissing) {
        term.setCustomValidity("Lūdzu, izvēlieties nomaksas termiņu.");
        termError.innerText = term.validationMessage;
    // Reset term errors.
    } else {
        term.setCustomValidity("");
        termError.innerText = "";
    }
}

function calculate()
{

    /**
     *  Ja lauki tika iezīmēti rādam kļūdas
     */
    if (activated() == form.elements.length-1) {
        validate();
    }

    if (payment.total() && sum.value >= 100 && sum.value <= 1000000) {
        monthly.innerText = payment.monthly().toFixed(2) + ' \u20AC';
        total.innerText = payment.total().toFixed(2) + ' \u20AC';
    }
}
