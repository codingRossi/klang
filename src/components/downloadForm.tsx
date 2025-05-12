"use server"
import { mainDownload } from "@/main/factories"

export async function handleSubmit(formData: FormData){
    const url = formData.get("url")?.toString().trim()
    console.log({ url})
    if (!url) throw new Error("Url é obrigatório")
    await mainDownload({ url: url})
  }
