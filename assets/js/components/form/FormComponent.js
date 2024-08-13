import css from "./FormComponent.css?inline";
import Store from "../store";

export default class FormComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });
    this.render();
    this.errorMessage = this.shadow.querySelector(".error");
    this.handleRatingChange();
    this.handleFormSubmit();
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        ${css}
      </style>
      <article class="rating-form__block">
        <figure>
          <img src="assets/images/icon-star.svg" alt="Rating icon" />
          <figcaption class="visually-hidden">Rating icon</figcaption>
        </figure>
        <h1>How did we do?</h1>
        <p>Please let us know how we did with your support request. All feedback is appreciated to help us improve our offering!</p>
        <form id="rating-form">
          <fieldset>
            <legend class="visually-hidden">Select a rating score</legend>
            ${Store.ratings
              .map(
                (rating) =>
                  `
                <label for="star${rating}" title="1 Star" class="rating-label">
                  <input type="radio" id="star${rating}" name="rating" value="${rating}" />
                  <span>${rating}</span>
                </label>
              `
              )
              .join("")}
          </fieldset>
          <button type="submit">Submit</button>
          <p class="error" hidden>Please select a rating before submitting</p>
        </form>
      </article> 
      <result-component hidden></result-component>
    `;
  }

  handleRatingChange() {
    const radioButtons = this.shadow.querySelectorAll('input[type="radio"]');
    Array.from(radioButtons).forEach((radioButton) => {
      radioButton.addEventListener("change", (event) => {
        this.errorMessage.hidden = true;
      });
    });
  }

  handleFormSubmit() {
    const form = this.shadow.querySelector("#rating-form");
    const formArticle = this.shadow.querySelector(".rating-form__block");
    const resultComponent = this.shadow.querySelector("result-component");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      if (!data.rating) {
        this.errorMessage.hidden = false;
        return;
      }
      Store.currentRating = data.rating;
      resultComponent.render();
      formArticle.setAttribute("style", "display: none");
      form.reset();
    });
  }
}
