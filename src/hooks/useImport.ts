/**
 * @author: ThaiND
 * Created Date: Mon Jun 13 2022
 * @description:
 * @param path: string
 * @returns:
 * @example:
 */

const ImportFolder = (r: __WebpackModuleApi.RequireContext) => {
  let images: any = {};
  r.keys().forEach((item: string, index: any) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
};
/**
 *
 * @param path : string
 * @returns array of images
 */
const ImportImages = (path: string) => {
  if (path === "") {
    return {};
  }
  let r;
  if (path.includes("/")) {
    r = require.context(path, false, /\.(png|jpe?g|svg)$/);
  } else {
    r = require.context(
      `../../assets/images/${path}`,
      false,
      /\.(png|jpe?g|svg)$/
    );
  }

  const images = ImportFolder(r);
  return images;
};

export { ImportImages, ImportFolder };
