function CodeEnv () {
  this.terminal = [];
}

CodeEnv.prototype.writeToTerminal = function (s) {
  this.terminal.push(s);
}
CodeEnv.prototype.output = function () {
  return this.terminal;
}
CodeEnv.prototype.clearTerminal = function () {
  this.terminal.splice(0);
}
export default CodeEnv;
