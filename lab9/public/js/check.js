(function () {
    const primeMethods = {
        checkPrime(num) {
            if (arguments.length !== 1) throw `Error: function checkPrime() expected 1 parameters but instead received ${arguments.length}`;
            if (typeof (num) !== 'number') throw `Error: function checkPrime() expected num to be a number but instead recieved a ${typeof (num)}`;

            if (num <= 1) return false;

            for (i = 2; i < num / 2 + 1; i++) {
                if (num % i === 0) return false;
            }

            return true;
        }
    };

    const staticForm = document.getElementById("static-form");

    if (staticForm) {
        // We can store references to our elements; it's better to
        // store them once rather than re-query the DOM traversal each time
        // that the event runs.
        const numElement = document.getElementById("inputNum");

        const list = document.getElementById('primeList');

        const errorContainer = document.getElementById("errorInfo");
        const errorTextElement = errorContainer.getElementsByClassName(
            "text-goes-here"
        )[0];


        // We can take advantage of functional scoping; our event listener has access to its outer functional scope
        // This means that these variables are accessible in our callback
        staticForm.addEventListener("submit", event => {
            event.preventDefault();

            try {
                // hide containers by default
                list.classList.add("hidden");

                // Values come from inputs as strings, no matter what :(
                const numValue = numElement.value;

                if (numValue === "") throw "No Input Entered";

                const parsedNumValue = parseInt(numValue);
                const entry = document.createElement('li');
                if (primeMethods.checkPrime(parsedNumValue)) {
                    entry.appendChild(document.createTextNode(`${parsedNumValue} is a Prime Number`));
                    entry.classList.add("is-prime");
                }
                else {
                    entry.appendChild(document.createTextNode(`${parsedNumValue} is NOT a Prime Number`));
                    entry.classList.add("not-prime");
                }
                list.appendChild(entry);
                list.classList.remove("hidden");
            } catch (e) {
                errorTextElement.textContent = e;
                errorContainer.classList.remove("hidden");
                staticForm.classList.add("hidden");
            }
        });
    }
})();