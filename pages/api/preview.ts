import fs from "fs";
import AdmZip from "adm-zip";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const index = fs.readFileSync(`./public/static/default/index.html`, `utf8`);

  const fixedIndex = index.replace(/\.link\(\)/g, ``);
  const replacedIndex = fixedIndex
    .replace(`{{firstName}}`, req.body.firstName)
    .replace(`{{lastName}}`, req.body.lastName)
    .replace(`{{function}}`, req.body.function)
    .replace(`{{mail}}`, req.body.mail)
    .replace(`{{professionalNumber}}`, req.body.professionalNumber)
    .replace(`{{number}}`, req.body.number)
    .replace(`{{link}}`, req.body.link)
    .replace(`{{file}}`, req.body.file);
  fs.writeFileSync(`./public/static/generated/index.html`, replacedIndex);

  const zip = new AdmZip();
  zip.addLocalFolder(`./public`);
  const date = new Date();
  const hash = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

  zip.writeZip(`./public/static/extracted/preview-${hash}.zip`);
  const file = fs.readFileSync(`./public/static/generated/index.html`, "utf8");
  res.status(200).send(file);
}
