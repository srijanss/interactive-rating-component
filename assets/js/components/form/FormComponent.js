import css from "./FormComponent.css?inline";
import StarIcon from "../../../../assets/images/icon-star.svg";

export default class FormComponent extends HTMLElement {
  constructor() {
    super();
    this.ratings = [1, 2, 3, 4, 5];
    this.baseURL = import.meta.env.BASE_URL;
  }

  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });
    this.renderHandler();
  }

  renderHandler() {
    // history.pushState({ currentRating: null }, null, `${this.baseURL}/`);
    this.render();
    this.errorMessage = this.shadow.querySelector(".error");
    this.handleRatingChange();
    this.handleFormSubmit();
    this.handleOnPopState();
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        ${css}
      </style>
      <article class="rating-form__block">
        <figure>
          <img src="${StarIcon}" alt="Rating icon" />
          <figcaption class="visually-hidden">Rating icon</figcaption>
        </figure>
        <h1>How did we do?</h1>
        <p>Please let us know how we did with your support request. All feedback is appreciated to help us improve our offering!</p>
        <form id="rating-form">
          <fieldset>
            <legend class="visually-hidden">Select a rating score</legend>
            ${this.ratings
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
      <result-component></result-component>
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
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      if (!data.rating) {
        this.errorMessage.hidden = false;
        return;
      }
      this.navigateToResultView(data.rating);
      form.reset();
    });
  }

  navigateToResultView(currentRating) {
    const resultComponent = this.shadow.querySelector("result-component");
    history.pushState({ currentRating }, null, `${this.baseURL}/`);
    const resultRendered = resultComponent.render();
    if (resultRendered) {
      this.hideFormView();
    }
  }

  hideFormView() {
    const formArticle = this.shadow.querySelector(".rating-form__block");
    formArticle.setAttribute("style", "display: none");
  }

  handleOnPopState() {
    window.addEventListener("popstate", () => {
      this.renderHandler();
    });
  }
}
