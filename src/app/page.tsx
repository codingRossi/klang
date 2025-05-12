"use client"

import { handleSubmit } from "@/components/downloadForm"
import { Music4 } from "lucide-react"
import { useState } from "react"

export default function Home() {
  const [url, setUrl] = useState("")
  
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#3A0065] to-[#5C008A] p-6">
      <div className="bg-[#3B005F]/60 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-[#A055FF] max-w-md w-full overflow-hidden">
        <div className="p-10 flex flex-col items-center">
          <Music4 className="w-14 h-14 text-[#A055FF] mb-4" />
          <h1 className="text-3xl font-bold text-white">Baixe MP3</h1>
          <p className="mt-1 text-gray-300">Playlist e músicas do Soundcloud</p>

          <form className="mt-8 w-full space-y-4" action={handleSubmit}>
            <input
              name="url"
              type="url"
              placeholder="Cole o link aqui"
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="
                w-full px-4 py-2
                bg-transparent text-gray-200
                border border-[#5C008A] rounded-xl shadow-sm
                backdrop-blur-sm
                focus:outline-none focus:ring-2 focus:ring-[#A055FF]
                transition
              "
            />

            <button
              type="submit"
              className="
                w-full py-3
                bg-gradient-to-r from-[#8E00FF] to-[#C300FF]
                text-white font-medium rounded-xl shadow-2xl
                hover:from-[#9E33FF] hover:to-[#D14EFF]
                active:scale-95 transition-transform
              "
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
