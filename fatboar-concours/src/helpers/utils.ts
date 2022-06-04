import { format } from "date-fns";
import fr from "date-fns/locale/fr";

export const formatDate = (
  value: Date | number | string,
  dateFormat: string
): string => format(new Date(value), dateFormat, { locale: fr });

export const OuiNon = (value) => {
  return value === true ? "Oui" : "Non";
};

export const convertToCSV = (objArray, headerList): string => {
  const array = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
  let str = "";
  let row = "S.No,";
  // tslint:disable-next-line: forin
  for (const index in headerList) {
    row += headerList[index] + ",";
  }
  row = row.slice(0, -1);
  str += row + "\r\n";
  for (let i = 0; i < array.length; i++) {
    let line = i + 1 + "";
    // tslint:disable-next-line: forin
    for (const index in headerList) {
      const head = headerList[index];
      line += "," + array[i][head];
    }
    str += line + "\r\n";
  }
  return str;
};

export const isMobile = () => {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    return true;
  } else {
    return false;
  }
};
