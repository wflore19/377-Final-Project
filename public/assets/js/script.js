const currentPage = window.location.pathname;

if (currentPage === '/') {
      const likeForm = document.querySelector("[id^='like-quote']");
      const unlikeForm = document.querySelector("[id^='unlike-quote']");

      if (likeForm) {
            likeForm.addEventListener('submit', async (event) => {
                  event.preventDefault();
                  const formData = new FormData(event.target);
                  const quoteId = formData.get('quoteId');

                  try {
                        const response = await likeQuote(quoteId);

                        if (response.status === 201) {
                              likeForm.remove();
                              renderUnlikeForm(quoteId);
                        }
                  } catch (error) {
                        console.error('Error liking quote:', error);
                  }
            });
      }

      if (unlikeForm) {
            unlikeForm.addEventListener('submit', async function (event) {
                  event.preventDefault();
                  const formData = new FormData(event.target);
                  const quoteId = formData.get('quoteId');

                  try {
                        const response = await unlikeQuote(quoteId);

                        if (response.status === 201) {
                              unlikeForm.remove();
                              renderLikeForm(quoteId);
                        }
                  } catch (error) {
                        console.error(error);
                  }
            });
      }
} else if (currentPage === '/about') {
} else if (currentPage === '/project') {
} else if (currentPage === '/quotes') {
      const quotesListEl = document.querySelectorAll('.quote');

      quotesListEl.forEach((quoteEl) => {
            const quoteId = quoteEl.id.split('-')[1];
            const unlikeForm = document.querySelector(
                  `#unlike-quote-${quoteId}`
            );

            if (unlikeForm) {
                  unlikeForm.addEventListener('submit', async function (event) {
                        event.preventDefault();
                        const formData = new FormData(event.target);
                        const quoteId = formData.get('quoteId');

                        try {
                              const response = await unlikeQuote(quoteId);

                              if (response.status === 201) quoteEl.remove();
                        } catch (error) {
                              console.error(error);
                        }
                  });
            }
      });
}

const mobileNavIcon = document.getElementById('mobile-nav-icon');
mobileNavIcon.addEventListener('click', () => {
      const mobileNavMenu = document.getElementById('mobile-nav-menu');
      mobileNavMenu.classList.toggle('hidden');
});

const dateEl = document.getElementById('date');
const date = document.createElement('span');
date.textContent = dayjs().format('MMMM D, YYYY');
dateEl.appendChild(date);
const spanEl = document.createElement('span');
spanEl.style.fontSize = '0.7em';
spanEl.style.fontStyle = 'italic';
spanEl.textContent = ' powered by ';
dateEl.appendChild(spanEl);
const dayjsLink = document.createElement('a');
dayjsLink.href = 'https://day.js.org/';
dayjsLink.textContent = 'Day.js';
spanEl.appendChild(dayjsLink);

/**
 * Fetch request to like a quote.
 * Expects `quoteId` in the request body.
 * Uses `user_id` from cookies to identify the user.
 * @returns {Promise<Response>} The fetch response.
 * @throws Will throw an error if the fetch operation fails.
 */
async function likeQuote(quoteId) {
      try {
            const response = await fetch('/quotes/like', {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ quoteId: quoteId }),
            });
            if (response.status === 409)
                  throw new Error('Quote already liked by user');

            if (response.status !== 201)
                  throw new Error('Failed to like quote');

            return response;
      } catch (error) {
            throw error;
      }
}

/**
 * Fetch request to unlike a quote.
 * Expects `quoteId` in the request body.
 * Uses `user_id` from cookies to identify the user.
 * @returns {Promise<Response>} The fetch response.
 * @throws Will throw an error if the fetch operation fails.
 */
async function unlikeQuote(quoteId) {
      try {
            const response = await fetch('/quotes/unlike', {
                  method: 'DELETE',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ quoteId: quoteId }),
            });
            if (!response.ok) throw new Error('Failed to unlike quote');

            return response;
      } catch (error) {
            throw error;
      }
}

/** Render like form
 * @returns {string} HTML for the like form.
 */
function renderLikeForm(quoteId) {
      const formContainerEl = document.getElementById('formContainer');

      const form = document.createElement('form');
      form.id = 'like-quote';
      form.method = 'POST';

      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'quoteId';
      input.value = quoteId;
      form.appendChild(input);

      const button = document.createElement('button');
      button.type = 'submit';
      button.id = 'like-submit-btn';
      button.textContent = 'Like';
      form.appendChild(button);

      const icon = document.createElement('img');
      icon.src = './icons/heart-3-line.svg';
      icon.alt = 'Like Icon';
      icon.id = 'like-icon';
      icon.width = 16;
      icon.height = 16;
      button.appendChild(icon);

      form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const quoteId = formData.get('quoteId');

            try {
                  const response = await likeQuote(quoteId);

                  if (response.status === 201) {
                        form.remove();
                        renderUnlikeForm(quoteId);
                  }
            } catch (error) {
                  console.error('Error liking quote:', error);
            }
      });

      formContainerEl.appendChild(form);
}

/** Render unlike form
 * @returns {string} HTML for the unlike form.
 */
function renderUnlikeForm(quoteId) {
      const formContainerEl = document.getElementById('formContainer');

      const form = document.createElement('form');
      form.id = `#unlike-quote-${quoteId}`;
      form.method = 'POST';

      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'quoteId';
      input.value = quoteId;
      form.appendChild(input);

      const button = document.createElement('button');
      button.type = 'submit';
      button.id = 'unlike-submit-btn';
      button.textContent = 'Unlike';
      form.appendChild(button);

      const icon = document.createElement('img');
      icon.src = './icons/heart-3-fill.svg';
      icon.alt = 'Unlike Icon';
      icon.id = 'unlike-icon';
      icon.width = 16;
      icon.height = 16;
      button.appendChild(icon);

      form.addEventListener('submit', async function (event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const quoteId = formData.get('quoteId');

            try {
                  const response = await unlikeQuote(quoteId);

                  if (response.status === 201) {
                        form.remove();
                        renderLikeForm(quoteId);
                  }
            } catch (error) {
                  console.error(error);
            }
      });

      formContainerEl.appendChild(form);
}
