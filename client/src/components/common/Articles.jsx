import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { FaSearch } from "react-icons/fa";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [filter, setFilter] = useState('');

  // Fetch articles
  async function getArticles() {
    try {
      const token = await getToken();
      const res = await axios.get('http://localhost:3000/author-api/articles', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.message === 'articles') {
        setArticles(res.data.payload);
        setError('');
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError('Failed to fetch articles. Please try again.');
    }
  }

  useEffect(() => {
    getArticles();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredArticles = articles.filter(
    (article) =>
      article.isArticleActive &&
      article.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className='container'>
      {error && <p className='display-4 text-center mt-5 text-danger'>{error}</p>}

      <div className='filter-bar'>
        <input
          type="text"
          placeholder="Filter by title..."
          value={filter}
          onChange={handleFilterChange}
          className="form-control d-block mb-5 mx-auto bg-"
        />
        <FaSearch  className='search-icon'/>
      </div>

      {filteredArticles.length === 0 ? (
        <p className="text-center mt-4 text-muted">No articles found.</p>
      ) : (
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3'>
          {filteredArticles.map((article) => (
            <div className='col' key={article.articleId}>
              <div className="card h-100">
                <div className="card-body">
                  {/* Author Details */}
                  <div className="author-details text-end">
                    <img
                      src={article.authorData.profileImageUrl}
                      width='40px'
                      className='rounded-circle'
                      alt="Author"
                    />
                    <p><small className='text-secondary'>{article.authorData.nameOfAuthor}</small></p>
                  </div>

                  {/* Article Title */}
                  <h5 className='card-title'>{article.title}</h5>

                  {/* Article Content */}
                  <p className='card-text'>{article.content.substring(0, 80) + "..."}</p>

                  {/* Read More Button */}
                  <button className='custom-btn btn-4' onClick={() => navigate(`../${article.articleId}`, { state: article })}>
                    Read more
                  </button>
                </div>

                <div className="card-footer">
                  <small className="text-body-secondary">Last updated on {article.dateOfModification}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Articles;
