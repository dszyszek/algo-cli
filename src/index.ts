import { CLI, ICLIAbstract } from './classes/CLI';

(() => {
  const cli: ICLIAbstract = new CLI();
  cli.start();
})();
