function log(...arg){
  const t = arg.map(v=>typeof v === 'string'?v:JSON.stringify(v)).join('>>>>>>>>>>')
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  console.log(`${new Date()}>>>>>>>>>>${t}`)
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
}
log({res: 'asd'})
process.exit(0)
