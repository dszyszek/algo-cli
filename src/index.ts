import { ICLIAbstract } from './classes/CLI';
import CLIService from './services/CLIService/CLIService';

(() => {
  const cli: ICLIAbstract = new CLIService();
  cli.start();
})();
