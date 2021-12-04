import * as sucrase from 'sucrase';

export function transform(input: string) {
  try {
    const codeTrimmed = input.trim().replace(/;$/, '');

    const { code } = sucrase.transform(codeTrimmed, {
      transforms: ['typescript', 'jsx', 'imports'],
      enableLegacyBabel5ModuleInterop: true,
      enableLegacyTypeScriptModuleInterop: true,
    });
    return code;
  } catch (err) {
    console.log(err);
    return err;
  }
}
