import { assign, isObject } from "es-toolkit/compat";

// 显式定义模块类型
type Module = { default?: Record<string, string> };

const modules = import.meta.glob<Module>("./modules/*.ts", { eager: true });
const pageLocale = import.meta.glob<Module>("@/**/*.zh.ts", {
  eager: true,
});

function formatModules(
  _modules: Record<string, { default?: Record<string, string> }>,
  result: Record<string, string>,
) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default;
    if (!defaultModule) return;
    const moduleList = isObject(defaultModule) ? { ...defaultModule } : {};
    assign(result, moduleList);
  });
  return result;
}

export const zh: Record<string, string> = formatModules(modules, {});
export const pageZh: Record<string, string> = formatModules(pageLocale, {});

export default { ...zh, ...pageZh };
