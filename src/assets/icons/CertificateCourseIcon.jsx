import certificateIconMap from "../../assets/icons/CertificateIconMap"

export default function CertificateCourseIcon({ iconKey }) {
    const IconComponent = certificateIconMap[iconKey]

    if (!IconComponent) return null

    return <IconComponent />
}