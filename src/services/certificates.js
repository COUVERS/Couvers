import { ref, getDownloadURL } from "firebase/storage"
import { storage } from "../library/firebase"

export async function getCertificateDownloadUrl(path) {
    const fileRef = ref(storage, path)
    return await getDownloadURL(fileRef)
}

// course iconKey → certificate PDF
const certificateFileMap = {
    effectiveCommunication: "certificates/effective-communication.pdf",
    fundamentalsOfTeaching: "certificates/fundamentals-of-teaching.pdf",
    empathy: "certificates/empathy-and-classroom.pdf",
    assessment: "certificates/assessment-and-feedback.pdf",
    lessonPlanning: "certificates/lesson-planning.pdf",
}

export async function getCertificateDownloadUrlByKey(iconKey) {
    const filePath = certificateFileMap[iconKey]

    if (!filePath) {
        throw new Error("Certificate not found")
    }

    return await getCertificateDownloadUrl(filePath)
}