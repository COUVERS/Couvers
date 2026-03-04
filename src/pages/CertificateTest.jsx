import { ref, getDownloadURL } from "firebase/storage"
import { storage } from "../firebase"
import CustomButton from "../components/reusable/CustomButton"
import { getCertificateDownloadUrl } from "../services/certificates"

export default function CertificateTest() {
  const handleDownload = async () => {
    try {
      const url = await getCertificateDownloadUrl("certificates/test.pdf")
      window.open(url, "_blank")
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }

  return (
    <div>
      <h1>Storage Test</h1>
      <CustomButton
        onClick={handleDownload}
        variant="contained"
        color="primary"
        size="large"
      >
        Download test PDF
      </CustomButton>
    </div>
  )
}
