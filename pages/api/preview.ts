import fs from "fs";
import AdmZip from "adm-zip";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:w="urn:schemas-microsoft-com:office:word"
    xmlns:m="http://schemas.microsoft.com/office/2004/12/omml"
    xmlns="http://www.w3.org/TR/REC-html40">
    
    <head>
    <meta charset="utf-8">
    <meta http-equiv=Content-Type content="text/html; charset=windows-1252">
    <meta name=ProgId content=Word.Document>
    <meta name=Generator content="Microsoft Word 15">
    <meta name=Originator content="Microsoft Word 15">
    <link rel=File-List href="/assets/filelist.xml">
    <link rel=themeData href="/assets/themedata.thmx">
    <link rel=colorSchemeMapping href="/assets/colorschememapping.xml">
    <meta content="text/html; charset=utf-8" http-equiv=Content-Type>
    <table style="border-spacing: 0px;">  
      <tr>
          <td>
            <a href="https://les-detritivores.org/" style="text-decoration:none"><img moz-do-not-send="false" style="" src="../img/${req.body?.file}" alt="image profil"/>
          </td>
    
          <td style="padding-top: 0px; padding-left: 10px;">

            <span style="font-family: Arial, Helvetica, Sans-Serif; font-size: 15pt;  color: #e94e1b;"><strong>${req.body.firstName} ${req.body.lastName}</strong>
              <br />
      
              <span style="font-size: 11pt; font-family: Arial, Helvetica, Sans-Serif; color: #263b29;">
                <strong>${req.body.role}</strong>
              </span>
            </span>

            <br />
            <br />

            <span style="color: #263b29 ;font-size: 9pt;font-family: Arial, Helvetica, Sans-Serif; white-space: nowrap; font-weight: 700">
              ${req.body.mail}
            </span>
            <br />
            <span style="color: #263b29 ;font-size: 9pt;font-family: Arial, Helvetica, Sans-Serif; white-space: nowrap; font-weight: 500">
              ${req.body.professionalNumber}
            </span>
            <br />
            <span style="color: #263b29 ;font-size: 9pt;font-family: Arial, Helvetica, Sans-Serif; white-space: nowrap; font-weight: 500">
              ${req.body.number}
            </span>
      
            <br />
            <span style="font-family: Arial, Helvetica, Sans-Serif; font-size: 9pt;  color: #263b29; font-weight: 500">${req.body.adress}</span>
            <br />
            <a href="https://${req.body.link}/">
              <span style="font-family:  Arial, Helvetica, Sans-Serif; font-size: 8.5pt; color: #e94e1b; font-weight: 900">${req.body.link}</span>
            </a>

            <table style="border-spacing: 0px;">
              <th>
                <a mc:disable-tracking href="https://www.facebook.com/lesdetritivores/" style="text-decoration: none;">
                  <img style="vertical-align: bottom; padding-top: 10px; margin-left: 0px;" data-input="facebook" data-tab="social" src="../img/facebook.png" />
                </a>
              </th>
      
              <th>
                <a mc:disable-tracking href="https://www.instagram.com/lesdetritivores/?hl=fr" style="text-decoration: none;">
                  <img style="vertical-align: bottom; padding-top: 12px; margin-left: 4px" data-input="insta" data-tab="social" src="../img/insta.png" />
                </a>
              </th>
      
              <th>
                <a mc:disable-tracking href="https://www.linkedin.com/company/les-détritivores/?originalSubdomain=fr" style="text-decoration: none; margin-left: 4px">
                  <img style=" vertical-align: bottom; padding-top: 12px;" data-input="linkedin" data-tab="social" src="../img/linkedin.png" />
                </a>
              </th>
          </table>
    </table>
  `;
  fs.writeFile(`./public/static/generated/index.html`, html, (err) => {
    if (err) throw err;
    const file = new AdmZip();
    file.addLocalFolder(`./public`);
    const date = new Date();
    const hash =
      date.getDay() +
      "-" +
      date.getMonth() +
      "-" +
      date.getFullYear() +
      "-" +
      date.getHours() +
      "-" +
      date.getMinutes() +
      "-" +
      date.getSeconds();

    file.writeZip(`./public/static/extracted/preview-${hash}.zip`);
  });
  const file = fs.readFileSync(`./public/static/generated/index.html`, "utf8");
  res.status(200).send(file);
}
