import { LitElement, html, css } from 'lit';
import { name, ButtonTokens } from './const';

const tokens = new CSSStyleSheet();
tokens.replaceSync(`
  button {
    color: ${ButtonTokens.TextColor()};
    background-color: ${ButtonTokens.Background()};
    border-color: ${ButtonTokens.BorderColor()};
    border-radius: ${ButtonTokens.Radius()};
    gap: ${ButtonTokens.Gap('8px')};
    font-size: ${ButtonTokens.TextSize('1rem')}
  }
  button:active {
    border-color: ${ButtonTokens.BorderColorActive()};
  }
  button:disabled {
    border-color: ${ButtonTokens.BorderColorDisabled()};
    color: ${ButtonTokens.TextColorDisabled()};
  }
`);

export class BCButton extends LitElement {
  static properties = {
    disabled: { type: Boolean, reflect: true },
  };
  connectedCallback() {
    super.connectedCallback();
    this.renderRoot.adoptedStyleSheets.push(tokens);
  }
  render() {
    return html`<button ?disabled=${this.disabled}>
      <slot name="start-icon"></slot>
      <slot></slot>
      <slot name="end-icon"></slot>
    </button>`;
  }
  static styles = css`
    :host {
      display: contents;
    }
    button {
      cursor: pointer;
      user-select: none;
      border: 2px solid;
      border-bottom-width: 4px;
      padding-inline: 14px;
      padding-block: 7px;
      display: inline-flex;
      align-items: center;
    }
    button:disabled {
      cursor: not-allowed;
    }
  `;
  static register() {
    if (customElements && !customElements.get(name)) {
      customElements.define(name, BCButton);
    }
  }
  static name = name;
}
