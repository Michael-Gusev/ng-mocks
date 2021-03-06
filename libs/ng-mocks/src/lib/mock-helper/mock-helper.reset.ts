import coreConfig from '../common/core.config';
import ngMocksUniverse from '../common/ng-mocks-universe';

export default (): void => {
  ngMocksUniverse.builtDeclarations = new Map();
  ngMocksUniverse.builtProviders = new Map();
  ngMocksUniverse.cacheDeclarations = new Map();
  ngMocksUniverse.cacheProviders = new Map();
  ngMocksUniverse.config = new Map();
  ngMocksUniverse.configInstance = new Map();
  ngMocksUniverse.flags = new Set(coreConfig.flags);
  ngMocksUniverse.touches = new Set();
};
