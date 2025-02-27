import Link from 'next/link'
import Image from 'next/image'

export default function SchoolCard({ school, featured = false }) {
  return (
    <div className="featured-gym-card">
      {featured && (
        <div className="featured-badge">
          <i className="fas fa-crown"></i> Featured
        </div>
      )}
      
      <div style={{ position: 'relative', width: '100%', height: '200px' }}>
        <Image 
          src={school.image_url || '/images/placeholder-gym.jpg'} 
          alt={school.name} 
          className="gym-image"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      
      <div className="gym-info">
        <div className="gym-header">
          <h3>{school.name}</h3>
          {school.rating && (
            <div className="rating">
              <i className="fas fa-star"></i>
              <span>{school.rating}</span>
            </div>
          )}
        </div>
        
        <p className="gym-location">
          <i className="fas fa-map-marker-alt"></i> {school.city}, {school.state}
        </p>
        
        <div className="gym-features">
          {school.has_gi && (
            <span className="feature"><i className="fas fa-user-ninja"></i> Gi</span>
          )}
          {school.has_nogi && (
            <span className="feature"><i className="fas fa-running"></i> No Gi</span>
          )}
          {school.has_kids && (
            <span className="feature"><i className="fas fa-child"></i> Kids</span>
          )}
          {school.has_comp && (
            <span className="feature"><i className="fas fa-trophy"></i> Competition</span>
          )}
          {school.has_women && (
            <span className="feature"><i className="fas fa-female"></i> Women's</span>
          )}
        </div>
        
        <Link href={`/schools/${school.id}`} className="view-gym-btn">
          View Details
        </Link>
      </div>
    </div>
  )
}
