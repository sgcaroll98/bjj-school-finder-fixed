import Link from 'next/link'
import Image from 'next/image'

export default function SchoolCard({ school, featured = false }) {
  // Helper function to map category names to icons
  const getCategoryIcon = (category) => {
    const iconMap = {
      'Gi': 'fas fa-user-ninja',
      'No-Gi': 'fas fa-running',
      'Kids Classes': 'fas fa-child',
      'Competition': 'fas fa-trophy',
      'Self-Defense': 'fas fa-shield-alt',
      'MMA': 'fas fa-fist-raised',
      'Beginners': 'fas fa-graduation-cap',
      'Advanced': 'fas fa-star',
      'Women': 'fas fa-female'
    };
    
    return iconMap[category] || 'fas fa-dumbbell';
  };

  return (
    <div className="school-card">
      {featured && (
        <div className="featured-badge">
          <i className="fas fa-crown"></i> Featured
        </div>
      )}
      
      <div className="school-image-container">
        <Image 
          src={school.image || '/images/placeholder-gym.jpg'} 
          alt={school.name} 
          className="school-image"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      
      <div className="school-info">
        <div className="school-header">
          <h3 className="school-name">{school.name}</h3>
          {school.rating && (
            <div className="school-rating">
              <i className="fas fa-star"></i>
              <span>{school.rating}</span>
              {school.reviewCount && (
                <span className="review-count">({school.reviewCount})</span>
              )}
            </div>
          )}
        </div>
        
        <p className="school-location">
          <i className="fas fa-map-marker-alt"></i> {school.city}, {school.state}
        </p>
        
        {school.description && (
          <p className="school-description">{school.description}</p>
        )}
        
        <div className="school-categories">
          {school.categories && school.categories.map((category, index) => (
            <span key={index} className="category-tag">
              <i className={getCategoryIcon(category)}></i> {category}
            </span>
          ))}
          {/* Fallback for schools with individual boolean flags */}
          {!school.categories && (
            <>
              {school.has_gi && (
                <span className="category-tag"><i className="fas fa-user-ninja"></i> Gi</span>
              )}
              {school.has_nogi && (
                <span className="category-tag"><i className="fas fa-running"></i> No Gi</span>
              )}
              {school.has_kids && (
                <span className="category-tag"><i className="fas fa-child"></i> Kids</span>
              )}
              {school.has_comp && (
                <span className="category-tag"><i className="fas fa-trophy"></i> Competition</span>
              )}
              {school.has_women && (
                <span className="category-tag"><i className="fas fa-female"></i> Women's</span>
              )}
            </>
          )}
        </div>
        
        <Link href={`/schools/${school.id}`} className="school-link-btn">
          View Details
        </Link>
      </div>
      
      <style jsx>{`
        .school-card {
          display: flex;
          flex-direction: column;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .school-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px rgba(0,0,0,0.1);
        }
        
        .featured-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background-color: #ffd700;
          color: #333;
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: 4px;
          z-index: 1;
        }
        
        .school-image-container {
          position: relative;
          width: 100%;
          height: 200px;
        }
        
        .school-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .school-info {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .school-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }
        
        .school-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: #333;
          margin-right: 1rem;
        }
        
        .school-rating {
          display: flex;
          align-items: center;
          color: #4f46e5;
          font-weight: 600;
        }
        
        .school-rating i {
          color: #fbbf24;
          margin-right: 0.25rem;
        }
        
        .review-count {
          font-size: 0.8rem;
          color: #6b7280;
          margin-left: 0.25rem;
        }
        
        .school-location {
          color: #6b7280;
          font-size: 0.9rem;
          margin-bottom: 0.75rem;
        }
        
        .school-description {
          font-size: 0.9rem;
          color: #4b5563;
          margin-bottom: 1rem;
          line-height: 1.4;
        }
        
        .school-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }
        
        .category-tag {
          background-color: #f3f4f6;
          color: #4b5563;
          font-size: 0.8rem;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
        }
        
        .category-tag i {
          margin-right: 0.35rem;
        }
        
        .school-link-btn {
          margin-top: auto;
          text-align: center;
          background-color: #4f46e5;
          color: white;
          padding: 0.75rem 1rem;
          border-radius: 6px;
          font-weight: 500;
          transition: background-color 0.15s ease;
          text-decoration: none;
        }
        
        .school-link-btn:hover {
          background-color: #4338ca;
        }
      `}</style>
    </div>
  )
}
