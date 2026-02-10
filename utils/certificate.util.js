const puppeteer = require('puppeteer')
const QRCode = require('qrcode')
const fs = require('fs')
const path = require('path')

async function generateCertificate(data) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  const page = await browser.newPage()

  const qrCode = await QRCode.toDataURL(
    `https://remoteforhive.com/certificate/${data.certificateId}`
  )

  const templatePath = path.join(__dirname, './certificate.template.html')
  let html = fs.readFileSync(templatePath, 'utf8')

  html = html
    .replace('{{studentName}}', data.studentName)
    .replace('{{eventName}}', data.eventName)
    .replace('{{qrCode}}', qrCode)

  await page.setContent(html, {
    waitUntil: 'networkidle0'
  })

  const pdfBuffer = await page.pdf({
    format: 'A4',
    landscape: true,
    printBackground: true
  })

  await browser.close()
  return pdfBuffer
}

module.exports = { generateCertificate }
