const form = document.querySelector("#like-quote");
form.addEventListener("submit", function(event) {
    event.preventDefault();

    try {
        const formData = new FormData(event.target);
        const quoteId = formData.get("quoteId");
        const quoteText = formData.get("quoteText");
        const quoteAuthor = formData.get("quoteAuthor");
    
        const response = fetch("/quotes/like", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ quoteId: quoteId, quoteText: quoteText, quoteAuthor: quoteAuthor })
        });
    
        console.log("You liked the quote!");
    } catch (error) {
        console.error("Error liking quote:", error);
        console.log("There was an error liking the quote. Please try again.");
    }
});
console.log(form);
