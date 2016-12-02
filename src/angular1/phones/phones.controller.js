export const PHONE_LIST_CONTROLLER_NAME = 'PhoneListController'

export default class PhoneListController {
  constructor() {
    this.snippet = `
      <p style="color:blue">an html
        <em onmouseover="this.textContent=\'PWN3D!\'">click here</em>
        snippet
      </p>
    `;

    // this.deliberatelyTrustDangerousSnippet = function() {
    //   var trusted = $sce.trustAsHtml(this.snippet);
    //   return trusted;
    // };

    this.phones = [
      {
        id: 1,
        name: 'Nexus S',
        snippet: 'Fast just got faster with Nexus S.'
      }, {
        id: 2,
        name: 'Motorola XOOM™ with Wi-Fi',
        snippet: 'The Next, Next Generation tablet.'
      }, {
        id: 3,
        name: 'MOTOROLA XOOM™',
        snippet: 'The Next, Next Generation tablet.'
      }
    ];
    // CSP test
    this.counter = 0;
  }

  inc() {
    this.counter++;
  };

  evil() {
    try {
      console.log(eval('1+2')); // eslint-disable-line no-eval
    } catch (e) {
      this.evilError = e.message;
    }
  };

  getFirstPhone() {
    return this.phones[0];
  }

  enterKey($event, value) {
    if($event.keyCode === 13) {
      this.selectedValue = value;
    }
  }
}
