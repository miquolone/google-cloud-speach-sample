
const ora = require('ora');

module.exports = class Base {

  spinner = ora().start();

  cli (text) {
    this.spinner.color = 'yellow';
    if (text) {
      this.spinner.text = text;
    } else {
      this.spinner.stop();
    }
  }

}
