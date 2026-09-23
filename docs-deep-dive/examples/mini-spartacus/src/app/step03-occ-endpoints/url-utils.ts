/**
 * STEP 03 - Utility per costruire gli URL
 * Ispirato a:
 *  - core-libs/core/src/config/utils/string-template.ts (StringTemplate.resolve)
 *  - core-libs/core/src/occ/utils/occ-url-util.ts       (urlPathJoin)
 */

/** Sostituisce ${nome} con il valore (codificato per URL) di templateVariables[nome]. */
export function resolveTemplate(template: string, variables: Record<string, unknown>, encode = true): string {
  let result = template;
  for (const [name, value] of Object.entries(variables)) {
    const placeholder = new RegExp('\\$\\{' + name + '\\}', 'g');
    const text = String(value ?? '');
    result = result.replace(placeholder, encode ? encodeURIComponent(text) : text);
  }
  return result;
}

/** Unisce pezzi di URL con un solo '/' tra l'uno e l'altro, tenendo lo '/' iniziale e finale. */
export function urlPathJoin(...parts: (string | undefined)[]): string {
  const present = parts.filter((part): part is string => !!part);
  if (!present.length) {
    return '';
  }
  const cleaned = present.map((part) => part.replace(/^\/+/, '').replace(/\/+$/, '')).filter((p) => p.length);
  let joined = cleaned.join('/');
  if (present[0].startsWith('/')) {
    joined = '/' + joined;
  }
  if (present[present.length - 1].endsWith('/') && present.length > 1) {
    joined += '/';
  }
  return joined;
}
