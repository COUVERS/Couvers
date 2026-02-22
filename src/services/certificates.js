import { ref, getDownloadURL } from "firebase/storage"
import { storage } from "../library/firebase"

export async function getCertificateDownloadUrl(path) {
    const fileRef = ref(storage, path)
    return await getDownloadURL(fileRef)
}