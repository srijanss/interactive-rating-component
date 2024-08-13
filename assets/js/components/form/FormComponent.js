import css from "./FormComponent.css?inline";

export default class FormComponent extends HTMLElement {
  constructor() {
    super();
    this.ratings = [1, 2, 3, 4, 5];
  }

  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        ${css}
      </style>
      <article class="rating-form__block">
        <figure>
          <img src="assets/images/icon-star.svg" alt="Star icon" />
        </figure>
        <h1>How did we do?</h1>
        <p>Please let us know how we did with your support request. All feedback is appreciated to help us improve our offering!</p>
        <form id="rating-form">
          <fieldset>
            <legend hidden>Rating</legend>
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
        </form>
      </article> 
      <result-component hidden></result-component>
    `;
  }
}
