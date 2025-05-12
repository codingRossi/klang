import { mainDownload } from "@/main/factories"

const x = await mainDownload({
  url: "https://soundcloud.com/pedro-rossi-836277316/sets/top-do-top"
})

console.log({ x })