document.addEventListener('DOMContentLoaded', function () {
    var taxForm = document.getElementById('taxForm');
    taxForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm()) {
            calculateTax();
        }
    });

    function validateForm() {
        var isValid = true;

        // Reset error icons
        var errorIcons = document.querySelectorAll('.error-icon');
        errorIcons.forEach(function (icon) {
            icon.style.display = 'none';
        });

        // Validate each field
        var grossIncome = document.getElementById('grossIncome').value;
        if (grossIncome === '') {
            document.getElementById('grossIncomeError').style.display = 'inline';
            isValid = false;
        }
        var extraIncome = document.getElementById('extraIncome').value;
        if (extraIncome === '') {
            document.getElementById('extraIncomeError').style.display = 'inline';
            isValid = false;
        }
        var deductions = document.getElementById('deductions').value;
        if (deductions === '') {
            document.getElementById('deductionsError').style.display = 'inline';
            isValid = false;
        }

        // Validate age dropdown
        var age = document.getElementById('age').value;
        if (age === '') {
            document.getElementById('ageError').style.display = 'inline';
            isValid = false;
        }

        return isValid;
    }

    function calculateTax() {
        // Get inputs
        var grossIncome = parseFloat(document.getElementById('grossIncome').value);
        var extraIncome = parseFloat(document.getElementById('extraIncome').value || 0);
        var deductions = parseFloat(document.getElementById('deductions').value || 0);
        var ageCategory = document.getElementById('age').value;

        // Calculate taxable income
        var taxableIncome = grossIncome + extraIncome - deductions - 800000;

        // Calculate tax based on age category
        var taxRate;
        switch (ageCategory) {
            case '<40':
                taxRate = 0.3;
                break;
            case '>=40&<60':
                taxRate = 0.4;
                break;
            case '>=60':
                taxRate = 0.1;
                break;
            default:
                taxRate = 0;
        }
        var taxAmount = Math.max(taxableIncome * taxRate, 0);

        // Display result in modal
        var resultModalBody = document.querySelector('#resultModal .modal-body');
        resultModalBody.innerHTML = '<p>Tax Amount: ' + taxAmount.toFixed(2) + ' Lakhs</p>';
        $('#resultModal').modal('show');
    }
});
