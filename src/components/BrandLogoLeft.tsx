import { Link } from 'react-router-dom'

export const BrandLogoLeft = () => {
  return (
    <Link to="/" aria-label="Smilo — Inicio" className="flex items-center">
      <img
        src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/b3071cbc-7f37-49dd-bb09-3f7c8ce155aa/1784252640328-k1wtkp1kd5.webp"
        alt="Smilo"
        className="h-9 w-auto object-contain"
      />
    </Link>
  )
}