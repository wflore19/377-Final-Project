const currentPage = window.location.pathname;

if (currentPage === "/") {
    const likeForm = document.querySelector("#like-quote");
    const submitBtn = document.querySelector("#like-submit-btn");

    if (likeForm) {
        likeForm.addEventListener("submit", async function(event) {
            event.preventDefault();

            try {
                const formData = new FormData(event.target);
                const quoteId = formData.get("quoteId");
                const quoteText = formData.get("quoteText");
                const quoteAuthor = formData.get("quoteAuthor");
            
                const response = await fetch("/quotes/like", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ quoteId: quoteId, quoteText: quoteText, quoteAuthor: quoteAuthor })
                });

                const result = await response.json();

                if (result.success) {
                    submitBtn.disabled = true;
                }
            } catch (error) {
                console.error("Error liking quote:", error);
                console.log("There was an error liking the quote. Please try again.");
            }
        });
    }
}
else if (currentPage === "/about") {}
else if (currentPage === "/project") {}
else if (currentPage === "/quotes") {
    const quotesListEl = document.querySelectorAll(".quote");
    console.log("Quotes list element:", quotesListEl);

    quotesListEl.forEach((quoteEl) => {
        const quoteId = quoteEl.id.split("-")[1];
        const unlikeForm = document.querySelector(`#unlike-quote-${quoteId}`);
    
        if (unlikeForm) {
            unlikeForm.addEventListener("submit", async function(event) {
                event.preventDefault();
            
                try {
                    const formData = new FormData(event.target);
                    const quoteId = formData.get("quoteId");
                    const quoteText = formData.get("quoteText");
                    const quoteAuthor = formData.get("quoteAuthor");
                
                    const response = await fetch("/quotes/unlike", {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ quoteId: quoteId, quoteText: quoteText, quoteAuthor: quoteAuthor })
                    });
    
                    const result = await response.json();
                    console.log("Quote successfully unliked:", result);
    
                    if (result.success) {
                        const quoteEl = document.getElementById(`quote-${quoteId}`);
                        if (quoteEl) {
                            quoteEl.remove();
                        }
                    }
    
                } catch (error) {
                    console.error("Error unliking quote:", error);
                    console.log("There was an error unliking the quote. Please try again.");
                }
            });
        }
    })
}
