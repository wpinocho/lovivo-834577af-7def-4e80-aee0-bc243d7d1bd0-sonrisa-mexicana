import { type Collection } from '@/lib/supabase'
import { ArrowRight } from 'lucide-react'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
  eager?: boolean
}

export const CollectionCard = ({ collection, onViewProducts, eager }: CollectionCardProps) => {
  return (
    <button
      onClick={() => onViewProducts(collection.id)}
      className="group relative overflow-hidden rounded-2xl bg-muted text-left w-full transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden bg-muted">
        {collection.image ? (
          <img
            src={collection.image}
            alt={collection.name}
            loading={eager ? 'eager' : 'lazy'}
            fetchPriority={eager ? 'high' : undefined}
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
            Sin imagen
          </div>
        )}
      </div>

      {/* Overlay content */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent flex flex-col justify-end p-6">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-background font-bold text-xl leading-tight mb-1">
              {collection.name}
            </h3>
            {collection.description && (
              <p className="text-background/70 text-sm line-clamp-2 max-w-[200px] leading-relaxed">
                {collection.description}
              </p>
            )}
          </div>
          <div className="flex-shrink-0 ml-4 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-accent transition-colors">
            <ArrowRight className="h-4 w-4 text-background" />
          </div>
        </div>
      </div>

      {collection.featured && (
        <div className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
          Destacado
        </div>
      )}
    </button>
  )
}