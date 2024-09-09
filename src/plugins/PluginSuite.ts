import { ViewPlugin } from "../types/ViewPlugin";
import {
  jsonPlugin,
  codePlugin,
  treePlugin,
  jsonCodePlugin,
} from "./basePlugins";

class PluginSuite {
  private plugins: ViewPlugin[] = [];

  constructor() {
    this.addBasePlugins();
    return this;
  }

  getBasePlugins() {
    return [jsonPlugin, codePlugin, treePlugin, jsonCodePlugin];
  }

  addBasePlugins() {
    this.getBasePlugins().forEach((plugins) => this.addPlugin(plugins));
    return this;
  }

  getPluginsMap() {
    return Object.fromEntries(
      this.plugins.map((plugin) => [plugin.key, plugin])
    );
  }

  getPlugins() {
    return this.plugins;
  }

  addPlugin(plugin: ViewPlugin) {
    if (!this.hasPlugin(plugin.key)) {
      this.plugins.push(plugin);
    }
  }

  hasPlugin(key: string) {
    return this.plugins.some((plugin) => plugin.key === key);
  }

  removePlugin(key: string) {
    this.plugins = this.plugins.filter((plugin) => plugin.key !== key);
  }

  clearPlugins() {
    this.plugins = [];
  }
}

export const pluginSuite = new PluginSuite();

export const pluginsMapSymbol = Symbol("pluginsMap");
