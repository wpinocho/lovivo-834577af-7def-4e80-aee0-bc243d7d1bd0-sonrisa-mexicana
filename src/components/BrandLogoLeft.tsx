import { Link } from 'react-router-dom'

export const BrandLogoLeft = () => {
  return (
    <Link to="/" aria-label="Smilo — Inicio" className="flex items-center">
      <span className="text-2xl font-black tracking-tighter text-foreground">
        Smilo
      </span>
      <span className="ml-1.5 text-[10px] font-semibold tracking-widest uppercase text-accent mt-1">
        ®
      </span>
    </Link>
  )
}