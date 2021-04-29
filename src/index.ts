import CLIService from './services/CLIService/CLIService';

(() => {
  const cli: CLIService = new CLIService();
  cli.start();
})();
