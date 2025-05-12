"use server"
import { DownloadMusic } from "@/data/use-cases/download-music";
import { DownloadPlaylist } from "@/data/use-cases/download-playlist";
import { CreateFolderRepository } from "@/infra/create-folder-repository";
import { DeleteFolderRepository } from "@/infra/delete-folder-repository";
import { DownloadMP3Repository } from "@/infra/download-mp3-repository";
import { DownloadPlaylistRepository } from "@/infra/download-playlist-repository";
import { LoadMusicInfoRepository } from "@/infra/load-music-info-repository";
import { LoadPlaylistInfoRepository } from "@/infra/load-playlist-info-repository";
import { SanitizeFileNameRepository } from "@/infra/sanitize-filename-repository";
import { DownloadFileController } from "@/presentation/controllers/download-file";
import { Input } from "@/presentation/protocols/downloadFile";

type ControllerOutput = {
  success: true
} | {
  success: false
}

export async function mainDownload(input: Input): Promise<ControllerOutput> {
  const loadPlaylistInfoRepository = new LoadPlaylistInfoRepository()
  const loadMusicInfoRepository = new LoadMusicInfoRepository()
  const downloadMusicRepository = new DownloadMP3Repository()
  const createFolderRepository = new CreateFolderRepository()
  const musicDownloader = new DownloadMusic(downloadMusicRepository, createFolderRepository)
  const sanitizeFileNameRepository = new SanitizeFileNameRepository()
  const downloadPlaylistRepository = new DownloadPlaylistRepository(sanitizeFileNameRepository)
  const deleteFolderRepository = new DeleteFolderRepository()
  const playlistDownloader = new DownloadPlaylist(createFolderRepository, downloadPlaylistRepository, sanitizeFileNameRepository, deleteFolderRepository)
  const downloadController = new DownloadFileController(musicDownloader, playlistDownloader, loadPlaylistInfoRepository, loadMusicInfoRepository)
  const payload = await downloadController.handle({ url: input.url })
  if (!payload.success) {
    return {
      success: false
    }
  }

  return {
    success: true
  }
}