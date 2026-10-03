import { writeFile } from 'node:fs/promises'
import { PDFDocument, StandardFonts, rgb, PDFString } from 'pdf-lib'
import resume from '../src/data/resume.js'
import projects from '../src/data/projects.js'

const clean = (value) => String(value).replace(/[\u2013\u2014]/g, '-').replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"').replace(/[^\x20-\x7e\n]/g, '')

export async function buildCv(path = 'public/saimum-al-mahmud-cv.pdf') {
  const pdf = await PDFDocument.create()
  const regular = await pdf.embedFont(StandardFonts.Helvetica)
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const ink = rgb(0.12, 0.16, 0.22), accent = rgb(0.05, 0.30, 0.43), muted = rgb(0.32, 0.37, 0.43)
  const width = 595.28, height = 841.89, margin = 44, contentWidth = width - margin * 2
  let page, y
  function newPage() {
    page = pdf.addPage([width, height]); y = height - margin
    page.drawRectangle({ x: margin, y: height - 20, width: contentWidth, height: 3, color: accent })
  }
  function lines(text, size, font, available) {
    const result = []
    for (const paragraph of clean(text).split('\n')) {
      let line = ''
      for (const word of paragraph.split(/\s+/)) {
        if (font.widthOfTextAtSize(`${line} ${word}`.trim(), size) > available && line) { result.push(line); line = '' }
        line = `${line} ${word}`.trim()
      }
      result.push(line)
    }
    return result
  }
  function text(value, { size = 10, font = regular, color = ink, indent = 0, after = 5 } = {}) {
    const wrapped = lines(value, size, font, contentWidth - indent)
    const leading = size * 1.35
    if (y - wrapped.length * leading < 48) newPage()
    for (const line of wrapped) { page.drawText(line, { x: margin + indent, y, size, font, color }); y -= leading }
    y -= after
  }
  function heading(value) {
    y -= 6
    text(value.toUpperCase(), { size: 11, font: bold, color: accent, after: 8 })
  }
  function link(label, url) {
    const size = 8.5
    const labelText = clean(label)
    page.drawText(labelText, { x: margin, y, size, font: regular, color: accent })
    const annotation = pdf.context.obj({ Type: 'Annot', Subtype: 'Link', Rect: [margin, y - 2, margin + regular.widthOfTextAtSize(labelText, size), y + size], Border: [0, 0, 0], A: { Type: 'Action', S: 'URI', URI: PDFString.of(url) } })
    page.node.addAnnot(pdf.context.register(annotation)); y -= 16
  }
  function project(id) {
    const item = projects.find((entry) => entry.id === id)
    if (y < 185) newPage()
    text(item.title, { font: bold, size: 10.5, after: 2 })
    text(item.tags.slice(0, 6).join(' | '), { size: 8.5, color: muted, after: 2 })
    text(`${item.description} ${item.impact}`, { size: 9.5, after: 3 })
    link(item.repositoryUrl.replace('https://', ''), item.repositoryUrl)
  }
  newPage()
  text(resume.name, { size: 24, font: bold, color: accent, after: 5 })
  text(resume.title, { size: 12, font: bold, after: 8 })
  text(`${resume.email} | ${resume.phone} | Dhaka, Bangladesh`, { size: 9.5, color: muted, after: 3 })
  link('Portfolio: saimum-aditto.vercel.app', resume.site)
  link('GitHub: github.com/saimumadi00-sketch', resume.github)
  heading('Profile')
  text(resume.summary, { size: 9.5 })
  heading('Education')
  for (const item of resume.education) {
    text(`${item.degree} | ${item.period}`, { font: bold, size: 10, after: 2 })
    text(`${item.institution} - ${item.location}`, { size: 9.5, after: 2 })
    text(item.notes, { size: 9, color: muted, after: 5 })
  }
  heading('Selected cybersecurity projects')
  for (const id of [4, 11, 12]) project(id)
  newPage()
  text(`${resume.name} - continued`, { size: 14, font: bold, color: accent, after: 6 })
  heading('Selected applied projects')
  for (const id of [14, 16]) project(id)
  heading('Experience')
  for (const item of resume.experience) {
    text(`${item.role} | ${item.period}`, { font: bold, after: 2 })
    text(item.org, { size: 9.5, color: muted, after: 3 })
    for (const bullet of item.bullets) text(`- ${bullet}`, { size: 9.5, indent: 6, after: 2 })
    y -= 3
  }
  heading('Skills')
  for (const [label, key] of [['Security & systems', 'systemsSecurity'], ['Programming', 'programming'], ['Web development', 'webDevelopment'], ['Machine learning', 'machineLearning'], ['Tools', 'tools']]) text(`${label}: ${resume.skills[key].join(', ')}`, { size: 9.5, after: 5 })
  heading('Languages')
  text(resume.languages.join(' | '), { size: 9.5 })
  for (const [index, item] of pdf.getPages().entries()) {
    item.drawLine({ start: { x: margin, y: 34 }, end: { x: width - margin, y: 34 }, thickness: 0.5, color: rgb(0.8, 0.83, 0.86) })
    item.drawText(`${resume.name} | ${index + 1} / ${pdf.getPageCount()}`, { x: margin, y: 20, size: 8, font: regular, color: muted })
  }
  pdf.setTitle(`${resume.name} - Curriculum Vitae`); pdf.setAuthor(resume.name); pdf.setSubject('Cybersecurity and Networking')
  await writeFile(path, await pdf.save())
  console.log(`CV generated: ${pdf.getPageCount()} pages`)
}

if (process.argv[1]?.endsWith('build-cv.mjs')) await buildCv()
